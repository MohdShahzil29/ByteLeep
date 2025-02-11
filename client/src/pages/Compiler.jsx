import React from 'react'
import Header from '../components/compiler/Header'
import CompilerList from '../components/compiler/CompilerList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Compiler = () => {
  return (
    <div>
        <Header />
        <CompilerList />
        <NewsLetter />
        <Footer />
    </div>
  )
}

export default Compiler