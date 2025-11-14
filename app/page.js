"use client"
import React from 'react'
import './styles/styles.css';
import Header from './components/Header';
import AddTask from './components/AddTask';


const page = () => {
  return (
    <div>
      <Header />
      <AddTask />
      
    </div>
  )
}

export default page
