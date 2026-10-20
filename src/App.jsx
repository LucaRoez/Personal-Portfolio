import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Contact from "./components/Contact";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="root-container">
        <header>
          <NavBar />
        </header>
        <main>
          <div className="site-eyebrow ps-1">
            <span>DESARROLLO WEB Y SOFTWARE · EN PARAGUAY</span>
          </div>
          <Banner />
          <Contact />
        </main>
        <footer></footer>
      </div>
    </>
  )
}

export default App
