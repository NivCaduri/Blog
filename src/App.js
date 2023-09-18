import Header from './header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import New from './new/New';
import Login from './login/Login';
import OpenPost from './home/OpenPost';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div>
      <header>
        <Header />
      </header>

      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<OpenPost />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
