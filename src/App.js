import './index.css';
import React from 'react';
import TaskLevel from './TaskLevel';
import Navbar from './Navbar';

function App() {

  const type = "";

  return (
    <>
      <Navbar/>
      
      <div className="center">  
        <TaskLevel TaskLevelType={type}></TaskLevel>
      </div>
    </>
  );
}

export default App;
