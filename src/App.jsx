import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Contact from "./components/Contact";
import Services from './components/Services';
import Footer from './components/Footer';

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
          <Services />
          <Contact />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default App
