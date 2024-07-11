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
import ProtectedRoute from './contexts/PrivateRoutes'
import AdicionarReserva from './pages/reservas/AdicionarReserva'
import AdicionarPedido from './pages/pedidos/AdicionarPedido'
import Pratos from './pages/pratos/Pratos'
import AdicionarPrato from './pages/pratos/AdicionarPrato'
import Carteira from './pages/carteira/Carteira'
import Contas from './pages/conta/Contas'
import NotFoundPage from './pages/notFoundPage/NotFoundPage'


function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route path='login' element={<LoginPage />}></Route>
            </Route>
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path='inicio' element={<HomePage />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='reservas' element={<Reservas />} />
              <Route path='adicionarReserva' element={<AdicionarReserva />} />
              <Route path='pedidos' element={<Pedidos />} />
              <Route path='pratos' element={<Pratos />} />
              <Route path='adicionarPrato' element={<AdicionarPrato />} />
              <Route path='adicionarPedido' element={<AdicionarPedido />} />
              <Route path='pagamentos' element={<Pagamentos />} />
              <Route path='carteira' element={<Carteira />} />
              <Route path='conta' element={<Contas />} />
              <Route path='error' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
