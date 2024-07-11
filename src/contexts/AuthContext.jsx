import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import http from "../http-common";
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await http.post("/auth/login", {
        "username": `${username}`,
        "password": `${password}`
      });
      console.log("AuthResponse =>", response)
      if (response.status === 200) {
        const principal = {
          id: response.data.id,
          username: response.data.username,
          nome: response.data.nome,
          roleCode: response.data.roles[0].role,
          accessToken: response.data.token,
        };
        toast.success("Usuario cadastrado com sucesso!")
        setIsAuthenticated(true);
        localStorage.setItem("principal", JSON.stringify(principal));
        setUser(principal);

        console.log("compilou tudo", principal)
      }
      //console.log("")
      navigate("/admin/inicio")
    } catch (error) {
      toast.error("Utilizador ou senha inválidos");
    }
  };




  useEffect(() => {
    const loggedUser = localStorage.getItem("principal");
    if (loggedUser) {
      const parsed = JSON.parse(loggedUser);

    }

  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          login,

        }}
      >
        {children}
      </AuthContext.Provider>
      <ToastContainer />
    </>


  );
};