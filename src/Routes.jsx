import Product from "./pages/Product";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryPage from "./pages/CategoryPage";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import WishlistPage from "./pages/WishlistPage";
import ProductPage from "./pages/ProductPage";


const routers = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/addProducts",
        element: <AddProduct />,
      },
      {
              path: "/wishlist",
              element: <WishlistPage />,
         },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
              path: "/orders",
              element: <OrderTrackingPage />,  
            },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
];

export default routers;
