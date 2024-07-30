import { Box, Toolbar,useTheme, useMediaQuery  } from '@mui/material'
import React from 'react'
import Topbar from '../components/common/Topbar'
import SizeConfigs from '../configs/SizeConfig'
import Sidebar from '../components/common/Sidebar'
import colorConfigs from '../configs/ColorConfig'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    
    return (
        <Box sx={{ display: "flex" }}>
            <Topbar />
            <Box
                component="nav"
                sx={{
                    width: SizeConfigs.sidebar.width,
                    flexShrink: 0
                }}
            >
                <Sidebar />
            </Box>
            <Box
            component="main"
            sx={{
                flexGrow:1,
                width: `calc(100% -${SizeConfigs.sidebar.width})`,
                minHeight:"100vh",
                backgroundColor: colorConfigs.mainBg ,
                marginTop:1
                
            }}
            >
               
                <Toolbar/>
                
                <Outlet/>
            </Box>
        </Box>
    )
};

export default AdminLayout;
