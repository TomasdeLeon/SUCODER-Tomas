// Función para crear código para el componente COMENTARIO
function crearCodigoComentario(mensajeComentario) {

  // Construir el código para el componente COMENTARIO
  const codigoComentario = `// ${mensajeComentario}`;
  return codigoComentario;
}

// Función para manejar el botón "Guardar Comentario"
function guardarComentario() {
  let mensajeComentario = document.getElementById('mensajeComentado').value;

  // Comprobar si el comentario no está vacío
  if (mensajeComentario.trim() === "") {
    // Mostrar un mensaje de advertencia usando SweetAlert
    swal({
      title: "Error",
      text: "Por favor ingrese un comentario.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  // Crear el código COMENTARIO utilizando el mensaje
  const codigoComentario = crearCodigoComentario(mensajeComentario);

  // Obtener el contenido existente del maintextarea
  const maintextarea = document.getElementById('maintextarea');
  const contenidoExistente = maintextarea.value;

  // Encontrar la posición de la última llave de cierre en el contenido existente
  const ultimoIndiceLlaveCierre = maintextarea.value.lastIndexOf('}');

  // Insertar el código de comentario generado usando la función generalizada
  const contenidoActualizado = insertarCodigoEnUbicacion(contenidoExistente, codigoComentario, numeroLineaClickeado, ultimoIndiceLlaveCierre);

  // Actualizar el maintextarea con el nuevo contenido
  maintextarea.value = contenidoActualizado;

  const modal = document.getElementById('comentarModal');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  // Mostrar un mensaje de éxito usando SweetAlert
  swal({
    title: 'Mensaje guardado correctamente!',
    icon: 'success',
    confirmButtonText: 'OK',
  });
}

// Agregar un event listener al botón "Guardar Comentario"
document.getElementById('guardarComentarioBtn').addEventListener('click', function () {
  guardarComentario(); // Llamar a la función para guardar el comentario
});
