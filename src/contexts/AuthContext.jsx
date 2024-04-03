import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../http-common";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCompetitor, setIsCompetitor] = useState(false);
  const [isPassChanged, setIsPassChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});

  const navigate = useNavigate();

  const login = async (username, password) => {    
    try {
      const response = await http.post("/auth/login?username=" + username + "&password=" + password);
      const principal = {
        id: response.data.id,
        username: response.data.username,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        roleCode: response.data.roles[0].role,
        accessToken: response.data.token,
      };
      
      setUser(principal);
      checkIsCompetitor(response.data.roleCode);
      localStorage.setItem("principal", JSON.stringify(principal));
      const userData =  await http.get(
        "/users/"+username +"/"+password)
    

      setClient({
        "id": userData.data.id,
    
        "code": userData.data.code,
     
        "nuit": userData.data.nuit,
        "contact": userData.data.contact,

        "guid": userData.data.guid});
      localStorage.setItem("clientInfo", JSON.stringify( {
        "id": userData.data.id,
    
        "code": userData.data.code,
     
        "nuit": userData.data.nuit,
        "contact": userData.data.contact,

        "guid": userData.data.guid}));

      const userLoggedIn =  await http.get("/users/"+username +"/"+password);

      if(checkIsPassChanged(response.data.passwordChanged)){
        navigate(
          "/passwordUpdate" 
        );
      }else if(checkIsCompetitor(response.data.roles[0].role)){
        console.log(client)

        navigate("/admin/dashboard");
      }else{
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Utilizador ou senha inválidos");
    }
  };

  const loginOfLoan = async (username, password) => {    
    try {
      const response = await http.post(
        "/auth/login?username=" + username + "&password=" + password
      );
      const principal = {
        username: response.data.username,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        roleCode: response.data.roles[0].role,
        accessToken: response.data.token,
      };
      setUser(principal);
      checkIsCompetitor(response.data.roleCode);

      localStorage.setItem("client", JSON.stringify(principal));
      const userData =  await http.get(
        "/clients/users/" + principal.username
      );

    const client= {
        "id": userData.data.id,
    
        "code": userData.data.code,
     
        "nuit": userData.data.nuit,
        "contact": userData.data.contact,

        "guid": userData.data.guid,}
      setClient(client);
      localStorage.setItem("client", JSON.stringify(client));
      navigate(
        checkIsCompetitor(principal.roleCode)
          ? "/simulador/" + response.data.clientId
          : "/admin/dashboard"
      );
    } catch (error) {
      toast.error("Ocorreu um erro na autenticação");
    }
  };

  const checkIsCompetitor = (roleCode) => {
    let role = "ROLE_CLIENT";
    let result = roleCode === role;
    setIsCompetitor(result);
    return result;
  };

  // const checkIsCompetitor1 = (roleCode, bankName) => {
  //   let role = "EXTERNAL_USER";
  //   let result = roleCode === role;
  //   setIsCompetitor(result);
  //   return result;

  // };

  const checkIsPassChanged = (status) => {
    let result = status === false;
    setIsPassChanged(result);
    return result;
  };

  const logout = () => {
    setUser(null);
    setIsCompetitor(false);
    localStorage.removeItem("principal");
    navigate("/");
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("principal");
    if (loggedUser) {
      const parsed = JSON.parse(loggedUser);
      setUser(parsed);
      checkIsCompetitor(parsed.roleCode);
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        isCompetitor,
        login,
        logout,
        // loginOfLoan,
        loading,
        client,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};