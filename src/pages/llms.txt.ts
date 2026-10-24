import type { APIRoute } from "astro";
import { about, banner, features, projectsSection } from "../data/content";
import { pages, projects, site } from "../data/site";

const toList = (items: readonly string[]) => items.map((item) => `- ${item}`);

const content = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    banner.content,
    "",
    ...features.flatMap(({ title, bullets }) => [`## ${title}`, "", ...toList(bullets), ""]),
    `## ${projectsSection.title}`,
    "",
    ...toList(
        projects.map(
            ({ title, description, technologies, url, repository }) =>
                `[${title}](${url ??
                repository ??
                site.url}) : ${description} (${technologies.map(({ label }) => label).join(", ")})`
        )
    ),
    "",
    `## [${about.title}](${new URL(pages.about, site.url).href})`,
    "",
    about.intro.join("\n\n"),
    "",
    ...toList(about.values),
    "",
    "## Contact",
    "",
    ...toList([
        `[Formulaire de contact](${new URL(pages.contact, site.url).href})`,
        `E-mail : ${site.email}`,
        ...site.socials.map(({ label, href }) => `[${label}](${href})`)
    ]),
    ""
].join("\n");

export const GET: APIRoute = () => new Response(content,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } });
