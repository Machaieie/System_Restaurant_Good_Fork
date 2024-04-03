import React from 'react'
import { 
    Divider, 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Stack, 
    styled, 
    Toolbar 
} from "@mui/material"
import { Link } from "react-router-dom"
import { LogoutOutlined } from "@mui/icons-material"
import colorConfigs from '../../configs/ColorConfig'
import SizeConfigs from '../../configs/SizeConfig'
import logo from "../../assets/img/other/png/logo-no-background.png"


const Sidebar = () => {
  return (
    <Drawer
    variant="permanent"
    sx={{
      width: SizeConfigs.sidebar.width,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: `${SizeConfigs.sidebar.width}`,
        boxSizing: "border-box",
        borderRight: "0px",
        backgroundColor: colorConfigs.sidebar.bg,
        color: colorConfigs.sidebar.color
      }
    }}
    >
      <List disablePadding>
      <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ height: "90px", marginTop: "8px", marginBottom: "8px", width: "250px" }}
            direction="row"
            justifyContent="center"
          >
            <img src={logo} alt="" />
          </Stack>
        </Toolbar>
        <Divider />
      </List>
    </Drawer>
  )
}

export default Sidebar
