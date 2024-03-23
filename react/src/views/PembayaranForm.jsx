import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function PembayaranForm() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [pembayaran, setPembayaran] = useState({
        id: null,
        penjualan_id: "",
        date: "",
        note: "",
        value: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/pembayaran/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setPembayaran(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (pembayaran.id) {
            axiosClient
                .put(`/pembayaran/${pembayaran.id}`, pembayaran)
                .then(() => {
                    setNotification("Pembayaran berhasil di-update");
                    navigate("/pembayaran");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/pembayaran`, pembayaran)
                .then(() => {
                    setNotification("Pembayaran berhasil dibuat");
                    navigate("/pembayaran");
                })
                .catch((err) => {
                    setErrors(err.response.data.message);
                });
        }
    };

    return (
        <>
            {pembayaran.id && (
                <h1>Update Pembayaran: {pembayaran.transaction_number}</h1>
            )}
            {!pembayaran.id && <h1>Buat Pembayaran</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        <p>{errors}</p>
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <select
                            onChange={(ev) =>
                                setPembayaran({
                                    ...pembayaran,
                                    penjualan_id: ev.target.value,
                                })
                            }
                        >
                            <option value="1">TRX001</option>
                            <option value="2">TRX002</option>
                            <option value="3">TRX003</option>
                            <option value="4">TRX004</option>
                            <option value="5">TRX005</option>
                            <option value="6">TRX006</option>
                            <option value="7">TRX007</option>
                            <option value="8">TRX008</option>
                            <option value="8">TRX008</option>
                            <option value="10">TRX0010</option>
                            <option value="11">TRX0011</option>
                            <option value="12">TRX0012</option>
                        </select>
                        <input
                            value={pembayaran.date}
                            type="date"
                            placeholder="Date"
                            onChange={(ev) =>
                                setPembayaran({
                                    ...pembayaran,
                                    date: ev.target.value,
                                })
                            }
                        />
                        <input
                            value={pembayaran.note}
                            type="text"
                            placeholder="Note"
                            onChange={(ev) =>
                                setPembayaran({
                                    ...pembayaran,
                                    note: ev.target.value,
                                })
                            }
                        />
                        <input
                            value={pembayaran.value}
                            type="number"
                            placeholder="Value"
                            onChange={(ev) =>
                                setPembayaran({
                                    ...pembayaran,
                                    value: ev.target.value,
                                })
                            }
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
