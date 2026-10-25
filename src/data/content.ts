import bannerImage from "../assets/images/banner.png";
import astrophysicsIllustration from "../assets/illustrations/astrophysique.svg?raw";
import contactIllustration from "../assets/illustrations/contact.svg?raw";
import securityIllustration from "../assets/illustrations/cybersecurite.svg?raw";
import programmingIllustration from "../assets/illustrations/programmation.svg?raw";
import { contactLink, legalLinks, type NavigationLink, pages, sections, site } from "./site";

export interface Feature {
    id: string;
    title: string;
    content: string;
    bullets: readonly string[];
    illustration: string;
    link?: NavigationLink;
}

export const banner = {
    title: "Entre les étoiles, le code et la sécurité",
    content: `Moi, c'est ${site.givenName}. Passionné d'astrophysique, de programmation et de cybersécurité, j'aime explorer les mystères de l'Univers, concevoir des projets avec du code et comprendre les mécanismes qui se cachent derrière les systèmes informatiques.`,
    image: bannerImage,
    primaryLink: { label: "Découvrir mes projets", href: `/#${sections.projects}` },
    secondaryLink: { label: "En savoir plus sur moi", href: pages.about }
} as const;

export const features: readonly Feature[] = [
    {
        id: sections.astrophysics,
        title: "L'astrophysique : explorer l'Univers",
        content: "L'astrophysique nourrit ma curiosité et mon envie de comprendre les phénomènes qui façonnent notre Univers. Des étoiles aux galaxies, en passant par les trous noirs et la cosmologie, je souhaite approfondir mes connaissances et poursuivre des études dans ce domaine scientifique.",
        bullets: [
            "Explorer les étoiles, les galaxies et les trous noirs",
            "Comprendre les lois physiques qui régissent le cosmos",
            "M'intéresser à la cosmologie et à l'évolution de l'Univers",
            "Découvrir les avancées de la recherche en astrophysique",
            "Approfondir mes connaissances scientifiques"
        ],
        illustration: astrophysicsIllustration
    },
    {
        id: sections.programming,
        title: "La programmation : donner vie aux idées",
        content: "La programmation est un terrain d'expérimentation qui me permet de transformer des idées en projets concrets. J'aime explorer de nouvelles technologies, résoudre des problèmes et comprendre ce qui se passe derrière les applications que j'utilise ou que je développe.",
        bullets: [
            "Python et développement de scripts",
            "Développement web et création d'applications",
            "Automatisation et résolution de problèmes",
            "Exploration de nouvelles technologies"
        ],
        illustration: programmingIllustration,
        link: { label: "En savoir plus sur moi", href: pages.about }
    },
    {
        id: sections.security,
        title: "La cybersécurité : comprendre et sécuriser",
        content: "Je m'intéresse à la cybersécurité, notamment au pentesting et au red teaming. J'aime comprendre le fonctionnement des systèmes informatiques, étudier leurs vulnérabilités et découvrir les méthodes utilisées pour évaluer leur sécurité. Ces pratiques permettent de mieux appréhender les risques et de contribuer à la protection des systèmes.",
        bullets: [
            "Découverte et pratique du pentesting",
            "Exploration des approches de red teaming",
            "Étude des vulnérabilités des systèmes et applications",
            "Compréhension des mécanismes de sécurité informatique",
            "Intérêt pour la sécurité offensive et les stratégies de défense"
        ],
        illustration: securityIllustration
    }
];

export const projectsSection = {
    title: "Mes projets et expérimentations",
    description: "Développement web, programmation Python, cybersécurité et explorations scientifiques : découvre les projets que je réalise, les idées que j'expérimente et les domaines que j'approfondis."
} as const;

export const callToAction = {
    title: "Échangeons autour de nos passions",
    description: "Une question, un projet intéressant ou simplement l'envie de discuter d'astrophysique, de programmation ou de cybersécurité ? N'hésite pas à me contacter.",
    illustration: contactIllustration,
    link: contactLink
} as const;

export const about = {
    metaTitle: `À propos de ${site.name} | Astrophysique, programmation et cybersécurité`,
    description: `Découvre mon univers : passion pour l'astrophysique, programmation Python, développement web et exploration de la cybersécurité.`,
    title: `Salut, moi c'est ${site.givenName} !`,
    intro: [
        "J'ai 21 ans et je suis passionné par l'astrophysique. Comprendre l'Univers, ses phénomènes et les lois physiques qui le régissent nourrit ma curiosité au quotidien. Des étoiles aux galaxies, en passant par les questions fondamentales de la cosmologie, j'aime explorer les mécanismes qui se cachent derrière ce qui nous entoure. Je souhaite poursuivre des études dans ce domaine afin d'approfondir mes connaissances et d'aller plus loin dans cette exploration scientifique.",
        "En parallèle, la programmation occupe une place importante dans mes centres d'intérêt. J'aime particulièrement Python et le développement web, qui me permettent d'expérimenter, de résoudre des problèmes et de transformer des idées en projets concrets. Qu'il s'agisse de développer une application, d'automatiser une tâche ou de découvrir de nouvelles technologies, j'apprécie autant la réflexion que la création.",
        "Je m'intéresse également à la cybersécurité, notamment au pentesting et au red teaming. Ces domaines me permettent d'approfondir ma compréhension des systèmes informatiques, d'étudier leurs vulnérabilités et de découvrir comment leur sécurité peut être évaluée et renforcée. J'apprécie particulièrement la dimension analytique de cette discipline, qui demande de la curiosité, de la rigueur et une bonne compréhension des technologies.",
        "Ce site est un espace personnel où je rassemble mes projets, mes expérimentations et les sujets qui me passionnent. Entre sciences, développement et sécurité informatique, j'y partage ce que je construis, ce que j'apprends et les découvertes qui alimentent ma curiosité."
    ],
    valuesTitle: "Ce qui anime ma curiosité",
    values: [
        "L'astrophysique et les mystères de l'Univers",
        "Python, développement web et création de projets",
        "La cybersécurité, le pentesting et le red teaming",
        "La compréhension des systèmes, de leurs mécanismes et de leurs vulnérabilités",
        "L'apprentissage continu, l'expérimentation et la résolution de problèmes"
    ]
} as const;

export const contact = {
    metaTitle: `Contact | ${site.name}`,
    description: "Une question, un projet ou l'envie d'échanger sur l'astrophysique, la programmation ou la cybersécurité ? Écris-moi via le formulaire de contact.",
    title: "Me contacter",
    intro: "Une question, un projet intéressant ou simplement l'envie de discuter d'astrophysique, de programmation ou de cybersécurité ? Remplis le formulaire, je te réponds dès que possible.",
    emailPrompt: "Tu préfères l'e-mail ? Écris-moi à",
    privacyNotice: ["Tes informations servent uniquement à répondre à ton message. En savoir plus : ", legalLinks.privacy, "."],
    illustration: contactIllustration,
    fields: {
        email: { label: "Adresse e-mail", placeholder: "toi@exemple.fr" },
        subject: { label: "Sujet", placeholder: "De quoi veux-tu parler ?" },
        message: { label: "Message", placeholder: "Écris ton message ici..." }
    }
} as const;
