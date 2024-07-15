import React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

const RestaurantModal = ({ 
    open, 
    setOpen, 
    title, 
    description, 
    items, 
    headCells,
    onConfirm, 
    onCancel 
}) => {
    return (
        <Modal open={open} onClose={onCancel}>
            <ModalDialog
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
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
                <Typography id="modal-title" level="h2">
                    {title}
                </Typography>
                <Typography id="modal-description" textColor="text.tertiary">
                    {description}
                </Typography>
                <Table aria-label="selected items table">
                    <thead>
                        <tr>
                            {headCells.map((headCell) => (
                                <th key={headCell.id}>{headCell.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                {headCells.map((headCell) => (
                                    <td key={headCell.id}>{item[headCell.id]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row-reverse' },
                    }}
                >
                    <Button variant="solid" color="primary" onClick={onConfirm}>
                        Sim
                    </Button>
                    <Button variant="outlined" color="neutral" onClick={onCancel}>
                        Não
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default RestaurantModal;
