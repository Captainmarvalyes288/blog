import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = () => {
    if (!image) return;
    const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onUpload(downloadURL);
          setImage(null);
          setProgress(0);
          setPreview(null);
        });
      }
    );
  };

  return (
    <div className="image-upload">
      <input type="file" onChange={handleChange} accept="image/*" />
      {preview && <img src={preview} alt="Preview" className="image-preview" />}
      <button onClick={handleUpload} disabled={!image}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
    </div>
  );
};

export default ImageUpload;