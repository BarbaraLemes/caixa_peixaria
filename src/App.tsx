import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
//colocar aqui para redenrizar o arquivo novo RoutesApp.jsx

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App