import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, Grid, Button, Modal, ModalDialog } from "@mui/joy";
import RestaurantCard from "../../components/cards/RestaurantCard";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import SimpleTable from '../../components/tables/SimpleTable';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import colorConfigs from '../../configs/ColorConfig';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import http from '../../http-common';
import RestaurantSimpleTableButtons from '../../components/tables/RestaurantSimpleTableButtons';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.nomeItem,
});
const filterOptions2 = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.firstName,
});

const Pedidos = () => {
  const [open, setOpen] = useState(false);
  const [prato, setPrato] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [listaItemsPedidos, setListaItemsPedidos] = useState([]);
  const [listaPedidos, setListaPedidos] = useState([]);

  const fetchData = async () => {
    const pratos = await http.get('/pratos/todos');
    const clientes = await http.get('/reservas/pegarTodos');
    setPrato(pratos.data);
    setCliente(clientes.data);
  };

  const headers1 = [
    { label: 'Dessert (40%)', key: 'name', style: { width: '40%' } },
    { label: 'Calories', key: 'calories' },
    { label: 'Fat (g)', key: 'fat' },
    { label: 'Carbs (g)', key: 'carbs' },
    { label: 'Protein (g)', key: 'protein' },
  ];

  const headers = [
    { label: 'Nome', key: 'nomeItem' },
    { key: 'precoUnitario', label: 'Preço' },
    { key: 'tipo_Prato', label: 'Tipo de Prato' },
    { key: 'quantidade', label: 'Quantidade' },
  ];

  const handleChangePlate = (event, value) => {
    if (value) {
      const existingPlateIndex = listaItemsPedidos.findIndex(item => item.id === value.id);
      if (existingPlateIndex !== -1) {
        const updatedItems = [...listaItemsPedidos];
        updatedItems[existingPlateIndex].quantidade += 1;
        setListaItemsPedidos(updatedItems);
      } else {
        const newPlate = {
          id: value.id,
          nomeItem: value.nomeItem,
          precoUnitario: value.precoUnitario,
          tipo_Prato: value.tipo_Prato,
          quantidade: 1,
        };
        const newListaItemsPedidos = [...listaItemsPedidos, newPlate];
        setListaItemsPedidos(newListaItemsPedidos);
      }
    }
  };

  const handleIncrement = (id) => {
    const updatedItems = listaItemsPedidos.map(item => 
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    );
    setListaItemsPedidos(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = listaItemsPedidos.filter(item => item.id !== id);
    setListaItemsPedidos(updatedItems);
  };

  const handleClienteChange = (event, value) => { };

  const handleClearTable = () => {
    setListaItemsPedidos([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
          <RestaurantCard title="Pedidos Feitos" icon={RestaurantIcon} content={20} circularValue={50} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <RestaurantCard title="Pedidos Pendentes" icon={RamenDiningIcon} content={20} circularValue={50} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <RestaurantCard title="Pedidos Cancelados" icon={NoMealsIcon} content={20} circularValue={50} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <RestaurantCard title="Pedidos Atendidos" icon={RestaurantMenuIcon} content={20} circularValue={50} />
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 2 }} />
      <Box sx={{ margin: 2 }}>
        <Button endDecorator={<KeyboardArrowRight />} sx={{ backgroundColor: colorConfigs.sidebar.bg }} onClick={() => setOpen(true)}>
          Adicionar Pedido
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="nested-modal-title"
            aria-describedby="nested-modal-description"
            sx={(theme) => ({
              [theme.breakpoints.only('xs')]: {
                top: 'unset',
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                transform: 'none',
                maxWidth: 'unset',
              },
            })}
          >
            <Typography id="nested-modal-title" level="h2">
              Adicionar Pedido
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl id="filter-demo">
                  <FormLabel>Adicionar Prato</FormLabel>
                  <Autocomplete
                    placeholder="Procure o prato aqui"
                    options={prato}
                    getOptionLabel={(option) => option.nomeItem}
                    filterOptions={filterOptions}
                    sx={{ width: 300 }}
                    onChange={handleChangePlate}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl id="filter-demo">
                  <FormLabel>Cliente</FormLabel>
                  <Autocomplete
                    placeholder="Procure o nome do Cliente"
                    options={cliente}
                    getOptionLabel={(option) => option.firstName}
                    filterOptions={filterOptions2}
                    sx={{ width: 300 }}
                    onChange={handleClienteChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <RestaurantSimpleTableButtons headers={headers} rows={listaItemsPedidos} onRemove={handleRemove} onIncrement={handleIncrement} />
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row-reverse' },
              }}
            >
              <Button variant="solid" sx={{ backgroundColor: colorConfigs.sidebar.bg }} onClick={() => setOpen(false)}>
                Adicionar
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Voltar
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={handleClearTable}
              >
                Limpar Tabela
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      </Box>
      <Divider sx={{ marginTop: 2 }} />

      <SimpleTable headers={headers1} rows={listaPedidos} />
    </Box>
  );
};

export default Pedidos;
