import React from 'react';
import './App.css';
import Footer from './components/footer';
import Feed from './components/feed';


function App() {
  return (
    <div className="App">
      <h1 className='text-3xl text-center my-6'>The Outdated Adventures of a Perpetually Distracted Artist</h1>
      <Feed />
      <Footer />
    </div>
  );
}

export default App;
