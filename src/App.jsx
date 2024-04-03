import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import Pagamentos from "./pages/pagamentos/Pagamentos"
import Reservas from './pages/reservas/Reservas'
import Pedidos from "./pages/pedidos/Pedidos"
import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from './layouts/AdminLayout'
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import React, { Suspense, lazy } from "react";
import Dashboard from './pages/dashboard/Dashboard'
import LoginPage from './pages/login/LoginPage'
import Analise from './pages/dashboard/Analise'
import Grafico from './pages/dashboard/Grafico'


function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route path='login' element={<LoginPage />}></Route>
            </Route>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path='inicio' element={<HomePage />}></Route>
              <Route path='dashboard' element={<Dashboard />}></Route>
              <Route path='reservas' element={<Reservas />}></Route>
              <Route path='pedidos' element={<Pedidos />}></Route>
              <Route path='pagamentos' element={<Pagamentos />}></Route>
              <Route path='grafico' element={<Grafico />}></Route>
              <Route path='analise' element={<Analise />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
