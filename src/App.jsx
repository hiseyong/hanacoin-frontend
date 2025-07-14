import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { MarketPlace } from "./pages/MarketPlace.jsx"
import { Mypage } from "./pages/MyPage.jsx"
import { UploadProduct } from "./pages/UploadProduct.jsx"
import { Product } from "./pages/Product.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Nav } from "./components/Nav"
import { Home } from "./pages/Home"
import { useAuth } from './auth/AuthContext.jsx';
import { useEffect } from 'react';

function App() {
  const { token, setToken, username, setUsername } = useAuth();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, [setToken, setUsername]);
  
  return (
    <BrowserRouter>
      <Nav isLoggedIn={token!==null} setToken={setToken} setUsername={setUsername} username={username}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} token={token}/>} />
        <Route path="/signup" element={<Signup token={token}/>} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/uploadproduct" element={<UploadProduct />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App