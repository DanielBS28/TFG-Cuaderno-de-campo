document.addEventListener('DOMContentLoaded', () => {
    const archivoJson = document.getElementById('archivo');

    archivoJson.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Por favor, seleccione un archivo JSON");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(reader.result);
            
                // Extraer campos específicos
                const camposExtraidos = {
                    Productos: jsonData.Productos.map(itemProducto => (
                        {
                            IdProducto: itemProducto.DATOSPRODUCTO.IdProducto,
                            Num_Registro: itemProducto.DATOSPRODUCTO.Num_Registro,
                            Nombre: itemProducto.DATOSPRODUCTO.Nombre,
                            Titular: itemProducto.DATOSPRODUCTO.Titular,
                            Fabricante: itemProducto.DATOSPRODUCTO.Fabricante,
                            Fecha_Registro: itemProducto.DATOSPRODUCTO.Fecha_Registro,
                            Estado: itemProducto.DATOSPRODUCTO.Estado,
                            Fecha_Caducidad: itemProducto.DATOSPRODUCTO.Fecha_Caducidad,
                            Fecha_Cancelacion: itemProducto.DATOSPRODUCTO.Fecha_Cancelacion,
                            Fecha_LimiteVenta: itemProducto.DATOSPRODUCTO.Fecha_LimiteVenta,
                            Usos: itemProducto.USOS.map(itemUso => (
                                {
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
                                    UnidadesVolumen: itemUso["Unidades Volumen"]
                                }
                            )
                        )}
                    ))
                };
                console.log(camposExtraidos);
            } catch (error) {
                alert("El archivo no es un JSON válido");
                console.error("Error al leer el archivo JSON:", error);
            }
        }

        reader.readAsText(file);
    });
});
