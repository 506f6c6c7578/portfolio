import { legalLinks, type NavigationLink, pages, type RichText, site } from "./site";

export interface LegalList {
    items: readonly string[];
}

export type LegalBlock = RichText | LegalList;

interface LegalSection {
    title: string;
    blocks: readonly LegalBlock[];
}

export interface LegalDocument {
    link: NavigationLink;
    description: string;
    updatedAt: string;
    sections: readonly LegalSection[];
}

const contactFormLink = { label: "formulaire de contact", href: pages.contact };

const externalLinks = {
    ovhcloud: { label: "ovhcloud.com", href: "https://www.ovhcloud.com" },
    cloudflare: { label: "cloudflare.com", href: "https://www.cloudflare.com" },
    cloudflarePrivacy: { label: "Cloudflare", href: "https://www.cloudflare.com/privacypolicy/" },
    turnstilePrivacy: { label: "Cloudflare Turnstile", href: "https://www.cloudflare.com/turnstile-privacy-policy/" },
    resendPrivacy: { label: "Resend", href: "https://resend.com/legal/privacy-policy" },
    cnil: { label: "CNIL", href: "https://www.cnil.fr/fr/adresser-une-plainte" },
    license: { label: "licence", href: `${site.repository}/blob/main/LICENSE` }
} as const satisfies Record<string, NavigationLink>;

export const legalNotice: LegalDocument = {
    link: legalLinks.notice,
    description: `Mentions légales du site de ${site.name} : éditeur, hébergement et propriété intellectuelle.`,
    updatedAt: "2026-10-25",
    sections: [
        {
            title: "Éditeur du site",
            blocks: [
                `Ce site est édité à titre personnel et non professionnel par ${site.name}.`,
                ["Pour me contacter, utilise le ", contactFormLink, "."],
                "Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), mes éléments d'identification ont été communiqués à l'hébergeur et mon adresse postale n'est pas publiée."
            ]
        },
        {
            title: "Directeur de la publication",
            blocks: [site.name]
        },
        {
            title: "Hébergement",
            blocks: [
                "OVH SAS, 2 rue Kellermann, 59100 Roubaix, France, immatriculée au RCS de Lille Métropole sous le numéro 424 761 419.",
                "Téléphone : +33 9 72 10 10 07",
                ["Site web : ", externalLinks.ovhcloud],
                "Le site est diffusé et protégé par le réseau de Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis.",
                ["Site web : ", externalLinks.cloudflare]
            ]
        },
        {
            title: "Propriété intellectuelle",
            blocks: [
                `L'ensemble du site, notamment ses textes, illustrations, images, son identité visuelle et son code source, est la propriété exclusive de ${site.name}. Toute reproduction, représentation, modification ou réutilisation, même partielle, est interdite sans autorisation écrite préalable.`,
                ["Le code source est public uniquement pour être consulté, dans les conditions précisées par sa ", externalLinks.license, "."],
                "Les polices Signika et Heebo, les icônes Lucide et Simple Icons restent soumises à leurs licences respectives. Les marques et logos cités appartiennent à leurs titulaires."
            ]
        },
        {
            title: "Données personnelles",
            blocks: [
                ["La collecte et le traitement de tes données sont détaillés dans la ", legalLinks.privacy, "."]
            ]
        },
        {
            title: "Liens externes",
            blocks: [
                "Ce site contient des liens vers des sites tiers sur lesquels je n'exerce aucun contrôle. Je ne peux être tenu responsable de leur contenu."
            ]
        },
        {
            title: "Droit applicable",
            blocks: ["Les présentes mentions légales sont régies par le droit français."]
        }
    ]
};

