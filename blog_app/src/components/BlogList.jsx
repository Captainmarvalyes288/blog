import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';

function BlogList() {
  const { user } = useFirebase();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const querySnapshot = await getDocs(postsRef);
        const postsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(postsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="blog-list">
      {user && <Link to="/create"><button className="create-post-button">Create New Post</button></Link>}
      {posts.map((post) => (
        <div key={post.id} className="blog-post-preview">
          <h2>{post.title}</h2>
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="post-image-preview" 
              onError={(e) => {
                console.error("Image failed to load:", post.imageUrl);
                e.target.style.display = 'none';
              }}
            />
          )}
          {post.profileImageUrl && (
            <img 
              src={post.profileImageUrl} 
              alt={`${post.authorEmail}'s profile`} 
              className="profile-image-preview" 
              onError={(e) => {
                console.error("Profile image failed to load:", post.profileImageUrl);
                e.target.style.display = 'none';
              }}
            />
          )}
          <p>{post.content.substring(0, 100)}...</p>
          <Link to={`/post/${post.id}`} className="read-more-link">Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
