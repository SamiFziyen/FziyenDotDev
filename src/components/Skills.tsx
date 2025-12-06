import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Cloud,
  Layers,
  Workflow,
  Terminal,
  PenTool,
  Monitor,
  Zap,
  Grid3x3,
  Target,
} from "lucide-react";
import { SkillRadar } from "./SkillRadar";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Monitor className="w-6 h-6 text-blue-500" />,
    skills: [
      { name: "ReactJS", icon: <Code2 className="w-5 h-5" /> },
      { name: "TypeScript", icon: <Code2 className="w-5 h-5" /> },
      { name: "Next.JS", icon: <Code2 className="w-5 h-5" /> },
      { name: "HTML/CSS", icon: <PenTool className="w-5 h-5" /> },
    ],
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6 text-green-500" />,
    skills: [
      { name: "Node.js", icon: <Terminal className="w-5 h-5" /> },
      { name: "C#", icon: <Terminal className="w-5 h-5" /> },
      { name: "Python", icon: <Terminal className="w-5 h-5" /> },
      { name: "Express.js", icon: <Server className="w-5 h-5" /> },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-6 h-6 text-purple-500" />,
    skills: [
      { name: "MySQL", icon: <Database className="w-5 h-5" /> },
      { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
      { name: "OracleDB", icon: <Database className="w-5 h-5" /> },
      { name: "Supabase", icon: <Zap className="w-5 h-5" /> },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Cloud className="w-6 h-6 text-orange-500" />,
    skills: [
      { name: "Docker & Kubernetes", icon: <Layers className="w-5 h-5" /> },
      { name: "Git", icon: <Workflow className="w-5 h-5" /> },
      { name: "AWS", icon: <Cloud className="w-5 h-5" /> },
      { name: "Azure", icon: <Cloud className="w-5 h-5" /> },
    ],
  },
];

export const Skills: React.FC = () => {
  const [view, setView] = useState<'grid' | 'radar'>('grid');

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Skills & Expertise</h2>
          <div className="flex gap-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                view === 'grid'
                  ? 'bg-white dark:bg-gray-800 shadow-md'
                  : 'hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setView('radar')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                view === 'radar'
                  ? 'bg-white dark:bg-gray-800 shadow-md'
                  : 'hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Radar</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {category.skills.map((skill) => (
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
            </motion.div>
          ) : (
            <motion.div
              key="radar"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <SkillRadar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
