import './index.css';
import { Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';

import './App.css';

import Login from './pages/Login';

import Signup from './pages/Signup';

import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import UsersDetail from './pages/UsersDetail';

import Navbar from './static/Navbar';
import PostCard from './components/PostCard';
import PostDetail from './pages/PostDetail';
import UsersPage from './pages/UsersPage';

import { Navigate, Route } from 'react-router-dom';
import Footer from './static/Footer';



const App = () => {
  return (
   <BrowserRouter>
   
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/posts" element={<PostCard />}
          />
          <Route
            path="/create" element={<CreatePost />}
           
          />
          <Route
            path="/users" element={<UsersPage />}
          />
          <Route
            path="/edit/:id" element={<EditPost />}
           
          />
          <Route path="/users/:id" element={<UsersDetail />} />
         
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer  />
    </BrowserRouter>
  )
}

export default App;