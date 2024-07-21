import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';

function Header() {
  const { user } = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span>{user.email}</span>
            {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-image" />}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
