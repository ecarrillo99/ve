import React from "react";
import TablaCuentasGratis from "./descargas_gratuitas/TablaCuentasGratis";
import { useState, useEffect } from "react";
import { getCuentaGratis } from "../../controllers/callcenter/CallcenterController";
import { formatDate } from "../../global/util";
import ReactPaginate from "react-paginate";

const ProfileAdmin = () => {
  const [fInicio, setFInicio] = useState(
    formatDate(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [fFin, setFFin] = useState(formatDate(new Date()));
  const [selPagina, setSelPagina] = useState(0);
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const [numPaginas, setNumPaginas] = useState();
  const [cantidad, setCantidad] = useState("20");
  const [total, setTotal] = useState();
  const [nombre, setNombre] = useState();
  const [correo, setCorreo] = useState();
  const [cedula, setCedula] = useState();

  const handleClicAplicar = ({ filtros = false }) => {
    setData();
    setNumPaginas();
    setTotal();
    if (filtros) {
      setSelPagina(0);
    }
    setLoading(true);
    const filtro = {
      pagina: filtros ? 1 : selPagina + 1,
      fechas: {
        inicio: fInicio,
        fin: fFin,
      },
      nombre: nombre,
      correo: correo,
      ci: cedula,
      cantidad: cantidad != "1" ? cantidad : "",
    };

    getCuentaGratis(filtro).then((res) => {
      setLoading(false);
      if (res) {
        setData(res.listado);
        setNumPaginas(
          cantidad == "1"
            ? 1
            : Math.ceil(parseInt(res.cantidad) / parseInt(cantidad))
        );
        setTotal(parseInt(res.cantidad));
      }
    });
  };

  useEffect(() => {
    setData();
    handleClicAplicar({});
  }, [selPagina]);

  const handleOnPageChange = (page) => {
    setSelPagina(page.selected); // Cambiar el estado de la página seleccionada
  };

  const handleUpdateData = (index, item) => {
    setData((prevData) =>
      prevData.map((cuenta) =>
        cuenta.id_tbl_usuario === index
          ? { ...cuenta, callcenter: item }
          : cuenta
      )
    );
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center border-b pb-2 mb-6">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">
            Administración de descargas
          </h1>
          <label>Administra tus descargars</label>
        </div>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center mt-5">
          <span className="icon-[line-md--loading-twotone-loop] w-10 h-10 text-greenVE-600"></span>
        </div>
      ) : !loading && !data ? (
        <div className="w-full flex items-center justify-center mt-5">
          <label>Sin resultados disponibles</label>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md  ">
          <TablaCuentasGratis
            listado={data}
            handleUpdateData={handleUpdateData}
          />
          {
            <ReactPaginate
              forcePage={selPagina}
              breakLabel="..."
              nextLabel="Siguiente"
              onPageChange={handleOnPageChange}
              pageRangeDisplayed={5}
              pageCount={numPaginas}
              previousLabel="Anterior"
              renderOnZeroPageCount={null}
              containerClassName={"flex justify-center p-4"}
              pageClassName={"mx-1"}
              pageLinkClassName={
                "px-3 py-1 border border-gray-300 text-greenVE-600 rounded cursor-pointer transition duration-200 hover:bg-greenVE-100"
              }
              previousClassName={"mx-1"}
              previousLinkClassName={
                "px-3 py-1  border border-gray-300 text-greenVE-600 rounded cursor-pointer transition duration-200 hover:bg-greenVE-100"
              }
              nextClassName={"mx-1"}
              nextLinkClassName={
                "px-3 py-1 border border-gray-300 text-greenVE-600 rounded cursor-pointer transition duration-200 hover:bg-greenVE-100"
              }
              breakClassName={"mx-1"}
              breakLinkClassName={
                "px-3 py-1 border border-gray-300 text-greenVE-600 rounded cursor-pointer transition duration-200 hover:bg-greenVE-100"
              }
              activeClassName={"bg-greenVE-300 rounded py-1 -mt-1"}
            />
          }
        </div>
      )}
    </div>
  );
};

export default ProfileAdmin;
