import { useState } from "react";

type Usuario = {
  _id: string;
  nombre: string;
  correo: string;
  rol: string;
};

function BuscarClientes() {

  const [texto, setTexto] = useState("");
  const [clientes, setClientes] = useState<Usuario[]>([]);

  // 🔍 BUSCAR
  const buscar = async () => {
    if (!texto) return;

    try {
      const res = await fetch(
        `http://localhost:4000/api/auth/usuarios/buscar/${texto}`
      );

      const data = await res.json();
      setClientes(data);

    } catch (error) {
      console.error("Error buscando clientes", error);
    }
  };

  return (
    <div className="container my-5">

      <h2>Buscar Clientes</h2>

      {/* INPUT */}
      <div className="d-flex gap-2 my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o correo"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button className="btn btn-primary" onClick={buscar}>
          Buscar
        </button>
      </div>

      {/* RESULTADOS */}
      {clientes.map((c) => (
        <div key={c._id} className="border p-3 mb-2 rounded">
          <strong>{c.nombre}</strong>
          <p className="mb-0">{c.correo}</p>
        </div>
      ))}

    </div>
  );
}

export default BuscarClientes;