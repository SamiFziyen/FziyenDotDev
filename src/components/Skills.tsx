import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Server,
  Cloud,
  Layers,
  Workflow,
  Terminal,
  PenTool,
  Cpu,
  Monitor,
  Zap,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Monitor className="w-6 h-6 text-blue-500" />,
    skills: [
      { name: 'React', icon: <Code2 className="w-5 h-5" /> },
      { name: 'TypeScript', icon: <Code2 className="w-5 h-5" /> },
      { name: 'JavaScript (ES6+)', icon: <Code2 className="w-5 h-5" /> },
      { name: 'HTML/CSS', icon: <PenTool className="w-5 h-5" /> },
    ],
  },
  {
    title: 'Backend Development',
    icon: <Server className="w-6 h-6 text-green-500" />,
    skills: [
      { name: 'Node.js', icon: <Terminal className="w-5 h-5" /> },
      { name: 'C#', icon: <Terminal className="w-5 h-5" /> },
      { name: 'Python', icon: <Terminal className="w-5 h-5" /> },
      { name: 'Express.js', icon: <Server className="w-5 h-5" /> },
    ],
  },
  {
    title: 'Databases',
    icon: <Database className="w-6 h-6 text-purple-500" />,
    skills: [
      { name: 'MySQL', icon: <Database className="w-5 h-5" /> },
      { name: 'MongoDB', icon: <Database className="w-5 h-5" /> },
      { name: 'OracleDB', icon: <Database className="w-5 h-5" /> },
      { name: 'Supabase', icon: <Zap className="w-5 h-5" /> },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: <Cloud className="w-6 h-6 text-orange-500" />,
    skills: [
      { name: 'Docker & Kubernetes', icon: <Layers className="w-5 h-5" /> },
      { name: 'Git', icon: <Workflow className="w-5 h-5" /> },
      { name: 'AWS', icon: <Cloud className="w-5 h-5" /> },
      { name: 'Linux', icon: <Cpu className="w-5 h-5" /> },
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h3 className="text-xl font-semibold">{category.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
