import React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, Stack } from '@mui/material';
import sideIcon from "../../assets/img/other/png/sideicon.png";
import colorConfigs from '../../configs/ColorConfig';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { toast } from "react-toastify";
import * as Yup from "yup";
import logo from "../../assets/img/other/png/logotipo.png"
import { colors } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
});

const LoginPage = () => {
    return (
        <Box
            sx={{
                margin:-1,
                padding:0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: `url(${logo})`,
                backgroundSize: "40%",
                backgroundRepeat: "no-repeat",
                backgroundColor: colorConfigs.sidebar.bg,
            
            }}
        >
            <Card
                size="lg"
                variant="plain"
                orientation="horizontal"
                style={{
                    textAlign: 'center',
                    maxWidth: '100%',
                    margin: "40% auto",
                    width: 600,
                    resize: 'horizontal',
                    height: "70%",
                }}
            >
                <CardOverflow
                    variant="solid"
                    sx={{
                        flex: '0 0 200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: 'var(--Card-padding)',
                        backgroundColor: "#233049",
                        width: "50%"
                    }}
                >
                    <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
                        <img src={sideIcon} style={{ width: "80%", margin: "0 auto" }} />
                    </Typography>
                    <Typography textColor="primary.200">
                        Sabor e conforto a cada acesso  <br /> Bem-vindo de volta!
                    </Typography>
                </CardOverflow>
                <CardContent
                    sx={{ gap: 1.5, minWidth: 200 }}
                >
                    <Stack
                        sx={{ margin: "0 auto" }}
                        direction="row"
                        justifyContent="center"
                    >
                        <Avatar>
                            <LockOutlinedIcon />
                        </Avatar>

                    </Stack>

                    <CardContent>
                        <Typography level="title-lg">Login</Typography>

                    </CardContent>
                    <Button
                        variant="outlined"
                        color='neutral'
                        sx={{
                            '--variant-borderWidth': '2px',
                            borderRadius: 40,
                            borderColor: 'primary.500',
                            mx: 'auto',
                            width:180,
                            backgroundColor:colorConfigs.mycolor
                        }}
                    >
                        login
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginPage
