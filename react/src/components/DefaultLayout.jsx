import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {
        penjualan,
        komisi,
        pembayaran,
        notification,
        setPenjualan,
        setKomisi,
        setPembayaran,
    } = useStateContext();

    useEffect(() => {
        axiosClient.get("/penjualan").then(({ data }) => {
            setPembayaran(data);
        });
    }, []);

    useEffect(() => {
        axiosClient.get("/komisi").then(({ data }) => {
            setPembayaran(data);
        });
    }, []);

    useEffect(() => {
        axiosClient.get("/pembayaran").then(({ data }) => {
            setPembayaran(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/penjualan">Penjualan</Link>
                <Link to="/komisi">Komisi</Link>
                <Link to="/pembayaran">Pembayaran</Link>
            </aside>
            <div className="content">
                <header>
                    <div>React</div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
