"use client"
import React from 'react'
import './styles/styles.css';
import Header from './components/Header';
import AddTask from './components/AddTask';


const page = () => {
  return (
    <div>
      <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet'></link>
      <Header />
      <AddTask />
      
    </div>
  )
}

export default page
