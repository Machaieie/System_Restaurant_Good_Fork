import React from 'react';
import Table from '@mui/joy/Table';

const SimpleTable = ({ headers, rows }) => {
  return (
    <Table hoverRow>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={header.style}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex}>{row[header.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SimpleTable;
