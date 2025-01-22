import React from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden hero-background"
    >
      <div className="absolute inset-0 hero-grid"></div>
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Sami Fziyen
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 h-20">
            <Typewriter
              options={{
                strings: [
                  'Full-Stack Web Developer',
                  'Software Engineer',
                  'Problem Solver',
                  'Tech Enthusiast',
                ],
                autoStart: true,
                loop: true,
              }}
            />
            passionate about creating innovative web solutions and solving
            complex problems through technology.
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/samifziyen"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/sami-fziyen/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:fziyensami@gmail.com"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center"
        >
          <div className="portrait-wrapper">
            <div className="portrait-container">
              <div className="portrait-border"></div>
              <div className="portrait-content">
                <img
                  src="https://i.imgur.com/BQhEYCZ.jpeg"
                  alt="Portrait"
                  className="portrait-image"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
