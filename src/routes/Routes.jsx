import React from 'react';
import {
  DashboardOutlined,
  TimelineOutlined,
  RestaurantMenuOutlined,
  DinnerDiningOutlined,
  RuleRounded,
  Settings,
  WalletOutlined,
  AddOutlined,
  ListRounded
  
} from '@mui/icons-material';
import colorConfigs from '../configs/ColorConfig';

const SideRoute = (role) => {
  const iconStyle = { color: colorConfigs.mycolor }; 

  const sideItems = [
    {
      id: 1,
      label: "Dashboard",
      link: "/admin/dashboard",
      roles: ["ADMIN"],
      icon: <DashboardOutlined sx={iconStyle} />
    },
    {
      id: 2,
      label: "Reservas",
      roles: ["ADMIN", "EMPLOYEE"],
      icon: <TimelineOutlined sx={iconStyle} />,
      items: [
        {
          id: 2.1,
          label: "Registar",
          link: "/admin/adicionarReserva",
          roles: ["ADMIN", "EMPLOYEE"],
          icon: <RestaurantMenuOutlined sx={iconStyle} />
        },
        {
          id: 2.2,
          label: "Consultar",
          link: "/admin/reservas",
          roles: ["ADMIN", "EMPLOYEE"],
          icon: <ListRounded sx={iconStyle} />
        },
      ],
    },
    {
      id: 3,
      label: "Pedidos",
      roles: ["ADMIN", "EMPLOYEE"],
      icon: <RuleRounded sx={iconStyle} />,
      link: "/admin/pedidos",
    },
    {
      id: 4,
      label: "Pratos",
      roles: ["ADMIN", "EMPLOYEE"],
      icon: <DinnerDiningOutlined sx={iconStyle} />,
      link: "/admin/pratos",
    },
    {
      id: 5,
      label: "Conta",
      link: "/admin/conta",
      roles: ["ADMIN", "EMPLOYEE"],
      icon: <Settings sx={iconStyle} />
    },
    {
      id: 6,
      label: "Carteira",
      link: "/admin/carteira",
      roles: ["ADMIN"],
      icon: <WalletOutlined sx={iconStyle} />
    },
  ];
  const userMenu = sideItems.filter((m) => m.roles.includes(role));
  return userMenu;
};

export default SideRoute;
