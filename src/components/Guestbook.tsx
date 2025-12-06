import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Heart } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
  avatar: string;
}

const generateAvatar = (name: string) => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return colors[colorIndex];
};

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<GuestbookEntry[]>('guestbook-entries', [
    {
      id: '1',
      name: 'Sarah Johnson',
      message: 'Amazing portfolio! Love the interactive elements and clean design. Keep up the great work!',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      likes: 12,
      avatar: generateAvatar('Sarah Johnson'),
    },
    {
      id: '2',
      name: 'Mike Chen',
      message: 'Really impressed by your full-stack skills. The blog section is particularly well done.',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      likes: 8,
      avatar: generateAvatar('Mike Chen'),
    },
    {
      id: '3',
      name: 'Emma Davis',
      message: 'Your AWS certifications are impressive! Would love to collaborate on a project sometime.',
      timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
      likes: 15,
      avatar: generateAvatar('Emma Davis'),
    },
  ]);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedEntries, setLikedEntries] = useLocalStorage<Set<string>>('liked-entries', new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      avatar: generateAvatar(name),
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
    toast.success('Thanks for signing the guestbook!');
  };

  const handleLike = (entryId: string) => {
    const newLikedEntries = new Set(likedEntries);
    if (newLikedEntries.has(entryId)) {
      newLikedEntries.delete(entryId);
      setEntries(entries.map(e => e.id === entryId ? { ...e, likes: e.likes - 1 } : e));
    } else {
      newLikedEntries.add(entryId);
      setEntries(entries.map(e => e.id === entryId ? { ...e, likes: e.likes + 1 } : e));
    }
    setLikedEntries(newLikedEntries);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
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
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {message.length}/280
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-5 h-5" />
            Sign Guestbook
          </button>
        </motion.form>

        <div className="space-y-4">
          {entries.map((entry, index) => (
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
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{entry.name}</h4>
                      <p className="text-sm text-gray-500">{formatDate(entry.timestamp)}</p>
                    </div>
                    <button
                      onClick={() => handleLike(entry.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                        likedEntries.has(entry.id)
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedEntries.has(entry.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{entry.likes}</span>
                    </button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Be the first to sign the guestbook!</p>
          </div>
        )}
      </div>
    </section>
  );
};
