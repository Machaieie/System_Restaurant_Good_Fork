import React, { useState } from 'react';
import { Box, Divider, FormControl, Grid,InputLabel, MenuItem, Select } from '@mui/material';
import RestaurantBarGraph from '../../components/dashboard components/bargraph/RestaurantBarGraph';
import RestaurantPie from '../../components/dashboard components/pie/RestaurantPie';
const dailyData = [
  { time: '08:00', sales: 10 },
  { time: '09:00', sales: 20 },
  { time: '10:00', sales: 30 },
  { time: '11:00', sales: 40 },
  { time: '12:00', sales: 50 },
  { time: '13:00', sales: 60 },
  { time: '14:00', sales: 70 },
  { time: '15:00', sales: 80 },
  { time: '16:00', sales: 90 },
  { time: '17:00', sales: 100 },
  { time: '18:00', sales: 110 },
  { time: '19:00', sales: 120 },
  { time: '20:00', sales: 130 },
  { time: '21:00', sales: 140 },
  { time: '22:00', sales: 150 },
];

const weeklyData = [
  { time: 'Monday', sales: 100 },
  { time: 'Tuesday', sales: 200 },
  { time: 'Wednesday', sales: 300 },
  { time: 'Thursday', sales: 400 },
  { time: 'Friday', sales: 500 },
  { time: 'Saturday', sales: 600 },
  { time: 'Sunday', sales: 700 },
];

const monthlyData = [
  { time: '01', sales: 100 },
  { time: '02', sales: 200 },
  { time: '03', sales: 300 },
  { time: '04', sales: 400 },
  { time: '05', sales: 500 },
  { time: '06', sales: 600 },
  { time: '07', sales: 700 },
  { time: '08', sales: 800 },
  { time: '09', sales: 900 },
  { time: '10', sales: 1000 },
  { time: '11', sales: 1100 },
  { time: '12', sales: 1200 },
  { time: '13', sales: 1300 },
  { time: '14', sales: 1400 },
  { time: '15', sales: 1500 },
  { time: '16', sales: 1600 },
  { time: '17', sales: 1700 },
  { time: '18', sales: 1800 },
  { time: '19', sales: 1900 },
  { time: '20', sales: 2000 },
  { time: '21', sales: 2100 },
  { time: '22', sales: 2200 },
  { time: '23', sales: 2300 },
  { time: '24', sales: 2400 },
  { time: '25', sales: 2500 },
  { time: '26', sales: 2600 },
  { time: '27', sales: 2700 },
  { time: '28', sales: 2800 },
  { time: '29', sales: 2900 },
  { time: '30', sales: 3000 },
  { time: '31', sales: 3100 },
];

const yearlyData = [
  { time: 'Jan', sales: 1000 },
  { time: 'Feb', sales: 2000 },
  { time: 'Mar', sales: 3000 },
  { time: 'Apr', sales: 4000 },
  { time: 'May', sales: 5000 },
  { time: 'Jun', sales: 6000 },
  { time: 'Jul', sales: 7000 },
  { time: 'Aug', sales: 8000 },
  { time: 'Sep', sales: 9000 },
  { time: 'Oct', sales: 10000 },
  { time: 'Nov', sales: 11000 },
  { time: 'Dec', sales: 12000 },
];

const someData = [
  { label: 'Food', value: 150 },
  { label: 'Drinks', value: 100 },
  { label: 'Desserts', value: 50 },
];

const Dashboard = () => {
  const [filter, setFilter] = useState('daily');

  const getData = () => {
    switch (filter) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      case 'yearly':
        return yearlyData;
      default:
        return dailyData;
    }
  };

  return (
    <Box>
      <FormControl  sx={{ mb: 2 }}>
        <InputLabel id="filter-label">Vendas</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          
          label="Filtro"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem defaultOpen value="daily">Diário</MenuItem>
          <MenuItem value="weekly">Semanal</MenuItem>
          <MenuItem value="monthly">Mensal</MenuItem>
          <MenuItem value="yearly">Anual</MenuItem>
        </Select>
      </FormControl>
      <RestaurantBarGraph
        data={getData()}
        xAxisKey="sales"
        yAxisLabel="Vendas"
        seriesLabel="Vendas"
      />
      <Divider sx={{ marginTop: 4 }} />
     <Grid></Grid>
      <RestaurantPie data={someData}/>
      <Divider sx={{ marginTop: 4 }} />
    </Box>
  );
};

export default Dashboard;
