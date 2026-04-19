export type TechItem = {
  name: string;
  level?: "familiar" | "proficient" | "expert";
};

export type TechCategory = {
  label: string;
  items: TechItem[];
};

export const languages: TechCategory = {
  label: "Languages",
  items: [
    { name: "TypeScript", level: "proficient" },
    { name: "JavaScript", level: "proficient" },
    { name: "Python", level: "familiar" },
    { name: "HTML", level: "expert" },
    { name: "CSS", level: "proficient" },
    { name: "SQL", level: "familiar" },
  ],
};

export const frontendSkills: TechCategory = {
  label: "Frontend Skills",
  items: [
    { name: "React", level: "proficient" },
    { name: "Next.js", level: "proficient" },
    { name: "Tailwind CSS", level: "proficient" },
    { name: "Shadcn UI", level: "familiar" },
    { name: "Framer Motion", level: "familiar" },
  ],
};

export const backendSkills: TechCategory = {
  label: "Backend Skills",
  items: [
    { name: "Node.js", level: "familiar" },
    { name: "REST API", level: "familiar" },
    { name: "PostgreSQL", level: "familiar" },
    { name: "Prisma", level: "familiar" },
  ],
};

export const operationSkills: TechCategory = {
  label: "Operation Skills",
  items: [
    { name: "Linux", level: "familiar" },
    { name: "Docker", level: "familiar" },
    { name: "CI/CD", level: "familiar" },
    { name: "Nginx", level: "familiar" },
  ],
};

export const cloudPlatforms: TechCategory = {
  label: "Experienced Cloud Platform",
  items: [
    { name: "Vercel", level: "proficient" },
    { name: "AWS", level: "familiar" },
    { name: "Google Cloud", level: "familiar" },
    { name: "Cloudflare", level: "familiar" },
  ],
};

export const devToolSkills: TechCategory = {
  label: "Development Tool Skills",
  items: [
    { name: "Git", level: "proficient" },
    { name: "GitHub", level: "proficient" },
    { name: "VS Code", level: "expert" },
    { name: "ESLint", level: "familiar" },
    { name: "Prettier", level: "familiar" },
  ],
};

export const analysisToolSkills: TechCategory = {
  label: "Analysis Tool Skills",
  items: [
    { name: "Google Analytics", level: "familiar" },
    { name: "Jupyter Notebook", level: "familiar" },
    { name: "Pandas", level: "familiar" },
    { name: "Excel", level: "proficient" },
  ],
};

export const designToolSkills: TechCategory = {
  label: "Design Tool Skills",
  items: [
    { name: "Figma", level: "familiar" },
    { name: "Canva", level: "familiar" },
    { name: "Adobe Illustrator", level: "familiar" },
  ],
};

export const allTechCategories: TechCategory[] = [
  languages,
  frontendSkills,
  backendSkills,
  operationSkills,
  cloudPlatforms,
  devToolSkills,
  analysisToolSkills,
  designToolSkills,
];
