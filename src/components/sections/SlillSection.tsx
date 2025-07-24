import MotionWrapper from "@/components/ui/MotionWrapper";

type SkillCategory = {
  name: string;
  icon?: string;
  skills: string[];
};

const skillData: SkillCategory[] = [
  {
    name: "フロントエンド",
    icon: "💻",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "バックエンド",
    icon: "🛠",
    skills: ["Laravel", "Node.js", "Express"],
  },
  {
    name: "データベース",
    icon: "🗄",
    skills: ["MySQL", "MongoDB", "Firebase"],
  },
];

export default function SkillSection() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">スキルセット</h2>
      <MotionWrapper>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillData.map((category) => (
            <div key={category.name} className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>{category.icon}</span>
                {category.name}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-gray-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MotionWrapper>
    </section>
  );
}
