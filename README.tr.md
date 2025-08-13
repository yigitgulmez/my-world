<div align="center">
  <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" width="100" />
</div>

<p align="center">
  <a href="https://github.com/yigitgulmez/my-world/blob/master/README.tr.md">[𝙏𝙍]</a> - <a href="https://github.com/yigitgulmez/my-world/blob/master/README.md">[𝙀𝙉]</a>
</p>

<h1 align="center">
  my-world - v2
</h1>

<p align="center">
  Bu proje <a href="https://yigitgulmez.com" target="_blank">yigitgulmez.com</a> için <a href="https://www.nextjs.org/" target="_blank">Next.js</a> ile geliştirildi ve <a href="https://www.vercel.com/" target="_blank">Vercel</a> üzerinde barındırılmaktadır.
</p>
<p align="center">
  İlk web projemdi, şimdi tamamen güncellenmiş V2 haliyle karşınızda.
</p>
<p align="center">
  <a href="https://github.com/yigitgulmez/my-world/releases/tag/v1" target="_blank">🔗 V1 Dosyalar</a> |
  <a href="https://my-world-hh1pwsiy3-yigitgulmez-projects.vercel.app" target="_blank">🔍 V1 Önizleme</a>
</p>

![image](./images/myworld0.png)

## ❗ Notlar

- Siteyi çalıştırmadan önce aşağıdaki dosyaları düzenlemeniz gerekli!

```sh
# /.env.locale
GITHUB_TOKEN=
GITHUB_WEBHOOK_SECRET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_RECEIVER=
DB_KEY=
DB_URL=
```

```sh
# /src/utils/config.ts
username: 'username',
fullName: 'name surname',
domain: 'domain.com',
githubOwner: 'username',
repos: [
  { name: 'my-world', isLive: <boolean> },
],
socials: [
  { href: 'https://example.com/username', icon: CiLink },
],
skills: [
  { icon: FaReact },
],
```

## 🛠️ Özelleştirme

- Menü başlıklarını değiştirmek istiyorsanız bunu düzenleyin:

```sh
# /src/utils/nav-items.ts
{ href: `/${locale}/projects`, label: '/' + t('projects.title') },
{ href: `/${locale}/gallery`, label: '/' + t('gallery.title') },
{ href: `/${locale}/about`, label: '/' + t('about.title') },
{ href: `/${locale}/contact`, label: '/' + t('contact.title') },
```

- Ek proje bağlantıları tanımlamak istiyorsanız bunu düzenleyin:

```sh
# /src/utils/lik-list.ts
'my-world': [{ href: "https://example.com", icon: CiUser }],
```

- Başka proje içeriği eklemek istiyorsanız bunu düzenleyin:

```sh
# /src/messages/*.json
"projects": {
...
  "my-world": {
    "title1": "Projects1",
    "content1": "My project content1"
    "title2": "Projects2",
    "content2": "My project content2"
  }
}
```

## ⚙️ Kurulum ve Başlatma

1. Gerekli bağımlılıkları kur:

```sh
npm install
```

1. Geliştirme sunucusunu başlat:

```sh
npm run dev
```

## 🚀 Yayına Alma (Production)

1. Statik üretim (build):

```sh
npm run build
```

1. Üretim sürümünü önizle:

```sh
npm run start
```

1. Performans ve kararlılık testi çalıştır:

```sh
npm run memory
``` 
