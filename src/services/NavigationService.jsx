
// This should come from the database

const menu = (role) => {
    const menuItems = [
      {
        id: 1,
        label: "Dashboard",
        icon: "UserMultiple16",
        roles: ["ROLE_ADMIN"],
        items: [
          {
            id: 1.1,
            label: "Análise",
            link: "/admin/analise",
            roles: ["ROLE_ADMIN"],
          },
          {
            id: 1.2,
            label: "Gráfico",
            link: "/admin/grafico",
            roles: ["ROLE_ADMIN"],
          },
        ],
      },
      {
        id: 2,
        label: "Reservas",
        icon: "UserMultiple16",
        roles: ["ROLE_ADMIN", "ROLE_SECRETARY"],
        items: [
          {
            id: 2.1,
            label: "Registar",
            link: "/admin/regista-reserva",
            roles: ["ROLE_ADMIN", "ROLE_SECRETARY"],
          },
          {
            id: 2.2,
            label: "Consultar",
            link: "/admin/consultar-reserva",
            roles: ["ROLE_ADMIN", "ROLE_SECRETARY"],
          },
        ],
      },
      {
        id: 3,
        label: "Pedidos",
        icon: "UserMultiple16",
        roles: ["ROLE_ADMIN", "ROLE_SECRETARY"],
        items: [
          {
            id: 3.1,
            label: "Registar Pedido",
            link: "/admin/regista-reserva",
            roles: ["ROLE_ADMIN", "ROLE_SECRETARY"],
          },
          {
            id: 3.2,
            label: "Consultar Pedidos",
            link: "/admin/consultar-reserva",
            roles: ["ROLE_ADMIN", "ROLE_SECRETARY"],
          },
        ],
      },
      {
        id: 4,
        label: "Inicio",
        icon: "UserMultiple16",
        roles: ["ROLE_ADMIN"],
      }
      
    ];
  
    const userMenu = menuItems.filter((m) => m.roles.includes(role));
    userMenu.forEach((menu) => {
      menu.items = menu.items.filter((mi) => mi.roles.includes(role));
    });
  
    return userMenu;
  };
  
  export default menu;
  