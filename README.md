# Missive

A free, newsletter-first theme for [Ghost](https://ghost.org), with an editorial, letter-like feel.

**[Live demo](https://thomasgravy.github.io/missive/)** · **[Download missive.zip](https://github.com/thomasGravy/missive/releases/latest/download/missive.zip)**

Missive is built for people who write a newsletter first and a website second: a big signup form up top, your latest issue front and centre, and every past issue one click away.

## Features

- **Newsletter-first homepage**: signup hero, featured latest issue, compact archive
- **Issue numbers**: every post is numbered like a newsletter issue (No. 1, No. 2…), with a label you choose
- **Postmark stamp**: a decorative postmark that counts your issues
- **Letter-style posts**: comfortable reading measure, optional drop cap and a signature at the end of each issue
- **Built-in page templates**: an **Archive** page grouped by year, and a **Subscribe** page that turns your membership tiers into pricing cards
- **Members and paid subscriptions**: members-only and paid badges, paywall styling, upgrade prompts
- **Recommendations**: shows the newsletters you recommend
- **Light, dark or automatic** color scheme, a custom paper color, and three typography pairings
- **Ghost 6 custom fonts** supported
- **English and French** included, easy to translate
- No build step, no dependencies: plain CSS and a few lines of JavaScript

## Installation

1. Download [`missive.zip`](https://github.com/thomasGravy/missive/releases/latest/download/missive.zip) from the [latest release](https://github.com/thomasGravy/missive/releases/latest).
2. In Ghost Admin, go to **Settings → Design & branding → Change theme → Upload theme**.
3. Upload the zip and click **Activate**.

## Setting up the extra pages

**Archive**: create a page (for example with the slug `archive`), then in the post settings choose the template **Archive**. Every issue appears on it, grouped by year.

**Subscribe**: create a page (for example `subscribe`) and choose the template **Subscribe**. It displays your tiers from **Settings → Membership**, with a monthly/yearly switch. Anything you write in the page (an FAQ, for instance) appears below the pricing cards.

Add both pages to your navigation in **Settings → Navigation**.

## Theme settings

All settings live in **Settings → Design & branding → Customize**.

| Setting | What it does |
| --- | --- |
| Color scheme | Light, Dark, or Auto (follows the reader's system) |
| Paper color | Background color in light mode |
| Typography | Serif, serif titles with sans body, or sans |
| Show issue numbers / Issue label | Numbers posts like issues, e.g. "No. 12" or "Issue 12" |
| Subscribe button text | Replaces "Subscribe" everywhere |
| Footer heading / text | The signup box shown at the bottom of pages |
| Hero heading / text / note | The homepage headline, description and the small line under the form |
| Show hero author | Shows who writes the newsletter |
| Show postmark | The decorative stamp with your issue count |
| Feature latest issue | Highlights the newest issue on the homepage |
| Show recommendations | Lists your recommendations on the homepage |
| Show signature | Signs each issue with the author's name |
| Reading progress, drop cap, previous/next | Post page options |
| Show theme credit | Small footer credit |

The accent color comes from **Settings → Design & branding → Brand → Accent color**.

## Translations

Missive ships with English and French. Ghost picks the language from **Settings → General → Publication language**. To add a language, copy `locales/en.json` to `locales/<code>.json` (for example `de.json`) and translate the values.

## Development

The theme has no build step. Edit the files, zip the folder and upload it, or symlink the folder into a local Ghost install's `content/themes`.

Check compatibility with [gscan](https://github.com/TryGhost/gscan):

```bash
npx gscan .
```

## Credits

- Fonts: [Newsreader](https://github.com/productiontype/Newsreader) and [Inter](https://github.com/rsms/inter), both under the SIL Open Font License
- Made by [thomasGravy](https://github.com/thomasGravy)

## License

MIT, see [LICENSE](LICENSE).
