import React from 'react';
import { motion } from 'framer-motion';

interface SkillData {
  name: string;
  level: number;
}

export const SkillRadar: React.FC = () => {
  const skills: SkillData[] = [
    { name: 'Frontend', level: 90 },
    { name: 'Backend', level: 85 },
    { name: 'Database', level: 80 },
    { name: 'DevOps', level: 75 },
    { name: 'Cloud', level: 80 },
    { name: 'UI/UX', level: 70 },
  ];

  const size = 300;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = 5;

  const getPoint = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radian - Math.PI / 2),
      y: center + radius * Math.sin(radian - Math.PI / 2),
    };
  };

  const createPolygonPoints = (levelPercent: number) => {
    const radius = maxRadius * levelPercent;
    return skills
      .map((_, i) => {
        const angle = (360 / skills.length) * i;
        const point = getPoint(angle, radius);
        return `${point.x},${point.y}`;
      })
      .join(' ');
  };

  const dataPoints = skills.map((skill, i) => {
    const angle = (360 / skills.length) * i;
    const radius = maxRadius * (skill.level / 100);
    return getPoint(angle, radius);
  });

  return (
    <div className="flex justify-center items-center p-8">
      <svg width={size} height={size} className="filter drop-shadow-lg">
        {[...Array(levels)].map((_, i) => {
          const levelPercent = (i + 1) / levels;
          return (
            <polygon
              key={i}
              points={createPolygonPoints(levelPercent)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-gray-700"
              opacity={0.3}
            />
          );
        })}

        {skills.map((_, i) => {
          const angle = (360 / skills.length) * i;
          const end = getPoint(angle, maxRadius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-gray-700"
              opacity={0.3}
            />
          );
        })}

        <motion.polygon
          points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
          fill="url(#skillGradient)"
          stroke="url(#skillStroke)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#8b5cf6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
            className="cursor-pointer hover:r-8 transition-all"
          />
        ))}

        {skills.map((skill, i) => {
          const angle = (360 / skills.length) * i;
          const labelPoint = getPoint(angle, maxRadius + 25);
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              className="text-sm font-medium fill-current"
              dominantBaseline="middle"
            >
              {skill.name}
            </text>
          );
        })}

        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="skillStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
