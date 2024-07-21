import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';
import ImageUpload from './ImageUpload';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const navigate = useNavigate();
  const { user } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        imageUrl,
        profileImageUrl,
        authorId: user.uid,
        authorEmail: user.email,
        createdAt: new Date(),
      });
      navigate('/');
    } catch (error) {
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
      <ImageUpload onUpload={(url) => setProfileImageUrl(url)} />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
