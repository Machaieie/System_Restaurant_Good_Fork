import React from 'react'
import { Box, Divider, Typography, Grid, Button } from "@mui/joy";
import RestaurantCard from "../../components/cards/RestaurantCard";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import SimpleTable from '../../components/tables/SimpleTable';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import colorConfigs from '../../configs/ColorConfig'

const Pedidos = () => {
  const headers = [
    { label: 'Dessert (40%)', key: 'name', style: { width: '40%' } },
    { label: 'Calories', key: 'calories' },
    { label: 'Fat (g)', key: 'fat' },
    { label: 'Carbs (g)', key: 'carbs' },
    { label: 'Protein (g)', key: 'protein' },
  ];

  const rows = [
    { id: 1, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  ];
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
      <Box sx={{margin:2}}>
        <Button endDecorator={<KeyboardArrowRight />} sx={{ backgroundColor: colorConfigs.sidebar.bg }}>
          Adicionar Pedido
        </Button>
      </Box>
      <Divider sx={{ marginTop: 2 }} />

      <SimpleTable headers={headers} rows={rows} />
    </Box>
  )
}

export default Pedidos
