import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Sami Fziyen
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Full-stack developer passionate about creating innovative web
              solutions and solving complex problems through technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/samifziyen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/sami-fziyen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:fziyensami@gmail.com"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Certifications
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5" />
                fziyensami@gmail.com
              </li>
              {/* <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone className="w-5 h-5" />
                +358-000000000
              </li> */}
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5" />
                Kokkola, Finland
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Sami Fziyen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
