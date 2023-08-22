import './App.css';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import Radio from './Radio';
import Hero from './Hero';
import Footer from './Footer';

function App() {
  useEffect(() => {
    Cookies.set('yourCookieName', 'yourCookieValue', {
      sameSite: 'none',
      secure: true,
    });

    Cookies.set('anotherCookie', 'anotherValue', { sameSite: 'strict' });

    Cookies.set('yetAnotherCookie', 'yetAnotherValue', { sameSite: 'lax' });
  }, []);
  return (
    <div className='App'>
      <h1>Radio Player</h1>
      <Hero />
      <Radio />
      <Footer />
    </div>
  );
}

export default App;
