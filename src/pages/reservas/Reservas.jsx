import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Grid } from '@mui/joy';
import { KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import RestaurantTable from '../../components/tables/RestaurantTable';
import http from '../../http-common';
import { toast, ToastContainer } from 'react-toastify';
import RestaurantCard from '../../components/cards/RestaurantCard';

// Definição de headCells
const headCells = [
    { id: 'client', numeric: false, label: 'Cliente' },
    { id: 'date', numeric: false, label: 'Data' },
    { id: 'time', numeric: true, label: 'Hora' },
    { id: 'numberPeople', numeric: true, label: 'Número de Pessoas' },
    { id: 'phone', numeric: true, label: 'Telefone' },
];

const Reservas = () => {
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    const getReservations = async () => {
        try {
            const response = await http.get('reservas/pegarTodos');
            if (response.status === 200 && Array.isArray(response.data)) {
                const transformedData = response.data.map((reservation) => ({
                    id: reservation.id,
                    client: `${reservation.firstName} ${reservation.lastName}`,
                    date: reservation.date,
                    time: reservation.time,
                    numberPeople: reservation.numberPeople,
                    phone: reservation.phone,
                    email: reservation.email,
                }));

                setReservations(transformedData);
            } else if (response.status == 204) {
                setReservations([]);
            }
        } catch (error) {
            setReservations([]);
            toast.error('Falha ao buscar reservas');
        }
    };

    useEffect(() => {
        getReservations();
    }, []);

    const handleAddReservation = () => {
        navigate('/admin/adicionarReserva');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={3}>
                    <RestaurantCard title="Reservas Efectuadas" content={20} circularValue={20} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <RestaurantCard title="Reservas Pendentes" content={5} circularValue={5} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <RestaurantCard title="Reservas Canceladas" content={0} circularValue={0} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <RestaurantCard title="Reservas Concluidas" content={15} circularValue={15} />
                </Grid>
            </Grid>
            <Divider sx={{marginTop:2}}/>
            <Button
                endDecorator={<KeyboardArrowRight />}
                sx={{
                    marginBottom: 5,
                    bgcolor: 'success.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'success.dark' },
                    marginTop:3
                }}
                onClick={handleAddReservation}
            >
                Adicionar Reserva
            </Button>
            <RestaurantTable
                rows={reservations}
                headCells={headCells}
                setRows={setReservations}
            />
            <ToastContainer />
        </Box>
    );
};

export default Reservas;
