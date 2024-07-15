import React from 'react';
import { Box } from "@mui/joy";
import RestaurantTable from '../../components/tables/RestaurantTable';
import http from "../../http-common";
import { toast, ToastContainer } from "react-toastify";
import CustomTable from '../../components/tables/CustomTable';

// Definição de headCells
const headCells = [
  { id: 'client', numeric: false, label: 'Cliente' },
  { id: 'date', numeric: false, label: 'Data' },
  { id: 'time', numeric: true, label: 'Hora' },
  { id: 'numberPeople', numeric: true, label: 'Numero de Pessoas' },
  { id: 'phone', numeric: true, label: 'Telefone' },
];

const Reservas = () => {
  const [reservations, setReservations] = React.useState([]);

  const getReservations = async () => {
    try {
      const response = await http.get("reservas/pegarTodos");
      if (response.status === 200 && Array.isArray(response.data)) {
        const transformedData = response.data.map(reservation => ({
          id: reservation.id,  
          client: `${reservation.firstName} ${reservation.lastName}`,
          date: reservation.date,
          time: reservation.time,
          numberPeople: reservation.numberPeople,
          phone: reservation.phone,
          email: reservation.email
        }));
        setReservations(transformedData);
        console.log("reservas =>", transformedData);
      } else {
        setReservations([]);
        toast.error("Falha ao buscar reservas");
      }
    } catch (error) {
      setReservations([]);
      toast.error("Falha ao buscar reservas");
    }
  };

  React.useEffect(() => {
    getReservations();
  }, []);

  return (
    <Box>
      <RestaurantTable rows={reservations} headCells={headCells} />
      {/* <CustomTable rows={reservations} headCells={headCells} /> */}
      <ToastContainer />
    </Box>
  );
}

export default Reservas;
