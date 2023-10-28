// Función para habilitar o deshabilitar el botón "Siguiente" basada en los valores seleccionados de "Variable 1" y "Variable 2" en el modal "MIENTRAS"
function toggleSiguienteWhile() {
  const attribute1ValueWhile = document.getElementById("attribute1While").value;
  const attribute2ValueWhile = document.getElementById("attribute2While").value;
  const siguienteButtonWhile = document.getElementById("siguienteButton");

  // Para el modal "MIENTRAS"
  if (attribute1ValueWhile !== "-" && attribute2ValueWhile !== "-") {
    siguienteButtonWhile.disabled = false;
  } else {
    siguienteButtonWhile.disabled = true;
  }
}

// Llamar a la función cuando se muestra el modal (por ejemplo, después de hacer clic en el botón "MIENTRAS")
document.getElementById("mientrasModal").addEventListener("shown.bs.modal", function () {
  toggleSiguienteWhile();
});

// Agregar event listeners a los desplegables en el modal "MIENTRAS" para activar la función toggleSiguienteWhile
document.getElementById("attribute1While").addEventListener("change", function () {
  toggleSiguienteWhile();
});

document.getElementById("attribute2While").addEventListener("change", function () {
  toggleSiguienteWhile();
});

// Función para poblar dinámicamente el desplegable de atributos en el modal "Definir Incremento o Decremento"
document.getElementById("modalIncrementDecrement").addEventListener("show.bs.modal", function () {
  // Obtener los atributos disponibles del modal "MIENTRAS"
  const attribute1ValueWhile = document.getElementById("attribute1While").value;
  const attribute2ValueWhile = document.getElementById("attribute2While").value;

  // Poblar el desplegable de atributos en el modal "Definir Incremento o Decremento"
  const attributeDropdown = document.getElementById("attributeDropdown");
  attributeDropdown.innerHTML = `
    <option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>
    <option value="${attribute1ValueWhile}" style="background-color: rgba(0, 0, 0, 0.8);">${attribute1ValueWhile}</option>
    <option value="${attribute2ValueWhile}" style="background-color: rgba(0, 0, 0, 0.8);">${attribute2ValueWhile}</option>
  `;

  // Deshabilitar el botón "Aceptar" inicialmente cuando se muestra el modal
  const aceptarButton = document.getElementById("aceptarButton");
  aceptarButton.disabled = true;
});

// Agregar un event listener al desplegable de atributos
document.getElementById("attributeDropdown").addEventListener("change", function () {
  // Obtener el valor seleccionado
  const selectedValue = this.value; // Usar "this" para referirse al desplegable de atributos

  // Obtener el botón "Aceptar" por su id
  const aceptarButton = document.getElementById("aceptarButton");

  // Comprobar si el valor seleccionado es '-'
  if (selectedValue === '-') {
    // Deshabilitar el botón "Aceptar"
    aceptarButton.disabled = true;
  } else {
    // Habilitar el botón "Aceptar"
    aceptarButton.disabled = false;
  }
});

// Agregar un event listener al botón "Siguiente" en el modal "MIENTRAS"
document.getElementById("siguienteButton").addEventListener("click", function () {
  // Obtener los valores de "Variable 1" y "Variable 2" seleccionados en el modal "MIENTRAS"
  const attribute1ValueWhile = document.getElementById("attribute1While").value;
  const attribute2ValueWhile = document.getElementById("attribute2While").value;
  const comparisonOperation2Value = document.getElementById("comparisonOperation2").value;

  // Resto de tu código para manejar el clic en el botón "Siguiente"...
});

