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
    { name: "Python", level: "familiar" },
    { name: "C#", level: "proficient" },
    { name: "JavaScript", level: "expert" },
    { name: "SQL", level: "familiar" },
  ],
};

export const frontendSkills: TechCategory = {
  label: "Frontend Skills",
  items: [
    { name: "HTML"},
    { name: "Next.js", level: "proficient" },
    { name: "Tailwind CSS", level: "proficient" },
    { name: "JavaScript", level: "expert" },
  ],
};

export const backendSkills: TechCategory = {
  label: "Backend Skills",
  items: [
    { name: "Object-Oriented Programming(OOP)", level: "familiar" },
    { name: "Node.js", level: "familiar" },
    { name: "RESTful API", level: "familiar" },
    { name: "Compute Vision", level: "familiar" },
    { name: "PyTorch", level: "familiar" },
    { name: "YOLOv8", level: "familiar" },
  ],
};

export const operationSkills: TechCategory = {
  label: "Operation Skills",
  items: [
    { name: "Linux", level: "familiar" },
    { name: "Git", level: "familiar" },
    { name: "GitHub", level: "familiar" },
    { name: "Windows", level: "familiar" },
  ],
};

export const cloudPlatforms: TechCategory = {
  label: "Experienced Cloud Platform",
  items: [
    { name: "AWS", level: "familiar" },
    { name: "Google Cloud", level: "familiar" },
    { name: "Azure", level: "familiar" },
  ],
};

export const devToolSkills: TechCategory = {
  label: "Development Tool Skills",
  items: [
    { name: "Git", level: "proficient" },
    { name: "GitHub", level: "proficient" },
    { name: "VS Code", level: "expert" },
    { name: "Jupyter Notebook", level: "familiar" },
  ],
};

export const analysisToolSkills: TechCategory = {
  label: "Analysis Tool Skills",
  items: [
    { name: "PyTorch", level: "familiar" },
    { name: "YOLOv8", level: "proficient" },
  ],
};

export const designToolSkills: TechCategory = {
  label: "Design Tool Skills",
  items: [
    { name: "AutoCAD", level: "familiar" },
    { name: "Adobe Photoshop", level: "familiar" },
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
