import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import PropTypes from 'prop-types';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const RestaurantTable = ({ rows, headCells }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(headCells[0].id);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const selectedItems = rows.filter(row => selected.includes(row.id));

    return (
        <Box>
            <Sheet
                variant="outlined"
                sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
            >
                <EnhancedTableToolbar numSelected={selected.length} headCells={headCells} selectedItems={selectedItems}  />
                <Table
                    aria-labelledby="tableTitle"
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'transparent',
                        '--TableCell-selectedBackground': (theme) =>
                            theme.vars.palette.success.softBg,
                        '& thead th:nth-child(1)': {
                            width: '40px',
                        },
                        '& thead th:nth-child(2)': {
                            width: '30%',
                        },
                        '& tr > *:nth-child(n+3)': { textAlign: 'right' },
                    }}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                    />
                    <tbody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <tr
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        <td padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </td>
                                        {headCells.map((headCell) => (
                                            <td key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                                                {row[headCell.id]}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        {emptyRows > 0 && (
                            <tr style={{ height: (33) * emptyRows }}>
                                <td colSpan={6} />
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                    <FormControl orientation="horizontal" size="sm">
                        <FormLabel>Rows per page:</FormLabel>
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                        >
                            {[5, 10, 25].map((rowsPerPageOption) => (
                                <Option key={rowsPerPageOption} value={rowsPerPageOption}>
                                    {rowsPerPageOption}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                        {`Page ${page + 1} of ${Math.ceil(rows.length / rowsPerPage)}`}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            size="sm"
                            color="neutral"
                            variant="outlined"
                            onClick={() => handleChangePage(null, page - 1)}
                            disabled={page === 0}
                            sx={{ bgcolor: 'background.surface' }}
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <IconButton
                            size="sm"
                            color="neutral"
                            variant="outlined"
                            onClick={() => handleChangePage(null, page + 1)}
                            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                            sx={{ bgcolor: 'background.surface' }}
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Sheet>
        </Box>
    );
};

RestaurantTable.propTypes = {
    rows: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired,
};

export default RestaurantTable;
