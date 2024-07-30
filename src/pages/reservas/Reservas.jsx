import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/joy';
import { KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import RestaurantTable from '../../components/tables/RestaurantTable';
import http from '../../http-common';
import { toast, ToastContainer } from 'react-toastify';

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
            } else if(response.status==204){
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
            <Button
                endDecorator={<KeyboardArrowRight />}
                sx={{
                    marginBottom: 5,
                    bgcolor: 'success.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'success.dark' },
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
