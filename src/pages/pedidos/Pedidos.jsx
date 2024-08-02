import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, Grid, Button, Modal, ModalDialog } from "@mui/joy";
import RestaurantCard from "../../components/cards/RestaurantCard";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import colorConfigs from '../../configs/ColorConfig';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import http from '../../http-common';
import RestaurantSimpleTableButtons from '../../components/tables/RestaurantSimpleTableButtons';
import { toast, ToastContainer } from "react-toastify";
import RestauranteSimpleTable from '../../components/tables/RestauranteSimpleTable';
import TextField from '@mui/material/TextField';
import RestauranteSelect from '../../components/select/RestauranteSelect';
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
  const [open2, setOpen2] = useState(false);
  const [prato, setPrato] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [listaItemsPedidos, setListaItemsPedidos] = useState([]);
  const [listaPedidos, setListaPedidos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedReservaId, setSelectedReservaId] = useState(null);
 const [tipoPrato, setTipoPrato] = useState('');
  const [statusPedido, setStatusPedido] = useState('');

  const handleStatusPedidoChange = (value) => {
    setStatusPedido(value);
  };

  const handTipoPratoChange = (value) => {
    setTipoPrato(value);
  };

  const estadoPedido = [
    { value: "PENDENTE", label: "Pendente" },
    { value: "ATENDIDO", label: "Atendido" },
    { value: "CANCELADA", label: "Cancelada" },
  ];
  
  const typePrato = [
    { value: "PRATO_PRINCIPAL", label: "Prato Principal" },
    { value: "SOBREMESA", label: "Sobremesa" },
    { value: "BEBIDA", label: "Bebida" },
    { value: "ENTRADA", label: "Entrada" },
  ];
  

  const fetchData = async () => {
    const pratos = await http.get('/pratos/todos');
    const clientes = await http.get('/reservas/pegarTodos');
    const pedds = await http.get('/pedidos/detalhados');
    setPrato(pratos.data);
    setCliente(clientes.data);
    setListaPedidos(pedds.data);

  };

  const headers1 = [
    { label: 'Cliente', key: 'nomeCliente' },
    { label: 'Prato', key: 'nomePrato' },
    { label: 'Tipo Prato', key: 'tipoPrato' },
    { label: 'Status', key: 'statusPedido' },
    { label: 'Quantidade', key: 'quantidade' },
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

  const handleClienteChange = (event, value) => {
    if (value) {
      setSelectedCliente(value);
      setSelectedReservaId(value.id);
    }
  };

  const handleClearTable = () => {
    setListaItemsPedidos([]);
  };

  const onSubmit = async () => {
    if (!selectedReservaId) {
      toast.warning("Selecione um cliente para adicionar o pedido.");
      return;
    }

    if (listaItemsPedidos.length === 0) {
      toast.warning("Selecione pelo menos um prato para adicionar o pedido.");
      return;
    }

    const pedidoDTO = {
      reserva_id: selectedReservaId,
      statusPedido: "PENDENTE",
      itensPedido: listaItemsPedidos.map(item => ({
        quantidade: item.quantidade,
        pratoId: item.id
      }))
    };

    try {
      await http.post('/pedidos/adicionarPedido', pedidoDTO);
      setOpen(false);
      // Limpar a lista de itens pedidos após a submissão
      setListaItemsPedidos([]);
      toast.success("Pedido adicionado com sucesso");
    } catch (error) {
      toast.error("Erro ao adicionar pedido!");
    }
  };

  const onUpdate = async () => {
    setOpen2(true);
  }

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
              <Button variant="solid" sx={{ backgroundColor: colorConfigs.sidebar.bg }} onClick={onSubmit}>
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

      <RestauranteSimpleTable headers={headers1} rows={listaPedidos} onUpdate={onUpdate} />
      <Modal open={open2} onClose={() => setOpen2(false)}>
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
            Atualizar Estado do Pedido
          </Typography>
          <Box
            component="form"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField id="outlined-basic" label="Cliente" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField id="outlined-basic" label="Prato" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <RestauranteSelect onChange={handTipoPratoChange} label="Tipo de Prato" options={typePrato} value={tipoPrato}/>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <RestauranteSelect onChange={handleStatusPedidoChange} label="Estado do Pedido" options={estadoPedido} value={statusPedido}/>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField id="outlined-basic" label="Quantidade" variant="outlined" />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={() => setOpen2(false)}>
              Continue
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen2(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Pedidos;
