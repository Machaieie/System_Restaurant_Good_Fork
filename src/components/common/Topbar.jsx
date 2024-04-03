import { AppBar, Toolbar, Typography } from "@mui/material"
import colorConfigs from '../../configs/ColorConfig'
import SizeConfigs from '../../configs/SizeConfig'
import logo from "../../assets/img/other/png/logotipo.png"
const Topbar = () => {
  return (
    <AppBar
    position="fixed"
    sx={{
      width: `calc(100% - ${SizeConfigs.sidebar.width})`,
      ml:SizeConfigs.sidebar.width,
      boxShadow: "unset",
      backgroundColor: "#233049",
      color: colorConfigs.Topbar.color,
    
    }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{margin:"0 auto", color:"#fff", fontWeight:"bold"}}>
          Restaurante Bom Garfo  
        </Typography>
        <img src={logo} style={{width:"10%", margin:"0 auto"}}  />
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
