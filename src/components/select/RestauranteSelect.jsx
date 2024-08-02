import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const RestauranteSelect = ({ label, options, onChange, value }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      
      <FormControl sx={{ m: 1, minWidth: 120, width:210 }}>
        <InputLabel id="restaurante-select-label">{label}</InputLabel>
        <Select
          labelId="restaurante-select-label"
          id="restaurante-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default RestauranteSelect;
