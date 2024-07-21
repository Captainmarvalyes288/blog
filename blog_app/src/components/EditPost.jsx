import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';
import ImageUpload from './ImageUpload';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { user } = useFirebase();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'posts', id));
        if (postDoc.exists()) {
          const post = postDoc.data();
          setTitle(post.title);
          setContent(post.content);
          setImageUrl(post.imageUrl);
        } else {
          alert("Post not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'posts', id), {
        title,
        content,
        imageUrl,
      });
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(user);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <ImageUpload onUpload={(url) => setImageUrl(url)} />
      <button type="submit">Update Post</button>
    </form>
  );
}

export default EditPost;
