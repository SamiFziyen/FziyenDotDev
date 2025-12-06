import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Eye, X, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  views: number;
  createdAt: string;
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with React and TypeScript',
    slug: 'building-modern-web-apps-react-typescript',
    excerpt: 'Explore best practices for building scalable web applications using React and TypeScript. Learn about type safety, component architecture, and more.',
    content: `TypeScript has become an essential tool in modern web development, especially when combined with React. In this article, I'll share my experience and best practices for building scalable applications.

## Why TypeScript?

TypeScript provides type safety, better IDE support, and catches errors early in the development process. When working on large projects, these benefits become invaluable.

## Key Concepts

1. **Type Safety**: Catch errors before runtime
2. **Better Refactoring**: Confidently restructure code
3. **Enhanced IDE Support**: Autocomplete and intelligent suggestions

## Component Architecture

Building maintainable React applications requires thoughtful component design. Here are my key principles:

- Keep components small and focused
- Use TypeScript interfaces for props
- Leverage hooks for state management
- Implement proper error boundaries

## Performance Optimization

Performance is crucial for user experience:

- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize bundle size with tree shaking
- Monitor performance with React DevTools

The combination of React and TypeScript creates a powerful foundation for building robust, maintainable applications!`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'Web Development'],
    views: 127,
    createdAt: '2024-11-15',
    readTime: 5,
  },
  {
    id: '2',
    title: 'My Journey into Cloud Computing with AWS',
    slug: 'my-journey-cloud-computing-aws',
    excerpt: 'Discover my journey learning AWS cloud services, from EC2 to Lambda, and how cloud computing transformed my development workflow.',
    content: `Cloud computing has revolutionized how we build and deploy applications. Here's my experience learning AWS and earning my certifications.

## Why AWS?

AWS is the leading cloud provider with a comprehensive suite of services. From EC2 to Lambda, the possibilities are endless.

## What I Learned

### Infrastructure as Code
Using CloudFormation and Terraform to manage infrastructure programmatically has been a game-changer. No more manual configuration!

### Serverless Architecture
Building with Lambda and API Gateway allows for rapid development without managing servers.

### Database Management
From RDS to DynamoDB, AWS offers various database solutions for different needs.

### Security Best Practices
IAM policies, VPC configuration, and encryption are crucial for secure applications.

## Key Takeaways

The cloud enables rapid scaling and deployment. Understanding these services has been crucial for my development career. The ability to deploy globally in minutes is remarkable!`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    tags: ['AWS', 'Cloud Computing', 'DevOps'],
    views: 89,
    createdAt: '2024-10-28',
    readTime: 4,
  },
  {
    id: '3',
    title: 'The Power of Full-Stack Development',
    slug: 'power-of-fullstack-development',
    excerpt: 'Why full-stack development is a powerful skillset in modern software engineering. Explore the technologies and mindset needed.',
    content: `Being a full-stack developer means understanding both frontend and backend technologies. Here's why this skillset is so valuable.

## Frontend Mastery

React, Vue, and modern JavaScript frameworks enable creating amazing user experiences. Responsive design and performance optimization are crucial skills.

### Key Frontend Skills
- Component-based architecture
- State management (Redux, Context)
- Responsive design principles
- Performance optimization

## Backend Expertise

Node.js, databases, and API design form the backbone of any application. Understanding server architecture and scalability is essential.

### Backend Fundamentals
- RESTful API design
- Database design and optimization
- Authentication and authorization
- Caching strategies

## The Bridge Between

Full-stack developers can see the bigger picture. We understand how data flows from database to user interface and back. This holistic view enables better architectural decisions.

## My Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, Python
- **Database**: PostgreSQL, MongoDB, Supabase
- **DevOps**: Docker, Kubernetes, AWS

The future is full-stack! The ability to build complete applications from scratch is incredibly empowering.`,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
    tags: ['Full-Stack', 'Web Development', 'Career'],
    views: 203,
    createdAt: '2024-10-10',
    readTime: 6,
  },
];

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
                  src={selectedPost.coverImage}
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
                      {new Date(selectedPost.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedPost.readTime} min read
                    </span>
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
