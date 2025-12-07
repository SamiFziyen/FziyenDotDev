import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Eye, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  tags: string[];
  views: number;
  created_at: string;
  read_time?: number;
}

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();

    if (supabase) {
      const subscription = supabase
        .channel('blog-changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'blog_posts' },
          () => { fetchBlogPosts(); }
        )
        .subscribe();

      return () => { subscription.unsubscribe(); };
    }
  }, []);

  const fetchBlogPosts = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts: BlogPost[] = (data || []).map((post: any) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.cover_image,
        tags: post.tags || [],
        views: post.views,
        created_at: post.created_at,
        read_time: Math.ceil(post.content.split(' ').length / 200),
      }));

      setPosts(formattedPosts);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const incrementView = async (postId: string) => {
    if (!supabase) return;

    try {
      const post = posts.find(p => p.id === postId);
      if (post) {
        await supabase
          .from('blog_posts')
          .update({ views: post.views + 1 })
          .eq('id', postId);

        setPosts(posts.map(p =>
          p.id === postId ? { ...p, views: p.views + 1 } : p
        ));
      }
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-50/30 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Blog & Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-50/30 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Blog & Articles</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Thoughts on web development, cloud computing, and technology
          </p>
        </motion.div>

        {posts.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full transition-all ${
                !selectedTag
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedTag === tag
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedPost(post);
                incrementView(post.id);
              }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  {post.read_time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.read_time} min
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && posts.length > 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No posts found with this tag.</p>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No blog posts available yet.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setSelectedPost(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedPost.cover_image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedPost.created_at).toLocaleDateString()}
                    </span>
                    {selectedPost.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedPost.read_time} min read
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedPost.views} views
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">{selectedPost.title}</h2>
                  <div className="flex gap-2">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
                <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                  {selectedPost.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('##')) {
                      return (
                        <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                          {paragraph.replace('##', '').trim()}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('###')) {
                      return (
                        <h3 key={i} className="text-xl font-bold mt-6 mb-3">
                          {paragraph.replace('###', '').trim()}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n');
                      return (
                        <ul key={i} className="list-disc list-inside space-y-2 my-4">
                          {items.map((item, j) => (
                            <li key={j}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.match(/^\d+\./)) {
                      const items = paragraph.split('\n');
                      return (
                        <ol key={i} className="list-decimal list-inside space-y-2 my-4">
                          {items.map((item, j) => (
                            <li key={j}>{item.replace(/^\d+\.\s/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={i} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
