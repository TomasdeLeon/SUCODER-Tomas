// Función para crear el código PROCEDIMIENTO
function crearCodigoProcedimiento(nombreProcedimiento) {
  const codigoProcedimiento = `${nombreProcedimiento}();`;
  return codigoProcedimiento;
}

// Función para poblar procedimientoText
function poblarTextoProcedimiento() {
  const nombreProcedimiento = document.getElementById('nombreProcedimiento').value;

  // Reemplace esta lógica con la suya para obtener el procedimiento del usuario.
  // Para este ejemplo, usaremos una cadena vacía.
  const textoProcedimientoObtenido = ''; // Obtenga el contenido del procedimiento

  const textoProcedimiento = document.getElementById('textoProcedimiento');
  textoProcedimiento.value = textoProcedimientoObtenido;

  // Después de poblar textoProcedimiento, verifique si está vacío y muestre/oculte el botón
  const botonInsertar = document.getElementById('insertarProcedimiento');
  if (textoProcedimiento.value.trim() === '') {
    botonInsertar.disabled = false; // Ocultar el botón
  } else {
    botonInsertar.disabled = true; // Mostrar el botón
  }
}

// Agregar un event listener al botón "Buscar Procedimiento"
document.getElementById('buscarProcedimiento').addEventListener('click', function () {
  poblarTextoProcedimiento();
});

// Función para generar el código del procedimiento e insertarlo
function generarCodigoProcedimiento() {
  const nombreProcedimiento = document.getElementById('nombreProcedimiento').value;
  const llamadaProcedimiento = crearCodigoProcedimiento(nombreProcedimiento);
  const maintextarea = document.getElementById('maintextarea');
  const ultimoIndiceLlaveCierre = maintextarea.value.lastIndexOf('}');
  const contenidoActualizado = insertarCodigoEnUbicacion(maintextarea.value, llamadaProcedimiento, numeroLineaClickeado, ultimoIndiceLlaveCierre);
  maintextarea.value = contenidoActualizado;

  // Obtenga el texto del procedimiento y divídalo en líneas
  const textoProcedimiento = document.getElementById('textoProcedimiento').value;
  const lineasTextoProcedimiento = textoProcedimiento.split('\n');

  // Agregue un mensaje de comentario
  maintextarea.value += `\n// Procedimiento ${nombreProcedimiento}\n`;

  // Agregue las líneas del texto del procedimiento como comentarios fuera del código del método principal
  for (const linea of lineasTextoProcedimiento) {
    maintextarea.value += `\n// ${linea}`;
  }
  maintextarea.value += '\n'; // Agregue una línea adicional para separación

  // Cierre el modal
  const modal = document.getElementById('procedimientoModal');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  // Borre el campo de nombreProcedimiento
  document.getElementById('nombreProcedimiento').value = '';

  // Oculte el botón "Insertar Procedimiento" después de insertar el procedimiento
  const botonInsertar = document.getElementById('insertarProcedimiento');
  botonInsertar.style.display = 'none';
}

// Agregar un event listener al botón "Insertar Procedimiento"
document.getElementById('insertarProcedimiento').addEventListener('click', function () {
  generarCodigoProcedimiento();
});

// Función para limpiar los campos de procedimientoText y nombreProcedimiento
function limpiarCamposProcedimiento() {
  document.getElementById('nombreProcedimiento').value = '';
  document.getElementById('textoProcedimiento').value = '';

  // Oculte el botón "Insertar Procedimiento" al limpiar los campos
  const botonInsertar = document.getElementById('insertarProcedimiento');
  botonInsertar.disabled = true;
}

// Agregar un event listener para limpiar los campos cuando se oculta el modal
$('#procedimientoModal').on('hidden.bs.modal', function () {
  limpiarCamposProcedimiento();
});

