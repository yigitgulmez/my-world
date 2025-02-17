import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;

const repos = [
  { name: 'my-world', isLive: true },
];

const fetchRepoDetails = async (repo: string) => {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repo}`;
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

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${repo}/contents/${path}`;
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

const fetchChangelog = async (repo: string) => {
  try {
    const changelog = await fetchContent('CHANGELOG.md', repo);
    return changelog.content ? new TextDecoder("utf-8").decode(Uint8Array.from(atob(changelog.content), c => c.charCodeAt(0))) : null;
  } catch {
    return null;
  }
};

const fetchReadme = async (repo: string) => {
  try {
    const readme = await fetchContent('README.md', repo);
    return readme.content ? new TextDecoder("utf-8").decode(Uint8Array.from(atob(readme.content), c => c.charCodeAt(0))) : null;
  } catch {
    return null;
  }
};

interface Project {
  name: string;
  description: string;
  readme: string | null;
  changelog: string | null;
  images: { name: string; url: string }[];
  isLive: boolean;
}

export async function GET() {
  try {
    const results = [];

    for (const repoInfo of repos) {
      const [details, images, changelog, readme] = await Promise.all([
        fetchRepoDetails(repoInfo.name),
        fetchImages(repoInfo.name),
        fetchChangelog(repoInfo.name),
        fetchReadme(repoInfo.name),
      ]);

      const result: Project= {
        name: details.name,
        description: details.description,
        isLive: repoInfo.isLive,
        images: images,
        changelog: changelog,
        readme: readme,
      };

      results.push(result);
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from GitHub' }, { status: 500 });
  }
}