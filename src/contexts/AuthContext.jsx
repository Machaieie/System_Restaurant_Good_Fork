import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../http-common";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


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
        
        localStorage.setItem("principal", JSON.stringify(principal));
        console.log("IsLogged =>",isLogged)
        //navigate("/")
      }
      
      
    } catch (error) {
      toast.error("Utilizador ou senha inválidos");
    }
  };


  useEffect(() => {
    const loggedUser = localStorage.getItem("principal");
    if (loggedUser) {
      const parsed = JSON.parse(loggedUser);
      setUser(parsed);
    }
    
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        login,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};