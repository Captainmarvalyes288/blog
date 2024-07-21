import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import Header from './components/Header';
import BlogList from './components/BlogList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<BlogList />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
