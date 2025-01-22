import React from 'react';
import { motion } from 'framer-motion';
import { timeline } from '../data';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';

export const Timeline: React.FC = () => {
  const education = timeline.filter((item) => item.type === 'education');
  const work = timeline.filter((item) => item.type === 'work');

  const TimelineColumn = ({
    items,
    title,
    icon: Icon,
  }: {
    items: typeof timeline;
    title: string;
    icon: typeof GraduationCap;
  }) => (
    <div className="flex-1">
      <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
        <Icon className="w-6 h-6" />
        {title}
      </h3>
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: title === 'Education' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`timeline-card ${
              item.type === 'education' ? 'timeline-education' : 'timeline-work'
            }`}
          >
            <div className="flex items-start gap-4">
              {item.logo && (
                <img
                  src={item.logo}
                  alt={`${item.organization} logo`}
                  className="w-16 h-16 object-contain rounded-lg"
                />
              )}
              <div className="flex-1">
                <h4 className="text-xl font-semibold gradient-text">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {item.organization}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{item.period}</span>
                </div>
                {Array.isArray(item.description) ? (
                  <ul className="mt-4 space-y-2 list-none">
                    {item.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="timeline" className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Experience & Education
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <TimelineColumn items={work} title="Work Experience" icon={Briefcase} />
        <TimelineColumn
          items={education}
          title="Education"
          icon={GraduationCap}
        />
      </div>
    </section>
  );
};
