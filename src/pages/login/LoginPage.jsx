import React, { useState, useContext, useEffect } from "react";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, Stack, TextField, FormControl, Grid, Divider } from '@mui/material';
import sideIcon from "../../assets/img/other/png/sideicon.png";
import colorConfigs from '../../configs/ColorConfig';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { toast } from "react-toastify";
import * as Yup from "yup";
import logo from "../../assets/img/other/png/logotipo.png"
import { colors } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { loginRules } from "../../services/SchemaService";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
    const {
        reset,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(loginRules),
    });

    const { login, user } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await login(data.username, data.password);
            reset();


            if (response.status === 200) {
                console.log("Deu 200")
            }

        } catch (error) {
            toast.error(error.response?.data.message || 'Erro ao cadastrar autor');
        }
    };
    return (
        <Box
            sx={{
                margin: -1,
                padding: 0,
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
                    width: "600px",
                    resize: 'horizontal',
                    height: "70% auto",
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
                    <Typography textColor="#fff">
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
                        <Divider />
                        <Card sx={{height:"auto"}}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl>
                                    <Grid container sx={{ marginTop: 4 }}>
                                        <Grid item sm={12} sx={{ marginBottom: 3 }}>
                                            <TextField
                                                fullWidth
                                                label="Usuario"
                                                {...register("username")}
                                                error={!!errors.username}
                                                helperText={errors.username?.message}
                                            />

                                        </Grid>
                                        <Grid item sm={12} sx={{ marginBottom: 3 }}>
                                            <TextField
                                                fullWidth
                                                label="Senha"
                                                {...register("password")}
                                                error={!!errors.password}
                                                helperText={errors.password?.message}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        variant="outlined"
                                        color='neutral'
                                        type='submit'
                                        sx={{
                                            '--variant-borderWidth': '1px',
                                            borderRadius: 40,

                                            mx: 'auto',
                                            width: 180,
                                            backgroundColor: colorConfigs.mycolor,
                                            fontSize: 16,
                                            color: "#fff",
                                            transition: 'background-color 0.3s ease-in-out', // Adicionando transição suave
                                            '&:hover': {
                                                backgroundColor: colorConfigs.sidebar.bg,
                                                // Defina a cor desejada para o hover
                                            }
                                        }}
                                    >
                                        Entrar
                                    </Button>
                                </FormControl>
                            </form>
                        </Card>
                    </CardContent>

                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginPage
