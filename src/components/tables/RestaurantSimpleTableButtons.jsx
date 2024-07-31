import React from 'react';
import Table from '@mui/joy/Table';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const RestaurantSimpleTableButtons = ({ headers, rows, onRemove, onIncrement }) => {
  return (
    <Table hoverRow>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={header.style}>{header.label}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex}>{row[header.key]}</td>
            ))}
            <td>
              <IconButton onClick={() => onIncrement(row.id)} color="success">
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => onRemove(row.id)} color="danger">
                <DeleteIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RestaurantSimpleTableButtons;
