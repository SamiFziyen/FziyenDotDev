import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
  avatar: string;
}

const generateAvatar = (name: string) => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return colors[colorIndex];
};

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEntries();

    if (supabase) {
      const subscription = supabase
        .channel('guestbook-changes')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'guestbook_entries' },
          () => { fetchEntries(); }
        )
        .subscribe();

      return () => { subscription.unsubscribe(); };
    }
  }, []);

  const fetchEntries = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('guestbook_entries')
        .select('id, name, message, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedEntries: GuestbookEntry[] = (data || []).map(entry => ({
        id: entry.id,
        name: entry.name,
        message: entry.message,
        created_at: entry.created_at,
        avatar: generateAvatar(entry.name),
      }));

      setEntries(formattedEntries);
    } catch (err) {
      console.error('Error fetching guestbook entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!supabase) {
      toast.error('Database connection error');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('guestbook_entries')
        .insert([{
          name: name.trim(),
          message: message.trim(),
        }]);

      if (error) throw error;

      setName('');
      setMessage('');
      toast.success('Thanks for signing the guestbook!');
      fetchEntries();
    } catch (err) {
      console.error('Error submitting entry:', err);
      toast.error('Failed to submit entry');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (created_at: string) => {
    const date = new Date(created_at);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="guestbook" className="py-20 px-4 bg-gradient-to-b from-purple-50/30 to-transparent dark:from-purple-900/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl font-bold">Guestbook</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Leave a message and share your thoughts!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none transition-shadow"
              maxLength={50}
              disabled={submitting}
            />
          </div>
          <div className="mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none transition-shadow resize-none"
              maxLength={280}
              disabled={submitting}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {message.length}/280
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-5 h-5" />
            {submitting ? 'Signing...' : 'Sign Guestbook'}
          </button>
        </motion.form>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 h-24 rounded-xl" />
                ))}
              </div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Be the first to sign the guestbook!</p>
            </div>
          ) : (
            entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${entry.avatar} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <h4 className="font-semibold text-lg">{entry.name}</h4>
                      <p className="text-sm text-gray-500">{formatDate(entry.created_at)}</p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {entry.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
