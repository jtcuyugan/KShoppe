import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";
import { ItemList } from "./components/ItemList";
import { Stock } from "./components/Stock";
import { ProductTable } from "./components/ProductTable"; // Import ProductTable

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/product-table',
    element: <ProductTable /> // Add ProductTable route
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/shop-items',
    element: <ItemList />
  },
  {
    path: '/stock',
    element: <Stock />
  },
];

export default AppRoutes;
