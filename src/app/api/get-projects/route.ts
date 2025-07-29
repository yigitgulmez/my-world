import { NextResponse } from 'next/server';
import { config } from '@/utils';
import { Project } from '@/types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;


const fetchRepoDetails = async (repo: string) => {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const url = `https://api.github.com/repos/${config.githubOwner}/${repo}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch repo details for: ${repo}`);
  }

  const data = await response.json();
  return { name: data.name, description: data.description };
};

const fetchContent = async (path: string, repo: string) => {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const url = `https://api.github.com/repos/${config.githubOwner}/${repo}/contents/${path}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch content at path: ${path}`);
  }

  const data = await response.json();
  return data;
};

const fetchImages = async (repo: string) => {
  try {
    const images = await fetchContent('images', repo);
    return images
      .filter((file: any) => file.type === 'file' && /\.(png|jpe?g|gif|svg|webp)$/i.test(file.name))
      .map((file: any) => ({
        name: file.name,
        url: file.download_url,
      }));
  } catch {
    return [];
  }
};

function convertGitHubBlobLinksToRaw(markdown: string): string {
  return markdown.replace(
    /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/([^\s'")]+)/g,
    (_match, user, repo, branch, path) => {
      if (branch.startsWith('refs/heads/')) {
        branch = branch.replace('refs/heads/', '');
      }
      return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
    }
  );
}

const decodeContent = (content: string) =>
  new TextDecoder('utf-8').decode(Uint8Array.from(atob(content), c => c.charCodeAt(0)));

const fetchReadmes = async (repo: string) => {
  try {
    const readme = await fetchContent('README.md', repo);
    const readmeTR = await fetchContent('README.tr.md', repo).catch(() => null);

    const decodedReadme = readme.content ? decodeContent(readme.content) : null;
    const decodedReadmeTR = readmeTR && readmeTR.content ? decodeContent(readmeTR.content) : null;

    return {
      readme: decodedReadme ? convertGitHubBlobLinksToRaw(decodedReadme) : null,
      readmeTR: decodedReadmeTR ? convertGitHubBlobLinksToRaw(decodedReadmeTR) : null,
    };
  } catch {
    return { readme: null, readmeTR: null };
  }
};

const fetchChangelogs = async (repo: string) => {
  try {
    const changelog = await fetchContent('CHANGELOG.md', repo);
    const changelogTR = await fetchContent('CHANGELOG.tr.md', repo).catch(() => null);

    const decodedChangelog = changelog.content ? decodeContent(changelog.content) : null;
    const decodedChangelogTR = changelogTR && changelogTR.content ? decodeContent(changelogTR.content) : null;

    return {
      changelog: decodedChangelog ? convertGitHubBlobLinksToRaw(decodedChangelog) : null,
      changelogTR: decodedChangelogTR ? convertGitHubBlobLinksToRaw(decodedChangelogTR) : null,
    };
  } catch {
    return { changelog: null, changelogTR: null };
  }
};

export async function GET() {
  try {
    const results = [];

    for (const repoInfo of config.repos) {
      const [details, images, changelogs, readmes] = await Promise.all([
        fetchRepoDetails(repoInfo.name),
        fetchImages(repoInfo.name),
        fetchChangelogs(repoInfo.name),
        fetchReadmes(repoInfo.name),
      ]);

      const result: Project = {
        name: details.name,
        description: details.description,
        isLive: repoInfo.isLive,
        images: images,
        changelog: changelogs.changelog,
        changelogTR: changelogs.changelogTR,
        readme: readmes.readme,
        readmeTR: readmes.readmeTR,
      };

      results.push(result);
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from GitHub' }, { status: 500 });
  }
}
