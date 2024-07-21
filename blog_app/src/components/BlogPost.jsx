import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

function BlogPost() {
  const { id } = useParams();
  const { user } = useFirebase();
  const [post, loading, error] = useDocumentData(doc(db, 'posts', id));
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        navigate('/');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!post) return <p>Post not found.</p>; 

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="post-image" />}
      <p>{post.content}</p>
      <p>Author: {post.authorEmail}</p>
      {user && user.uid === post.authorId && (
        <div className="post-actions">
          <Link to={`/edit/${id}`} className="edit-button">Edit</Link>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      )}
    </div>
  );
}

export default BlogPost;
