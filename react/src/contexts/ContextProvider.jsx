import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    penjualan: null,
    komisi: null,
    pembayaran: null,
    notification: null,
    setPenjualan: () => {},
    setKomisi: () => {},
    setPembayaran: () => {},
    setNotification: () => {},
});

export const ContextPorvider = ({ children }) => {
    const [penjualan, setPenjualan] = useState({});
    const [komisi, setKomisi] = useState({});
    const [pembayaran, setPembayaran] = useState({});
    const [notification, _setNotification] = useState("");

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                penjualan,
                komisi,
                pembayaran,
                setPenjualan,
                setKomisi,
                setPembayaran,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
