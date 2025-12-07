import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  loading: boolean;
}

export const VisitorCounter: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    todayViews: 0,
    loading: true,
  });
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    const fetchAndUpdateAnalytics = async () => {
      if (!supabase || hasIncremented) return;

      try {
        const today = new Date().toISOString().split('T')[0];

        const { data, error } = await supabase
          .from('page_analytics')
          .select('*')
          .eq('date', today)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setAnalytics({
            totalViews: data.total_views,
            todayViews: data.today_views,
            loading: false,
          });

          await supabase
            .from('page_analytics')
            .update({
              total_views: data.total_views + 1,
              today_views: data.today_views + 1,
            })
            .eq('date', today);
        } else {
          await supabase
            .from('page_analytics')
            .insert([{
              date: today,
              total_views: 1,
              today_views: 1,
            }]);

          setAnalytics({
            totalViews: 1,
            todayViews: 1,
            loading: false,
          });
        }

        setHasIncremented(true);
      } catch (err) {
        console.error('Analytics error:', err);
        setAnalytics(prev => ({ ...prev, loading: false }));
      }
    };

    fetchAndUpdateAnalytics();
  }, [hasIncremented]);

  const stats = [
    { label: 'Total Views', value: analytics.totalViews, icon: Eye, color: 'text-blue-500' },
    { label: 'Today', value: analytics.todayViews, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Visitors', value: Math.floor(analytics.totalViews * 0.6), icon: Users, color: 'text-purple-500' },
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
              <p className="text-lg font-bold">{analytics.loading ? '-' : stat.value.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
