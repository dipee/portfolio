export const siteConfig = {
  name: "Dipendra Nath",
  title: "Dipendra Nath | Full-Stack Developer",
  description:
    "Portfolio of Dipendra Nath — Full-Stack Developer architecting high-performance digital ecosystems.",
  email: "dipen.2052@gmail.com",
  githubUsername: "dipee",
  resumePath: "/api/assets/resume",
  photoPath: "/api/assets/photo",
  social: {
    github: "https://github.com/dipee",
    linkedin: "https://www.linkedin.com/in/nath-dipendra",
    twitter: "https://twitter.com",
  },
} as const;

export const footerSocialLinks = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Twitter", href: siteConfig.social.twitter },
] as const;
