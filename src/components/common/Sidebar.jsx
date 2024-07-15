import React, { useContext, useState } from 'react';
import {
    Collapse,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    styled,
    Toolbar,
    Box,
} from '@mui/material';
import { ExpandLess, ExpandMore, LogoutOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import colorConfigs from '../../configs/ColorConfig';
import SizeConfigs from '../../configs/SizeConfig';
import logo from '../../assets/img/other/png/logo-no-background.png';
import { AuthContext } from '../../contexts/AuthContext';
import SideRoute from '../../routes/Routes';

const NestedListItem = styled(ListItemButton)({
    paddingLeft: (theme) => theme.spacing(4),
});

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const role = user?.role || 'GUEST';
    const userMenu = SideRoute(role);
    const [open, setOpen] = useState({});

    const handleClick = (id) => {
        setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: SizeConfigs.sidebar.width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: `${SizeConfigs.sidebar.width}`,
                    boxSizing: 'border-box',
                    borderRight: '0px',
                    backgroundColor: colorConfigs.sidebar.bg,
                    color: colorConfigs.sidebar.color,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                },
            }}
        >
            <List disablePadding>
                <Toolbar sx={{ marginBottom: '20px' }}>
                    <Stack
                        sx={{
                            height: '90px',
                            marginTop: '8px',
                            marginBottom: '8px',
                            width: '250px',
                        }}
                        direction='row'
                        justifyContent='center'
                    >
                        <img src={logo} alt='' />
                    </Stack>
                </Toolbar>
                <Divider />

                {userMenu.map((item) => (
                    <React.Fragment key={item.id}>
                        <ListItemButton onClick={() => item.items && handleClick(item.id)} component={item.link ? Link : 'div'} to={item.link || '#'}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                            {item.items ? (
                                open[item.id] ? <ExpandLess /> : <ExpandMore />
                            ) : null}
                        </ListItemButton>
                        {item.items && (
                            <Collapse in={open[item.id]} timeout='auto' unmountOnExit>
                                <List component='div' disablePadding>
                                    {item.items.map((subItem) => (
                                        <NestedListItem key={subItem.id} button component={Link} to={subItem.link}>
                                            <ListItemIcon >{subItem.icon}</ListItemIcon>
                                            <ListItemText primary={subItem.label} />
                                        </NestedListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <Box>
                <NestedListItem button component={Link} to='/'>
                    <ListItemIcon>
                        <LogoutOutlined sx={{ color: '#fff' }} />
                    </ListItemIcon>
                    <ListItemText primary='Sair' />
                </NestedListItem>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
