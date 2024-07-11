import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import colorConfigs from '../../configs/ColorConfig';
import SizeConfigs from '../../configs/SizeConfig';
import logo from '../../assets/img/other/png/logotipo.png';
import { AuthContext } from '../../contexts/AuthContext';

const Topbar = () => {
    const { user } = useContext(AuthContext);
    const userName = user?.name || 'Usuário'; // Substitua por como você obtém o nome do usuário
    const userInitial = userName ? userName.charAt(0).toUpperCase() : ''; // Obtém a inicial do nome do usuário

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${SizeConfigs.sidebar.width})`,
                ml: SizeConfigs.sidebar.width,
                boxShadow: 'unset',
                backgroundColor: '#233049',
                color: colorConfigs.Topbar.color,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                    Restaurante Bom Garfo
                </Typography>
                <img src={logo} alt="logo" style={{ width: '10%', marginLeft: 'auto' }} />
            </Toolbar>
           
        </AppBar>
    );
};

export default Topbar;
