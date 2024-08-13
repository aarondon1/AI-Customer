'use client'
import React from 'react';
import Chatbot from './components/chatbot.jsx';
import MainContent from './components/mainContent.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export default function Home() {
  return(  
    <div>
  <Header />
  <MainContent />
  <Chatbot />
  <Footer />
  </div>
  )
}