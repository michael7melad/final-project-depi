import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Home } from "./Pages/Home";
import { Cart } from "./Pages/Cart";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Error } from "./Pages/Error";
import { Layout } from "./Pages/Layout";
import { Profile } from "./Pages/Profile";
import { Products } from "./Pages/Products";
import { Categories } from "./Pages/Categories";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Wishlist } from "./Pages/Wishlist";
import { AuthInitializer } from "./components/AuthInitializer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CategoryProducts } from "./Pages/CategoryProducts";
import { ProductDetails } from "./Pages/ProductDetails";
import { Checkout } from "./Pages/Checkout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/profile", element: <Profile /> },
        { path: "/products", element: <Products /> },
        { path: "/products/:id", element: <ProductDetails /> },
        { path: "/categories", element: <Categories /> },
        { path: "/categories/:id", element: <CategoryProducts /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <AuthInitializer />
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
};

export default App;
