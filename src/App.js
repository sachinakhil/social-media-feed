import React, { useState, useEffect } from 'react';
import Post from './components/Post';
import './styles.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3f43ab5d2e3b45cfae922417afa25439`);
        const data = await response.json();
        if (data.articles.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...data.articles]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
      setLoading(false);
    };
    

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="feed">
      <h1>Social Media Feed</h1>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
      {loading && <div className="loading">Loading more posts...</div>}
      {!hasMore && <div className="end-message">No more posts to load.</div>}
    </div>
  );
}

export default App;
