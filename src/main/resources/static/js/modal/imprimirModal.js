// Función para crear código para el componente IMPRIMIR
function crearCodigoImprimir() {

  // Obtener los datos del componente IMPRIMIR de los campos del modal
  const imprimirMensaje = document.getElementById('imprimirMensaje').value;

  // Comprobar si el mensaje está vacío
  if (imprimirMensaje.trim() === "") {

    // Mostrar mensaje de error
    swal({
      title: "Error",
      text: "Por favor ingrese un mensaje.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  // Construir el código para el componente IMPRIMIR
  const codigoImprimir = `System.out.println("${imprimirMensaje}");`;

  // Mostrar un mensaje de éxito usando SweetAlert
  swal({
    title: 'Mensaje guardado correctamente!',
    icon: 'success',
    confirmButtonText: 'OK',
  });

  return codigoImprimir; // Devolver el código generado
}

// Agregar un event listener al botón "Guardar Mensaje"
const botonGuardarMensaje = document.getElementById('guardarMensajeButton');
botonGuardarMensaje.addEventListener('click', function() {
  const codigoImprimir = crearCodigoImprimir();

  if (codigoImprimir !== null) {
    // Obtener el contenido existente del maintextarea
    const maintextarea = document.getElementById('maintextarea');
    const contenidoExistente = maintextarea.value;

    // Encontrar la posición de la última llave de cierre en el contenido existente
    const ultimoIndiceLlaveCierre = contenidoExistente.lastIndexOf('}');

    // Insertar el código generado usando la función generalizada
    const contenidoActualizado = insertarCodigoEnUbicacion(contenidoExistente, codigoImprimir, numeroLineaClickeado, ultimoIndiceLlaveCierre);

    // Actualizar el maintextarea con el contenido actualizado
    maintextarea.value = contenidoActualizado;

    // Ocultar el modal
    const modal = document.getElementById('imprimirModal');
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    // Mostrar un mensaje de éxito usando SweetAlert
    swal({
      title: 'Mensaje guardado correctamente!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
});
