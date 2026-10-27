import aegisLogo from '../assets/logos/aegis.svg?url';
import astrolabeLogo from '../assets/logos/astrolabe.svg?url';
import exoscopeLogo from '../assets/logos/exoscope.svg?url';
import portfolioLogo from '../assets/logos/portfolio.svg?url';
import {
    siAstro,
    siCss,
    siDocker,
    siGithub,
    siNginx,
    siTypescript
} from 'simple-icons';
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

export type RichText = string | readonly (string | NavigationLink)[];

interface Technology {
    label: string;
    icon: BrandIcon;
}

interface Project {
    title: string;
    description: string;
    technologies: readonly Technology[];
    logo?: string;
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
    repository: 'https://github.com/506f6c6c7578/portfolio',
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
    contact: '/contact',
    legalNotice: '/legal-notice',
    privacy: '/privacy-policy'
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

export const siteNavigation: readonly NavigationLink[] = [
    ...navigation,
    contactLink
];

export const legalLinks = {
    notice: { label: 'Mentions légales', href: pages.legalNotice },
    privacy: { label: 'Politique de confidentialité', href: pages.privacy }
} as const satisfies Record<string, NavigationLink>;

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
        logo: portfolioLogo,
        url: site.url,
        repository: site.repository
    },
    {
        title: 'Astrolabe',
        description:
            "Un planificateur d'observation astronomique : il analyse la nuit, la Lune, la météo, les planètes et les objets Messier pour identifier les meilleurs créneaux d'observation.",
        logo: astrolabeLogo,
        technologies: [
            technologies.astro,
            technologies.typescript,
            technologies.css,
            technologies.docker,
            technologies.nginx
        ],
        url: 'https://astro.paulviandier.com',
        repository: 'https://github.com/506f6c6c7578/Astrolabe'
    },
    {
        title: 'ExoScope',
        description:
            "Un explorateur pédagogique d'exoplanètes : il s'appuie sur le catalogue de la NASA pour rechercher, filtrer et comparer des milliers de mondes, et expliquer comment ils ont été découverts.",
        logo: exoscopeLogo,
        technologies: [
            technologies.astro,
            technologies.typescript,
            technologies.css,
            technologies.docker,
            technologies.nginx
        ],
        url: 'https://exo.paulviandier.com',
        repository: 'https://github.com/506f6c6c7578/ExoScope'
    },
    {
        title: 'Aegis',
        description:
            "Un analyseur défensif de sécurité web : après vérification de la propriété d'un domaine par DNS, il examine HTTPS, TLS, en-têtes, CSP, cookies et redirections, puis produit un rapport priorisé et actionnable.",
        logo: aegisLogo,
        technologies: [
            technologies.astro,
            technologies.typescript,
            technologies.css,
            technologies.docker,
            technologies.nginx
        ],
        url: 'https://aegis.paulviandier.com',
        repository: 'https://github.com/506f6c6c7578/Aegis'
    }
];
