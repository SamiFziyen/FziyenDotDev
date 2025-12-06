import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Coffee, Rocket } from 'lucide-react';

const easterEggMessages = [
  { icon: Code, message: "You found the secret! I love clean code and elegant solutions.", color: "text-blue-500" },
  { icon: Coffee, message: "Coffee is my debugging tool of choice!", color: "text-amber-600" },
  { icon: Rocket, message: "Always reaching for the stars in tech!", color: "text-purple-500" },
  { icon: Sparkles, message: "You're awesome for exploring! Let's build something great together.", color: "text-pink-500" },
];

export const EasterEgg: React.FC = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState(0);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key].slice(-8);
      setKonami(newKonami);

      if (newKonami.join(',') === konamiCode.join(',')) {
        setIsTriggered(true);
        setCurrentMessage(Math.floor(Math.random() * easterEggMessages.length));
        setTimeout(() => setIsTriggered(false), 5000);
        setKonami([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  const message = easterEggMessages[currentMessage];
  const Icon = message.icon;

  return (
    <AnimatePresence>
      {isTriggered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: [0, 10, -10, 10, 0],
          }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-2xl p-8 shadow-2xl max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Icon className={`w-12 h-12 ${message.color}`} />
              </motion.div>
              <h3 className="text-2xl font-bold">Easter Egg Found! </h3>
            </div>
            <p className="text-lg leading-relaxed">{message.message}</p>
            <div className="mt-4 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
