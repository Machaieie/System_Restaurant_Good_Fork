import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import PropTypes from 'prop-types';
import RestaurantModal from '../modal/RestaurantModal';
import http from "../../http-common";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const EnhancedTableToolbar = ({ numSelected, selectedItems, headCells }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleConfirm = async () => {
        try {
            const selectedIds = selectedItems.map((item) => item.id);

            await http.delete(`/reservas/reserva/${selectedIds.join(',')}`);
            setOpen(false);
            navigate('/admin/reservas');
            toast.success('Itens deletados com sucesso');
           

        } catch (error) {
            toast.error(`Erro ao deletar itens: ${error}`);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: 'background.level1',
                    }),
                    borderTopLeftRadius: 'var(--unstable_actionRadius)',
                    borderTopRightRadius: 'var(--unstable_actionRadius)',
                    margin: 2,
                }}
            >
                {numSelected > 0 ? (
                    <Typography sx={{ flex: '1 1 100%' }} component="div">
                        {numSelected} selecionado(s)
                    </Typography>
                ) : (
                    <Typography
                        level="body-lg"
                        sx={{ flex: '1 1 100%' }}
                        id="tableTitle"
                        component="div"
                    >
                        Reservas
                    </Typography>
                )}

                {numSelected === 1 && (
                    <Tooltip title="Edit">
                        <IconButton size="sm" color="primary" variant="solid">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton
                            size="sm"
                            color="danger"
                            variant="solid"
                            onClick={() => setOpen(true)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton size="sm" variant="outlined" color="neutral">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <Box sx={{ ml: 1 }} />
            </Box>
            <RestaurantModal
                open={open}
                setOpen={setOpen}
                title="Tem certeza absoluta?"
                description="Esta ação não pode ser desfeita. Isso excluirá permanentemente seu(s) item(ns)."
                items={selectedItems}
                headCells={headCells}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <ToastContainer />
        </>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedItems: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired,
    onDeleteSuccess: PropTypes.func,
};
export default EnhancedTableToolbar;
