import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export function Home() {
    const { logout } = useAuth()
    const [files, setFiles] = useState([])

    useEffect(() => {
        (async () => {

            api.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
            const { data } = await api.get("/files/user");

            setFiles(data);
        })();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            Home

            <div>{JSON.stringify(files)}</div>

            <button className="bg-blue-500 h-10 rounded-lg" onClick={logout}>Sair</button>
        </div>
    )
}