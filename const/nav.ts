export const navigation = [
    { name: "Home", href: "/", icon: "Building2" },
    { name: "About Us", href: "/about-us", icon: "Users" },
    { name: "Programs", href: "/program", icon: "Briefcase" },
    {
        name: "Publications",
        icon: "BookOpen",
        children: [
            { name: "Rural Equity Blueprint Series (REBS) — Volume 1 (2025)", href: "/publication/rebs-v1-2025" },
            { name: "Rethinking Rural Governance (RRG) — Volume 1 (2025)", href: "/publication/rrg-v1-2025" },
            { name: "Health Systems Assurance (HSA) — Volume 1 (January 2026)", href: "/publication/hsa-v1-2026" },
        ]
    },
    { name: "Contact", href: "#contact", icon: "Mail" },
];
