import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface Command {
  id: string;
  title: string;
  action: () => void;
  category: string;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const commands: Command[] = [
    { id: '1', title: 'Go to Skills', action: () => scrollTo('#skills'), category: 'Navigation' },
    { id: '2', title: 'Go to Timeline', action: () => scrollTo('#timeline'), category: 'Navigation' },
    { id: '3', title: 'Go to Projects', action: () => scrollTo('#projects'), category: 'Navigation' },
    { id: '4', title: 'Go to Blog', action: () => scrollTo('#blog'), category: 'Navigation' },
    { id: '5', title: 'Go to Guestbook', action: () => scrollTo('#guestbook'), category: 'Navigation' },
    { id: '6', title: 'Contact Me', action: () => scrollTo('#contact'), category: 'Navigation' },
    { id: '7', title: 'Download Resume', action: () => window.open('https://drive.google.com/file/d/1QLJaIW4KZEoUoOGEgntzu2anRrdJ1myV/view?usp=drive_link', '_blank'), category: 'Actions' },
    { id: '8', title: 'View GitHub', action: () => window.open('https://github.com/samifziyen', '_blank'), category: 'Actions' },
    { id: '9', title: 'View LinkedIn', action: () => window.open('https://linkedin.com/in/sami-fziyen/', '_blank'), category: 'Actions' },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg"
                autoFocus
              />
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No commands found</div>
              ) : (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="font-medium">{cmd.title}</div>
                    <div className="text-sm text-gray-500">{cmd.category}</div>
                  </button>
                ))
              )}
            </div>
            <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 flex items-center justify-between">
              <span>Press Esc to close</span>
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl</kbd> +
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">K</kbd>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