export const privacyPolicy: LegalDocument = {
    link: legalLinks.privacy,
    description: `Politique de confidentialité du site de ${site.name} : données collectées, finalités, durées de conservation et droits.`,
    updatedAt: "2026-10-25",
    sections: [
        {
            title: "Responsable du traitement",
            blocks: [
                [`Le responsable du traitement des données collectées sur ce site est ${site.name}, que tu peux joindre via le `, contactFormLink, "."],
                "Ce site ne contient ni publicité, ni outil de mesure d'audience, ni traceur publicitaire. Aucune donnée n'est vendue ni utilisée à des fins commerciales."
            ]
        },
        {
            title: "Formulaire de contact",
            blocks: [
                ["Lorsque tu m'écris via le ", contactFormLink, ", je collecte ton adresse e-mail, le sujet et le contenu de ton message."],
                "Ces données servent uniquement à lire ta demande et à te répondre. Ce traitement repose sur mon intérêt légitime à répondre aux messages qui me sont adressés (article 6.1.f du RGPD).",
                "Le message est acheminé par le service d'envoi d'e-mails Resend, puis reçu dans ma messagerie. Il est conservé le temps nécessaire au suivi de notre échange, et au plus trois ans après notre dernier contact."
            ]
        },
        {
            title: "Protection anti-spam",
            blocks: [
                "Le formulaire de contact est protégé par Cloudflare Turnstile, qui analyse ton adresse IP et des signaux techniques de ton navigateur afin de distinguer les visiteurs humains des robots. Ce service est chargé uniquement sur la page de contact.",
                "Ce traitement repose sur mon intérêt légitime à protéger le formulaire contre les abus (article 6.1.f du RGPD)."
            ]
        },
        {
            title: "Journaux techniques",
            blocks: [
                "À chaque requête, le serveur enregistre des journaux techniques : adresse IP, date et heure, page demandée, page d'origine, code de réponse et navigateur utilisé.",
                "Ces journaux servent uniquement à assurer la sécurité et le bon fonctionnement du site, notamment à limiter les envois abusifs du formulaire. Ils sont conservés sur une durée limitée, puis supprimés automatiquement par rotation. Ce traitement repose sur mon intérêt légitime à sécuriser le site (article 6.1.f du RGPD).",
                "Cloudflare, qui achemine et protège le trafic du site, traite également ces données techniques."
            ]
        },
        {
            title: "Cookies et stockage local",
            blocks: [
                "Ce site ne dépose aucun cookie de mesure d'audience ni de publicité.",
                "Lorsque tu changes de thème, ta préférence (clair ou sombre) est enregistrée dans le stockage local de ton navigateur. Elle n'est jamais transmise et tu peux la supprimer à tout moment depuis les réglages de ton navigateur.",
                "Cloudflare peut déposer des cookies strictement nécessaires à la sécurité du site. Ces éléments sont exemptés de consentement, c'est pourquoi aucun bandeau ne t'est présenté."
            ]
        },
        {
            title: "Destinataires et transferts",
            blocks: [
                "Tes données ne sont accessibles qu'à moi et aux prestataires techniques strictement nécessaires :",
                {
                    items: [
                        "OVHcloud, hébergeur du site, en France",
                        "Cloudflare, pour la diffusion du site et la protection anti-spam, aux États-Unis",
                        "Resend, pour l'acheminement des messages du formulaire, aux États-Unis",
                        "Mon fournisseur de messagerie, pour la réception des messages"
                    ]
                },
                "Les transferts vers les États-Unis sont encadrés par le Data Privacy Framework UE-États-Unis ou par les clauses contractuelles types de la Commission européenne.",
                ["Pour en savoir plus, consulte les politiques de confidentialité de ", externalLinks.cloudflarePrivacy, ", de ", externalLinks.turnstilePrivacy, " et de ", externalLinks.resendPrivacy, "."]
            ]
        },
        {
            title: "Sécurité",
            blocks: [
                "Les échanges avec le site sont chiffrés en HTTPS et l'infrastructure applique le principe du moindre privilège. Aucun système n'étant infaillible, une sécurité absolue ne peut toutefois pas être garantie."
            ]
        },
        {
            title: "Tes droits",
            blocks: [
                "Conformément au RGPD et à la loi Informatique et Libertés, tu disposes sur tes données des droits suivants :",
                {
                    items: [
                        "Droit d'accès",
                        "Droit de rectification",
                        "Droit à l'effacement",
                        "Droit à la limitation du traitement",
                        "Droit d'opposition",
                        "Droit de définir des directives sur le sort de tes données après ton décès"
                    ]
                },
                ["Pour les exercer, écris-moi via le ", contactFormLink, ". Je te réponds dans un délai d'un mois au plus."],
                ["Si tu estimes, après m'avoir contacté, que tes droits ne sont pas respectés, tu peux adresser une réclamation à la ", externalLinks.cnil, "."]
            ]
        },
        {
            title: "Modifications",
            blocks: [
                "Cette politique peut évoluer, notamment en cas de changement de prestataire. La date de sa dernière mise à jour figure en haut de cette page."
            ]
        }
    ]
};
