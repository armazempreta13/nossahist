import React, { useState, useEffect } from 'react';
import PublicStory from './components/PublicStory';
import AdminDashboard from './components/AdminDashboard';
import { INITIAL_POSTS, INITIAL_CONFIG } from './data';
import { Post, SiteConfig } from './types';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);

  // Load from local storage on mount to persist changes in this "serverless" demo
  useEffect(() => {
    const savedPosts = localStorage.getItem('nh_posts');
    const savedConfig = localStorage.getItem('nh_config');
    
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error("Failed to parse saved posts", e);
      }
    }
    
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, []);

  const handleUpdatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('nh_posts', JSON.stringify(newPosts));
  };

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('nh_config', JSON.stringify(newConfig));
  };

  if (isAdmin) {
    return (
      <AdminDashboard 
        posts={posts} 
        config={config} 
        onUpdatePosts={handleUpdatePosts}
        onUpdateConfig={handleUpdateConfig}
        onExit={() => setIsAdmin(false)}
      />
    );
  }

  return (
    <PublicStory 
      posts={posts} 
      config={config} 
      onAdminClick={() => setIsAdmin(true)} 
    />
  );
}

export default App;