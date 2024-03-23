import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Pembayaran() {
    const [pembayaran, setPembayaran] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getPembayaran();
    }, []);

    const onDelete = (u) => {
        if (!window.confirm("Anda yakin menghapus pembayaran?")) {
            return;
        }

        axiosClient.delete(`/pembayaran/${u.id}`).then(() => {
            setNotification("Pembayaran berhasil dihapus");
            getPembayaran();
        });
    };

    const getPembayaran = () => {
        setLoading(true);
        axiosClient
            .get("/pembayaran")
            .then(({ data }) => {
                setLoading(false);
                setPembayaran(data.data);
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
                <h1>Pembayaran</h1>
                <Link to="/pembayaran/new" className="btn-add">
                    Buat Pembayaran
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction Number</th>
                            <th>Date</th>
                            <th>Note</th>
                            <th>Value</th>
                            <th>Actions</th>
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
                            {pembayaran.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.transaction_number}</td>
                                    <td>{p.date}</td>
                                    <td>{p.note}</td>
                                    <td style={{ textAlign: "right" }}>
                                        Rp
                                        {parseFloat(p.value).toLocaleString(
                                            "id-ID",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        <Link
                                            className="btn-edit"
                                            to={"/pembayaran/" + p.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(ev) => onDelete(p)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
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
