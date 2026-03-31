import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

type ProductoCompra = {
  nombre: string;
  precio: number;
  cantidad: number;
};

type Compra = {
  _id: string;
  productos: ProductoCompra[];
  total: number;
  fecha: string;
};

function Historial() {

  const { user } = useAuth();
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {

    if (!user) return;

    fetch(`http://localhost:4000/api/compras/${user.id}`)
      .then(res => res.json())
      .then(data => setCompras(data));

  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Historial de compras</h2>

      {compras.length === 0 ? (
        <p>No tienes compras</p>
      ) : (
        compras.map((c) => (
          <div key={c._id} className="card p-3 mb-3">

            <p><strong>Fecha:</strong> {new Date(c.fecha).toLocaleString()}</p>
            <p><strong>Total:</strong> S/ {c.total}</p>

            <ul>
              {c.productos.map((p, i) => (
                <li key={i}>
                  {p.nombre} - {p.cantidad} x S/ {p.precio}
                </li>
              ))}
            </ul>

          </div>
        ))
      )}
    </div>
  );
}

export default Historial;