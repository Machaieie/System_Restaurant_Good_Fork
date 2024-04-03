import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';

const menu = (role) => {
    const menuItems = [
      {
        id: 1,
        label: "Dashboard",
        icon: <DashboardIcon />,
        roles: ["ADMIN"],
        items: [
          {
            id: 1.1,
            label: "Análise",
            link: "/admin/analise",
            roles: ["ADMIN"],
          },
          {
            id: 1.2,
            label: "Gráfico",
            link: "/admin/grafico",
            roles: ["ADMIN"],
          },
        ],
      },
      {
        id: 2,
        label: "Reservas",
        icon: <EventNoteIcon />,
        roles: ["ADMIN", "EMPLOYEE"],
        items: [
          {
            id: 2.1,
            label: "Registar",
            link: "/admin/regista-reserva",
            roles: ["ADMIN", "EMPLOYEE"],
          },
          {
            id: 2.2,
            label: "Consultar",
            link: "/admin/consultar-reserva",
            roles: ["ADMIN", "EMPLOYEE"],
          },
        ],
      },
      {
        id: 3,
        label: "Pedidos",
        icon: <ShoppingBasketIcon />,
        roles: ["ADMIN", "EMPLOYEE"],
        items: [
          {
            id: 3.1,
            label: "Registar Pedido",
            link: "/admin/regista-reserva",
            roles: ["ADMIN", "EMPLOYEE"],
          },
          {
            id: 3.2,
            label: "Consultar Pedidos",
            link: "/admin/consultar-reserva",
            roles: ["ADMIN", "EMPLOYEE"],
          },
        ],
      },
      {
        id: 4,
        label: "Inicio",
        icon: <HomeIcon />,
        roles: ["ADMIN"],
      }
    ];
  
    const userMenu = menuItems.filter((m) => m.roles.includes(role));
    userMenu.forEach((menu) => {
      menu.items = menu.items.filter((mi) => mi.roles.includes(role));
    });
  
    return userMenu;
  };
  
  export default menu;
