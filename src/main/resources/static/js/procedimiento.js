let nombreProcedimiento = '';
let componentes = [];

function esNombreProcedimientoVacio() {
  const nombreProcedimiento = document.getElementById('procedureName').value;
  return nombreProcedimiento.trim() === '';
}

function esNombreProcedimientoValido() {
  const nombreProcedimiento = document.getElementById('procedureName').value;

  // Verifica si el nombre del procedimiento contiene espacios y comienza con una letra minúscula
  return /^[a-z][a-zA-Z0-9]*$/.test(nombreProcedimiento);
}

function validarNombreProcedimiento() {
  if (esNombreProcedimientoVacio()) {
    swal("El nombre del procedimiento no puede estar vacío.", "", "warning");
  } else if (!esNombreProcedimientoValido()) {
    swal("El nombre del procedimiento no puede contener espacios y debe comenzar con una letra minúscula.", "", "warning");
  }
}

function abrirModal(modalId) {
  if (esNombreProcedimientoVacio()) {

    // Muestra una advertencia SweetAlert cuando el nombre del procedimiento está vacío o no válido
    swal("El nombre del procedimiento no puede estar vacío.", "", "warning");
  } else if (!esNombreProcedimientoValido()) {
    swal("El nombre del procedimiento no es válido.", "Debe comenzar con una letra minúscula y no contener espacios.", "error");
  } else {

    // El nombre del procedimiento no está vacío y es válido, abre el modal especificado
    $(modalId).modal('show');
  }
}

function actualizarNombreProcedimiento() {
  nombreProcedimiento = document.getElementById('procedureName').value;
  actualizarAreaTexto();
}

function actualizarComponentes(componente) {
  componentes.push(componente);
  actualizarAreaTexto();
}

function actualizarAreaTexto() {
  const procedimientoFormateado = crearProcedimientoJava(nombreProcedimiento, componentes);
  document.getElementById('maintextarea').value = procedimientoFormateado;
}

function crearProcedimientoJava(nombre, componentes) {
  let codigoProcedimiento = '';

  if (nombre) {
    codigoProcedimiento = `public void ${nombre}() {\n`;
  }

  for (const componente of componentes) {
    codigoProcedimiento += componente + '\n';
  }

  if (nombre) {
    codigoProcedimiento += '}\n';
  }

  return codigoProcedimiento;
}
