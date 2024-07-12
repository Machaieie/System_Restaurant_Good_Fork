import React from 'react';
import { Box, Card } from "@mui/joy"
import ReservaForm from './ReservaForm';

const AdicionarReserva = () => {
  return (
    <Box>
      <Card title='Adicionar Reserva'>
        <ReservaForm
        mode={"CREATE"}
        url={"reservas/adicionarReserva"}
        successMessage={"Reserva criada com sucesso"}
        onSuccessNavigateTo={""}
        />
      </Card>
    </Box>
  );
};


export default AdicionarReserva;