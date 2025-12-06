import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const VisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useLocalStorage('total-views', 1247);
  const [todayViews, setTodayViews] = useLocalStorage('today-views', 0);
  const [lastVisit, setLastVisit] = useLocalStorage('last-visit', '');
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();

    if (!hasIncremented) {
      if (lastVisit !== today) {
        setTodayViews(1);
      } else {
        setTodayViews(prev => prev + 1);
      }
      setTotalViews(prev => prev + 1);
      setLastVisit(today);
      setHasIncremented(true);
    }
  }, [hasIncremented]);

  const stats = [
    { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-blue-500' },
    { label: 'Today', value: todayViews, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Visitors', value: Math.floor(totalViews * 0.6), icon: Users, color: 'text-purple-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg p-4 z-40 hidden lg:block"
    >
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Analytics</h3>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
