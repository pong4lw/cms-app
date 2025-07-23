export type SkillCategory = {
  name: string
  icon?: string
  skills: string[]
}

export const skillData: SkillCategory[] = [
  {
    name: "フロントエンド",
    icon: "💻",
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    name: "バックエンド",
    icon: "🛠",
    skills: ["Laravel", "Node.js", "Express"],
  },
]
