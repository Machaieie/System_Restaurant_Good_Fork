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
              <Route path='pedidos' element={<Pedidos />} />
              <Route path='pagamentos' element={<Pagamentos />} />
            
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
