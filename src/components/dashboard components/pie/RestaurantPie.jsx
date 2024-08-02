import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';

const defaultData = [
  { label: 'Item 1', value: 100 },
  { label: 'Item 2', value: 200 },
  { label: 'Item 3', value: 300 },
];

const RestaurantPie = ({ data = defaultData }) => {
  const [radius, setRadius] = React.useState(50);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  
  return (
    <Box sx={{ width: '35%',height:'30%' }}>
      <PieChart
        height={300}
        series={[
          {
            data: data.slice(0, 3), 
            outerRadius: radius,
            arcLabel: (params) => params.label ?? '',
          },
        ]}
        skipAnimation={skipAnimation}
      />
      
      
    </Box>
  );
};

export default RestaurantPie;
