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
  const iconStyle = { color: colorConfigs.mycolor }; // Define a cor desejada aqui

  const sideItems = [
    {
      id: 1,
      label: "Dashboard",
      link: "/dashboard",
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
      items: [
        {
          id: 3.1,
          label: "Registar",
          link: "/admin/adicionarPedido",
          roles: ["ADMIN", "EMPLOYEE"],
          icon: <AddOutlined sx={iconStyle} />
        },
        {
          id: 3.2,
          label: "Consultar",
          link: "/admin/pedidos",
          roles: ["ADMIN", "EMPLOYEE"],
          icon: <ListRounded sx={iconStyle} />
        },
      ],
    },
    {
      id: 4,
      label: "Pratos",
      roles: ["ADMIN", "EMPLOYEE"],
      icon: <DinnerDiningOutlined sx={iconStyle} />,
      items: [
        {
          id: 4.1,
          label: "Adicionar",
          link: "/admin/adicionarPrato",
          roles: ["ADMIN", "EMPLOYEE"],
          icon: <DinnerDiningOutlined sx={iconStyle} />
        },
        {
          id: 4.2,
          label: "Consultar",
          link: "/admin/pedidos",
          roles: ["ADMIN", "EMPLOYEE"],
          icon: <ListRounded sx={iconStyle} />
        },
      ],
    },
    {
      id: 5,
      label: "Conta",
      link: "/conta",
      roles: ["ADMIN"],
      icon: <Settings sx={iconStyle} />
    },
    {
      id: 6,
      label: "Carteira",
      link: "/carteira",
      roles: ["ADMIN", "EMPLOYEE"],
      icon: <WalletOutlined sx={iconStyle} />
    },
  ];
  const userMenu = sideItems.filter((m) => m.roles.includes(role));
  return userMenu;
};

export default SideRoute;
