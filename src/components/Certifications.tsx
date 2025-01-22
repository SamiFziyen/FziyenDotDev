import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { certifications } from '../data';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Certifications</h2>
      <div className="max-w-6xl mx-auto">
        <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] certification-card backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-lg p-6 shadow-lg"
            >
              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={cert.logo}
                    alt={`${cert.issuer} logo`}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold gradient-text">{cert.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Issued: {cert.issueDate}
                </p>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mt-auto"
                >
                  View Credential <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};