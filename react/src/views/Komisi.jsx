import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Komisi() {
    const [komisi, setKomisi] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getKomisi();
    }, []);

    const getKomisi = () => {
        setLoading(true);
        axiosClient
            .get("/komisi")
            .then(({ data }) => {
                setLoading(false);
                setKomisi(data.data);
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
                <h1>Komisi</h1>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Marketing Name</th>
                            <th>Bulan</th>
                            <th>Omzet</th>
                            <th>Komisi Persen</th>
                            <th>Komisi Nominal</th>
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
                            {komisi.map((k) => (
                                <tr key={k.key}>
                                    <td>{k.marketing_name}</td>
                                    <td>{k.bulan}</td>
                                    <td style={{ textAlign: "right" }}>
                                        Rp{k.omzet}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        {k.komisi_persen}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        Rp{k.komisi_nominal}
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
