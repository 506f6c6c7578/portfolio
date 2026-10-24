import { siAstro, siCss, siDocker, siGithub, siNginx, siTypescript } from 'simple-icons';
import type { BrandIcon } from '../lib/brand-icons';

interface SocialLink {
    label: string;
    href: string;
    icon: BrandIcon;
}

export interface NavigationLink {
    label: string;
    href: string;
    section?: string;
}

interface Technology {
    label: string;
    icon: BrandIcon;
}

interface Project {
    title: string;
    description: string;
    technologies: readonly Technology[];
    url?: string;
    repository?: string;
}

export const site = {
    url: 'https://paulviandier.com',
    lang: 'fr',
    locale: 'fr_FR',
    name: 'Paul Viandier',
    givenName: 'Paul',
    familyName: 'Viandier',
    jobTitle: 'Développeur Python et web',
    tagline: 'Astrophysique, code et cybersécurité',
    title: 'Paul Viandier | Astrophysique, programmation et cybersécurité',
    description:
        "Paul Viandier, passionné d'astrophysique, de programmation et de cybersécurité. Découvre mes projets Python et web, mes expérimentations et ce qui m'anime.",
    email: 'contact@paulviandier.com',
    socials: [
        {
            label: 'GitHub',
            href: 'https://github.com/506f6c6c7578',
            icon: siGithub
        }
    ] satisfies readonly SocialLink[]
} as const;

export const interests: readonly string[] = [
    'Astrophysique',
    'Cosmologie',
    'Python',
    'Développement web',
    'Cybersécurité',
    'Pentest',
    'Red teaming'
];

export const pages = {
    home: '/',
    about: '/about-me',
    contact: '/contact'
} as const;

export const sections = {
    home: 'accueil',
    passions: 'passions',
    astrophysics: 'astrophysique',
    programming: 'programmation',
    security: 'cybersecurite',
    projects: 'projets',
    contact: 'contact'
} as const;

export const navigation: readonly NavigationLink[] = [
    { label: 'Accueil', href: pages.home, section: sections.home },
    {
        label: 'Passions',
        href: `/#${sections.passions}`,
        section: sections.passions
    },
    {
        label: 'Projets',
        href: `/#${sections.projects}`,
        section: sections.projects
    },
    { label: 'À propos', href: pages.about }
];

export const contactLink: NavigationLink = {
    label: 'Me contacter',
    href: pages.contact
};

export const siteNavigation: readonly NavigationLink[] = [...navigation, contactLink];

const technologies = {
    astro: { label: 'Astro', icon: siAstro },
    typescript: { label: 'TypeScript', icon: siTypescript },
    css: { label: 'CSS', icon: siCss },
    docker: { label: 'Docker', icon: siDocker },
    nginx: { label: 'Nginx', icon: siNginx }
} as const satisfies Record<string, Technology>;

export const projects: readonly Project[] = [
    {
        title: 'Portfolio',
        description:
            'Le site que tu visites : conçu avec Astro et TypeScript, rapide, accessible et optimisé pour le référencement, puis déployé avec Docker derrière Nginx.',
        technologies: [
            technologies.astro,
            technologies.typescript,
            technologies.css,
            technologies.docker,
            technologies.nginx
        ],
        url: site.url,
        repository: 'https://github.com/506f6c6c7578/portfolio'
    }
];
