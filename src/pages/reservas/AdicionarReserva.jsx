import React from 'react';
import { Box, Card } from "@mui/joy"
import ReservaForm from './ReservaForm';

const AdicionarReserva = () => {
  return (
    <Box>
      <Card  sx={{width:"80%",  height:"60%", margin:"0 auto", boxShadow:"0 3 3 0"}}>
        <ReservaForm
        mode={"CREATE"}
        url={"reservas/adicionarReserva"}
        successMessage={"Reserva criada com sucesso"}
        onSuccessNavigateTo={"/admin/reservas"}
        />
      </Card>
    </Box>
  );
};


export default AdicionarReserva;