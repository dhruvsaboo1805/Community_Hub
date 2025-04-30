import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Article from './pages/Article';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </div>
  );
}

export default App;
