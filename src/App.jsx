import React from 'react'
import Header from './components/Header'
import Panel from './components/Panel'
import AgregarMascota from './components/AgregarMascota'
import RegistrarEvento from './components/RegistrarEvento'
import CompraConcentrados from './components/CompraConcentrados'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main className="container my-5">
        <Panel />
        <AgregarMascota />
        <RegistrarEvento />
        <CompraConcentrados />
      </main>
      <Footer />
    </>
  )
}

export default App
