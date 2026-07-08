export const siteConfig = {
  name: "Dipendra Nath",
  title: "Dipendra Nath | Full-Stack Developer",
  description:
    "Full Stack Software Developer with 5+ years of experience building scalable web applications using React, Django, FastAPI, Spring Boot, PostgreSQL, Docker, and AWS.",
  email: "dipen.2052@gmail.com",
  website: "https://www.dipendranath.com.np",
  githubUsername: "dipee",
  resumePath: "/api/assets/resume",
  photoPath: "/api/assets/photo",
  social: {
    github: "https://github.com/dipee",
    linkedin: "https://www.linkedin.com/in/nath-dipendra",
  },
} as const;

export const footerSocialLinks = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
] as const;
