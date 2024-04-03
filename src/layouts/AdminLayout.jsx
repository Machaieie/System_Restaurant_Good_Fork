import React, { useContext, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Home, AccountCircle, ExitToApp, Dashboard, MonetizationOn } from "@mui/icons-material";

const AdminLayout = () => {
    const { authenticated, user, loading, logout } = useContext(AuthContext);

    useEffect(() => {
        document.body.classList.remove("public-page");
        document.body.classList.add("admin-page");
    }, []);

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <a href="http://financiamento.co.mz/">
                            {/* <img src={logo} alt="Financiamento" width={100} height={50} /> */}
                        </a>
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="user"
                        aria-haspopup="true"
                        onClick={() => {}}
                        sx={{ mr: 2 }}
                    >
                        <AccountCircle />
                    </IconButton>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="logout"
                        onClick={handleLogout}
                        sx={{ mr: 2 }}
                    >
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem button component={Link} to={isCompetitor ? "/admin/inicio" : "/admin/dashboard"}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Início" />
                    </ListItem>
                    {nav.map((menu) => (
                        <ListItem key={menu.id}>
                            <ListItemText primary={menu.label} />
                            <List>
                                {menu.items.map((item) => (
                                    <ListItem button component={Link} to={item.link} key={item.id}>
                                        <ListItemText primary={item.label} />
                                    </ListItem>
                                ))}
                            </List>
                        </ListItem>
                    ))}
                    <ListItem button component={Link} to={"relatorio"}>
                        <ListItemIcon>
                            <MonetizationOn />
                        </ListItemIcon>
                        <ListItemText primary="Relatorios" />
                    </ListItem>
                </List>
            </Drawer>
            <div className="container">
                <div className="bx--grid" style={{ paddingTop: "4rem", paddingBottom: "1.2rem" }}>
                    <div className="main">
                        <div className="bx--col-lg-14 bx--offset-lg-2">
                            <ToastContainer
                                theme="colored"
                                position="top-right"
                                autoClose={8000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
