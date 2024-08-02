import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';



const RestaurantBarGraph = ({ data, xAxisKey, yAxisLabel, seriesLabel }) => {
  const [tickPlacement, setTickPlacement] = React.useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');

  const valueFormatter = (value) => `${value} vendas`;

  const chartSetting = {
    yAxis: [
      {
        label: yAxisLabel,
      },
    ],
    series: [{ dataKey: xAxisKey, label: seriesLabel, valueFormatter }],
    height: 190,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };

  return (
    <div style={{ width: '100%' }}>
      
      <BarChart
        dataset={data}
        xAxis={[
          { scaleType: 'band', dataKey: 'time', tickPlacement, tickLabelPlacement },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

RestaurantBarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xAxisKey: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
  seriesLabel: PropTypes.string.isRequired,
};

export default RestaurantBarGraph;
