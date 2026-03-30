import { useEffect, useState } from "react";
import type { ProductoCarrito } from "../App";

interface Props {
  agregarAlCarrito: (producto: ProductoCarrito) => void;
}

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen?: string;
}

function Productos({ agregarAlCarrito }: Props) {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/productos");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos", error);
      }
    };

    fetchData();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container my-5">

      <h2 className="mb-4">Nuestros Productos</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-4">
        {productosFiltrados.map((producto) => (
          <div className="col-md-4" key={producto._id}>
            <div className="card shadow-sm h-100">

              <img
                src={producto.imagen || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={producto.nombre}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">

                <h5>{producto.nombre}</h5>

                <p className="text-muted">
                  {producto.descripcion}
                </p>

                <h6 className="fw-bold">S/ {producto.precio}</h6>

                {producto.stock > 0 ? (
                  <span className="badge bg-success mb-2">
                    Disponible
                  </span>
                ) : (
                  <span className="badge bg-danger mb-2">
                    Sin stock
                  </span>
                )}

                <button
                  className="btn btn-primary mt-auto"
                  disabled={producto.stock === 0}
                  onClick={() =>
                    agregarAlCarrito({
                      id: producto._id,
                      nombre: producto.nombre,
                      precio: Number(producto.precio), // 🔥 FIX
                      imagen: producto.imagen || "",
                      cantidad: 1,
                    })
                  }
                >
                  Agregar
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <p className="mt-4">No hay productos registrados.</p>
      )}

    </div>
  );
}

export default Productos;