'use client'

import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
const ToastProdiver = () => {
  return (
    <ToastContainer
        autoClose={2000}
    />
  )
}

export default ToastProdiver