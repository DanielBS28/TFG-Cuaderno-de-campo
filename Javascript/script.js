let jsonLimpio = null; // Variable global para almacenar el JSON limpio

document.addEventListener("DOMContentLoaded", () => {
  const archivoInput = document.getElementById("archivo");
  const formulario = document.querySelector("form");

  archivoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Por favor, seleccione un archivo JSON");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);

        // Extraer y limpiar los campos necesarios
        jsonLimpio = {
          Productos: jsonData.Productos.map((itemProducto) => ({
            IdProducto: itemProducto.DATOSPRODUCTO.IdProducto,
            Num_Registro: itemProducto.DATOSPRODUCTO.Num_Registro,
            Nombre: itemProducto.DATOSPRODUCTO.Nombre,
            Formulado: itemProducto.DATOSPRODUCTO.Formulado,
            Titular: itemProducto.DATOSPRODUCTO.Titular,
            Fabricante: itemProducto.DATOSPRODUCTO.Fabricante,
            Fecha_Registro: itemProducto.DATOSPRODUCTO.Fecha_Registro,
            Estado: itemProducto.DATOSPRODUCTO.Estado,
            Fecha_Caducidad: itemProducto.DATOSPRODUCTO.Fecha_Caducidad,
            Fecha_Cancelacion: itemProducto.DATOSPRODUCTO.Fecha_Cancelacion,
            Fecha_LimiteVenta: itemProducto.DATOSPRODUCTO.Fecha_LimiteVenta,
            Usos: itemProducto.USOS.map((itemUso) => ({
              CodigoCultivo: itemUso.CodigoCultivo,
              Cultivo: itemUso.Cultivo,
              CodigoAgente: itemUso.CodigoAgente,
              Agente: itemUso.Agente,
              Dosis_Min: itemUso.Dosis_Min,
              Dosis_Max: itemUso.Dosis_Max,
              UnidadMedidaDosis: itemUso["Unidad Medida dosis"],
              PlazoSeguridad: itemUso["Plazo Seguridad"],
              VolumenCaldo: itemUso["Volumen Caldo"],
              Aplicaciones: itemUso.Aplicaciones,
              IntervaloAplicaciones: itemUso.IntervaloAplicaciones,
              CondicionamientoEspecifico: itemUso.CondicionamientoEspecifico,
              MetodoAplicacion: itemUso.MetodoAplicacion,
              Volumen_Min: itemUso.Volumen_Min,
              VolumenMax: itemUso.VolumenMax,
              UnidadesVolumen: itemUso["Unidades Volumen"],
            })),
          })),
        };
        // Objeto para almacenar las longitudes máximas
        const longitudesMaximas = {
          IdProducto: 0,
          Nombre: 0,
          Formulado: 0,
          Num_Registro: 0,
          Titular: 0,
          Fabricante: 0,
          Estado: 0,
          // valores para los campos de uso
          Cultivo: 0,
          CodigoCultivo: 0,
          CodigoAgente: 0,
          Agente: 0,
          UnidadMedidaDosis: 0,
          PlazoSeguridad: 0,
          VolumenCaldo: 0,
          Aplicaciones: 0,
          IntervaloAplicaciones: 0,
          CondicionamientoEspecifico: 0,
          MetodoAplicacion: 0,
          UnidadesVolumen: 0,
        };

        jsonLimpio.Productos.forEach((producto) => {
          longitudesMaximas.IdProducto = Math.max(
            longitudesMaximas.IdProducto,
            producto.IdProducto.toString().length
          );
          longitudesMaximas.Nombre = Math.max(
            longitudesMaximas.Nombre,
            producto.Nombre.length
          );
          longitudesMaximas.Formulado = Math.max(
            longitudesMaximas.Formulado,
            producto.Formulado.length
          );
          longitudesMaximas.Num_Registro = Math.max(
            longitudesMaximas.Num_Registro,
            producto.Num_Registro.length
          );
          longitudesMaximas.Estado = Math.max(
            longitudesMaximas.Estado,
            producto.Estado.length
          );
          longitudesMaximas.Titular = Math.max(
            longitudesMaximas.Titular,
            producto.Titular.length
          );
          longitudesMaximas.Fabricante = Math.max(
            longitudesMaximas.Fabricante,
            producto.Fabricante.length
          );

          producto.Usos.forEach((uso) => {
            if (uso.VolumenCaldo) {
              longitudesMaximas.VolumenCaldo = Math.max(
                longitudesMaximas.VolumenCaldo,
                uso.VolumenCaldo.length
              );
            }
            if (uso.CondicionamientoEspecifico) {
              longitudesMaximas.CondicionamientoEspecifico = Math.max(
                longitudesMaximas.CondicionamientoEspecifico,
                uso.CondicionamientoEspecifico.length
              );
            }
            if (uso.Agente) {
              longitudesMaximas.Agente = Math.max(
                longitudesMaximas.Agente,
                uso.Agente.length
              );
            }
            if (uso.Cultivo) {
              longitudesMaximas.Cultivo = Math.max(
                longitudesMaximas.Cultivo,
                uso.Cultivo.length
              );
            }
            if (uso.CodigoCultivo) {
              longitudesMaximas.CodigoCultivo = Math.max(
                longitudesMaximas.CodigoCultivo,
                uso.CodigoCultivo.length
              );
            }
            if (uso.CodigoAgente) {
              longitudesMaximas.CodigoAgente = Math.max(
                longitudesMaximas.CodigoAgente,
                uso.CodigoAgente.length
              );
            }
            if (uso.UnidadMedidaDosis) {
              longitudesMaximas.UnidadMedidaDosis = Math.max(
                longitudesMaximas.UnidadMedidaDosis,
                uso.UnidadMedidaDosis.length
              );
            }
            if (uso.PlazoSeguridad) {
              longitudesMaximas.PlazoSeguridad = Math.max(
                longitudesMaximas.PlazoSeguridad,
                uso.PlazoSeguridad.length
              );
            }
            if (uso.Aplicaciones) {
              longitudesMaximas.Aplicaciones = Math.max(
                longitudesMaximas.Aplicaciones,
                uso.Aplicaciones.length
              );
            }
            if (uso.IntervaloAplicaciones) {
              longitudesMaximas.IntervaloAplicaciones = Math.max(
                longitudesMaximas.IntervaloAplicaciones,
                uso.IntervaloAplicaciones.length
              );
            }
            if (uso.MetodoAplicacion) {
              longitudesMaximas.MetodoAplicacion = Math.max(
                longitudesMaximas.MetodoAplicacion,
                uso.MetodoAplicacion.length
              );
            }
            if (uso.UnidadesVolumen) {
              longitudesMaximas.UnidadesVolumen = Math.max(
                longitudesMaximas.UnidadesVolumen,
                uso.UnidadesVolumen.length
              );
            }
          });
        });

        console.log("Longitudes máximas de campos:");
        console.table(longitudesMaximas);

        console.log("JSON parseado y listo para enviar:", jsonLimpio);
      } catch (error) {
        jsonLimpio = null;
        console.error("Error al parsear el JSON:", error);
      }
    };
    reader.readAsText(file);
  });

  formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!jsonLimpio) {
      alert("Primero debes seleccionar y procesar un archivo JSON válido.");
      return;
    }

    if (!confirm("¿Seguro que deseas actualizar el JSON de forma manual?"))
      return;

    try {
      const response = await fetch("http://localhost:3000/subir-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonLimpio),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        alert("Productos y usos actualizados correctamente.");
      } else {
        console.error("Detalles:", data.detalle);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });
});
