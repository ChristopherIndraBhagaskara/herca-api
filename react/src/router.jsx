import { Navigate, createBrowserRouter } from "react-router-dom";
import Penjualan from "./views/Penjualan";
import Komisi from "./views/Komisi";
import Pembayaran from "./views/Pembayaran";
import PembayaranForm from "./views/PembayaranForm";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/" />,
            },
            {
                path: "/penjualan",
                element: <Penjualan />,
            },
            {
                path: "/komisi",
                element: <Komisi />,
            },
            {
                path: "/pembayaran",
                element: <Pembayaran />,
            },
            {
                path: "/pembayaran/new",
                element: <PembayaranForm key="pembayaranCreate" />,
            },
            {
                path: "/pembayaran/:id",
                element: <PembayaranForm key="pembayaranUpdate" />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
