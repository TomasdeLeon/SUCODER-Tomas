// Función para habilitar o deshabilitar el botón "Siguiente" basándose en los valores seleccionados de "Variable 1" y "Variable 2"
function alternarBotonSiguiente() {
  const atributo1 = document.getElementById("attribute1").value;
  const atributo2 = document.getElementById("attribute2").value;
  const botonSiguiente = document.querySelector("#siModal .modal-footer button");

  if (atributo1 !== "-" && atributo2 !== "-") {
    botonSiguiente.disabled = false;
  } else {
    botonSiguiente.disabled = true;
  }
}

// Llamar a la función cuando se muestra el modal (por ejemplo, después de hacer clic en el botón "SI")
document.getElementById("siModal").addEventListener("shown.bs.modal", function () {
  alternarBotonSiguiente();
});

// Llamar a la función cada vez que cambie la selección de "Variable 1" o "Variable 2"
document.getElementById("attribute1").addEventListener("change", function () {
  alternarBotonSiguiente();
});

document.getElementById("attribute2").addEventListener("change", function () {
  alternarBotonSiguiente();
});

let condicionVerdadera = '';
let condicionFalsa = '';

// Función para verificar la condición basada en los valores seleccionados y el operador
function verificarCondicion(valorAtributo1, valorAtributo2, operacionComparacion) {
  // Tu lógica para verificar la condición y devolver un valor booleano
  // Por ejemplo:
  switch (operacionComparacion) {
    case "==":
      return valorAtributo1 == valorAtributo2;
    case "!=":
      return valorAtributo1 != valorAtributo2;
    case ">":
      return valorAtributo1 > valorAtributo2;
    case ">=":
    case ">=":
      return valorAtributo1 >= valorAtributo2;
    case "<":
      return valorAtributo1 < valorAtributo2;
    case "<=":
      return valorAtributo1 <= valorAtributo2;
    default:
      return false;
  }
}

// Función para crear código para el componente SI
function crearCodigoSi(attribute1, attribute2, operacionComparacion, condicionVerdadera, condicionFalsa) {
  // Obtener los datos del componente SI de los campos del modal
  const entradaAtributo1 = document.getElementById('attribute1').value;
  const entradaAtributo2 = document.getElementById('attribute2').value;

  let codigoSi = `if (${attribute1} ${operacionComparacion} ${attribute2}) {\n`;
  codigoSi += `  System.out.println("${condicionVerdadera}");\n`; // Código a ejecutar cuando la condición es verdadera
  codigoSi += "} else {\n";
  codigoSi += `  System.out.println("${condicionFalsa}");\n`; // Código a ejecutar cuando la condición es falsa
  codigoSi += "}";

  return codigoSi;
}

// Función para insertar código en una ubicación específica
function insertarCodigoEnUbicacion(contenidoExistente, codigoAInsertar, numeroLineaClicado, ultimoIndiceLlaveCierre) {
    const textarea = document.getElementById('maintextarea');
    const contenidoActual = contenidoExistente;

    if (numeroLineaClickeado !== -1 && numeroLineaClickeado < contenidoActual.split('\n').length) {
        // Insertar el código en la línea clicada
        const lineas = contenidoActual.split('\n');
        lineas.splice(numeroLineaClickeado - 1, 0, '');
        lineas.splice(numeroLineaClickeado, 0, codigoAInsertar, '');
        return lineas.join('\n');
    } else if (ultimoIndiceLlaveCierre !== -1) {
        // Insertar el código después de la última llave de cierre
        return contenidoActual.slice(0, ultimoIndiceLlaveCierre) +
            '\n' + codigoAInsertar + '\n' +
            contenidoActual.slice(ultimoIndiceLlaveCierre);
    } else {
        // Si no hay llave de cierre y no se ha hecho clic en una línea, simplemente agregar el código al principio del código
        return codigoAInsertar + '\n' + contenidoActual;
    }
}

