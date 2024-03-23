import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Penjualan() {
    const [penjualan, setPenjualan] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getPenjualan();
    }, []);

    const getPenjualan = () => {
        setLoading(true);
        axiosClient
            .get("/penjualan")
            .then(({ data }) => {
                setLoading(false);
                setPenjualan(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                }}
            >
                <h1>Penjualan</h1>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction Number</th>
                            <th>Marketing</th>
                            <th>Date</th>
                            <th>Cargo Fee</th>
                            <th>Total Balance</th>
                            <th>Grand Total</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {penjualan.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.transaction_number}</td>
                                    <td>{p.marketing_name}</td>
                                    <td>{p.date}</td>
                                    <td style={{ textAlign: "right" }}>
                                        Rp
                                        {parseFloat(p.cargo_fee).toLocaleString(
                                            "id-ID",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        Rp
                                        {parseFloat(
                                            p.total_balance
                                        ).toLocaleString("id-ID", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        Rp
                                        {parseFloat(
                                            p.grand_total
                                        ).toLocaleString("id-ID", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