// Función para crear código para el componente MIENTRAS
function createMientrasCode(attribute1While, attribute2While, comparisonOperation2, messageWhileValue, selectedAttribute, incrementDecrementValue) {

  // Construir el código para el componente MIENTRAS
  let mientrasCode = `while (${attribute1While} ${comparisonOperation2} ${attribute2While}) {\n`;
  mientrasCode += `  System.out.println("${messageWhileValue}");\n`; // Código a ejecutar mientras la condición sea verdadera

  // Comprobar si se seleccionó un Incremento o Decremento para el atributo seleccionado
  if (incrementDecrementValue === '++') {
    mientrasCode += `  ${selectedAttribute}++;\n`;
  } else if (incrementDecrementValue === '--') {
    mientrasCode += `  ${selectedAttribute}--;\n`;
  }

  mientrasCode += `}`;

  return mientrasCode;
}

// Función para manejar el clic en el botón "Guardar Condición 'MIENTRAS'"
function saveWhileCondition() {
  // Obtener los valores seleccionados en el modal "MIENTRAS"
  const attribute1WhileValue = document.getElementById('attribute1While').value;
  const attribute2WhileValue = document.getElementById('attribute2While').value;
  const comparisonOperation2Value = document.getElementById('operacionComparacion2').value;

  // Obtener el mensaje del modal "Imprimir Mensaje"
  const messageWhileValue = document.getElementById('messageWhile').value;

  // Obtener el valor seleccionado del desplegable Incremento/Decremento
  const attributeDropdownValue = document.getElementById('attributeDropdown').value;

  // Comprobar si el mensaje no está vacío
  if (messageWhileValue.trim() === "") {
    // Mostrar un mensaje de advertencia usando SweetAlert
    swal({
      title: "Error",
      text: "Por favor ingrese un mensaje.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return; // Salir de la función sin generar la estructura MIENTRAS
  }

  // Comprobar si no se ha seleccionado la opción de Incremento/Decremento (asumiendo que '-' es el valor predeterminado)
  if (attributeDropdownValue === '-') {
    // Mostrar un mensaje de advertencia usando SweetAlert para el Incremento/Decremento
    swal({
      title: "Error",
      text: "Por favor seleccione un Incremento o Decremento.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return; // Salir de la función sin generar la estructura MIENTRAS
  }

  // Obtener el valor de Incremento/Decremento seleccionado del desplegable correspondiente
  const incrementDecrementValue = document.getElementById('incrementDecrementDropdown').value;

  // Construir la estructura del bucle MIENTRAS basada en las entradas del usuario usando createMientrasCode()
  const whileStructureCode = createMientrasCode(
    attribute1WhileValue,
    attribute2WhileValue,
    comparisonOperation2Value,
    messageWhileValue,
    attributeDropdownValue,
    incrementDecrementValue
  );

  // Obtener el nombre del procedimiento existente y las variables del variablesModal
  const variablesGuardados = document.getElementById('variablesCargados').value;

  // Obtener el contenido existente del maintextarea
  const maintextarea = document.getElementById('maintextarea');

  // Encontrar la posición de la última llave de cierre en el contenido existente
  const ultimoIndiceLlaveCierre = maintextarea.value.lastIndexOf('}');

  // Insertar el código de la estructura MIENTRAS generada ya sea en la línea clicada o después de la última llave de cierre
  const updatedContent = insertarCodigoEnUbicacion(maintextarea.value, whileStructureCode, numeroLineaClickeado, ultimoIndiceLlaveCierre);

  // Después de generar código, formatear el maintextarea
  formatearCodigoEnTextarea();

  // Actualizar el maintextarea con el procedimiento completo
  maintextarea.value = updatedContent;

  // Cerrar el modal "condicionWhileModal"
  const modal = document.getElementById('condicionWhileModal');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  // Mostrar un mensaje de éxito usando SweetAlert
  swal({
    title: '¡Condición MIENTRAS guardada correctamente!',
    icon: 'success',
    confirmButtonText: 'OK',
  });
}

// Agregar un event listener al botón "Guardar Condicion MIENTRAS"
document.getElementById('guardarCondicionWhile').addEventListener('click', function () {
  saveWhileCondition(); // Llamar a la función para guardar la condición MIENTRAS
});