// Función para dar formato al código en el área de texto
function formatearCodigoEnTextarea() {
  // Obtener el contenido del área de texto principal
  const textarea = document.getElementById('maintextarea');
  const codigo = textarea.value;

  // Dividir el código en líneas y eliminar el espacio en blanco en cada línea
  const lineas = codigo.split('\n').map(linea => linea.trim());

  // Crear una variable de nivel de sangría
  let nivelSangria = 0;

  // Inicializar el código formateado como una cadena vacía
  let codigoFormateado = '';

  // Iterar a través de las líneas de código
  for (let linea of lineas) {
    // Eliminar cualquier sangría inicial existente
    linea = linea.trimStart();

    // Agregar la sangría apropiada basándose en el nivel
    for (let i = 0; i < nivelSangria; i++) {
      codigoFormateado += '  '; // Puedes ajustar la cantidad de espacios por nivel
    }

    // Agregar la línea al código formateado
    codigoFormateado += linea + '\n';

    // Ajustar el nivel de sangría basándose en la estructura del código
    if (linea.includes('{')) {
      nivelSangria++;
    } else if (linea.includes('}')) {
      nivelSangria--;
    }
  }

  // Actualizar el área de texto con el código formateado
  textarea.value = codigoFormateado;
}

// Función para manejar el clic en el botón "Guardar Condición 'SI'"
function generarEstructuraSi() {
  // Obtener los datos del componente SI del modal
  const valorAtributo1 = document.getElementById("attribute1").value;
  const valorAtributo2 = document.getElementById("attribute2").value;
  const operacionComparacion = document.getElementById("operacionComparacion").value;

  // Tu lógica para verificar la condición basada en los valores seleccionados y el operador
  const condicionCumplida = verificarCondicion(valorAtributo1, valorAtributo2, operacionComparacion);

  // Obtener los mensajes verdaderos y falsos de los campos de entrada
  const verdaderaCondicion = document.getElementById("condicionVerdadera").value;
  const falsaCondicion = document.getElementById("condicionFalsa").value;

  // Verificar si tanto los mensajes verdaderos como los mensajes falsos de la condición no están vacíos
  if (verdaderaCondicion.trim() === "" && falsaCondicion.trim() === "") {
    // Mostrar un mensaje de advertencia usando SweetAlert
    swal({
      title: "Error",
      text: "Por favor, ingrese al menos un mensaje.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return; // Salir de la función sin generar la estructura SI
  }

  // Generar la estructura SI basada en la condición usando createSiCode()
  const codigoEstructuraSi = crearCodigoSi(valorAtributo1, valorAtributo2, operacionComparacion, verdaderaCondicion, falsaCondicion);

  // Obtener el contenido existente del área de texto principal
  const maintextarea = document.getElementById("maintextarea");

  // Encontrar la posición de la última llave de cierre en el contenido existente
  const ultimoIndiceLlaveCierre = maintextarea.value.lastIndexOf('}');

  // Insertar el código de la estructura SI generada ya sea en la línea clicada o después de la última llave de cierre
  const contenidoActualizado = insertarCodigoEnUbicacion(maintextarea.value, codigoEstructuraSi, numeroLineaClickeado, ultimoIndiceLlaveCierre);

  // Después de generar el código, formatear el área de texto
  formatearCodigoEnTextarea();

  // Actualizar el área de texto con el procedimiento completo
  maintextarea.value = contenidoActualizado;

  // Cerrar los modales "Imprimir" (opcional)
  const modal = document.getElementById('exampleModalToggle2');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  // Mostrar un mensaje de éxito usando SweetAlert
  swal({
    title: '¡Condición SI guardada correctamente!',
    icon: 'success',
    confirmButtonText: 'OK',
  });
}

// Agregar un event listener al botón "Guardar Condición Si"
document.getElementById("guardarCondicionSiBtn").addEventListener("click", function () {
  generarEstructuraSi(); // Llamar a la función para generar la estructura SI
});
