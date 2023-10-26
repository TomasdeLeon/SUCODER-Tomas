// Crear un arreglo para almacenar los nombres de las variables
const nombresVariables = [];

// Función para alternar la visibilidad y el estado deshabilitado del botón "Guardar Variables"
function actualizarBotonGuardarVariables() {
    const valorVariablesCargadas = document.getElementById('variablesCargados').value.trim();
    const botonGuardarVariables = document.getElementById('guardarVariablesBtn');
    botonGuardarVariables.disabled = valorVariablesCargadas === ''; // Deshabilitar el botón si el área de texto está vacía
}

// Función para crear código de declaración de variables
function crearCodigoVariables(declaracionesVariables) {
    // Construir el código para declarar las variables
    const codigoVariables = declaracionesVariables.join('\n');

    return codigoVariables;
}

// Función para borrar el área de texto de variables
function borrarAreaTextoVariables() {
    document.getElementById('variablesCargados').value = '';
    nombresVariables.length = 0; // Limpiar el arreglo de nombres de variables
    actualizarBotonGuardarVariables(); // Actualizar el estado del botón
}

// Función para obtener el número de línea donde se encuentra el cursor
function obtenerNumeroLinea(textarea, posicionCursor) {
    const textoAntesCursor = textarea.value.substring(0, posicionCursor);
    const lineas = textoAntesCursor.split('\n');
    return lineas.length;
}

let numeroLineaClickeado = -1; // Inicializar en -1 cuando no se ha hecho clic en ninguna línea
let posicionCursorClickeado = -1; // Inicializar en -1 cuando no se ha hecho clic en ninguna línea

// Evento para hacer clic en una línea en el área de texto
document.getElementById('maintextarea').addEventListener('click', function (evento) {
    const textarea = evento.target;
    const posicionCursor = textarea.selectionStart;
    numeroLineaClickeado = obtenerNumeroLinea(textarea, posicionCursor);
    posicionCursorClickeado = posicionCursor;
});

// Función para agregar una declaración de variable dentro del procedimiento o en la línea clicada
function agregarVariableEnLineaClicadaOInsertarEnProcedimiento(declaracionVariable) {
    const textarea = document.getElementById('maintextarea');
    const contenidoActual = textarea.value;

    // Encontrar la posición de la última llave de cierre '}' dentro del procedimiento
    const indiceUltimaLlaveCierre = contenidoActual.lastIndexOf('}');

    if (numeroLineaClickeado !== -1 && numeroLineaClickeado < contenidoActual.split('\n').length) {
        // Insertar la declaración de variable en la línea clicada
        const lineas = contenidoActual.split('\n');

        // Insertar una línea en blanco antes de la línea clicada
        lineas.splice(numeroLineaClickeado - 1, 0, '');

        // Insertar la declaración de variable en la línea clicada
        lineas.splice(numeroLineaClickeado, 0, declaracionVariable);

        // Actualizar el área de texto con el contenido modificado, uniendo las líneas con '\n'
        textarea.value = lineas.join('\n');
    } else if (indiceUltimaLlaveCierre !== -1) {

        // Insertar la declaración de variable después de la última llave de cierre
        const contenidoActualizado =
            contenidoActual.slice(0, indiceUltimaLlaveCierre) +
            '\n' + declaracionVariable + '\n' +
            contenidoActual.slice(indiceUltimaLlaveCierre);
        textarea.value = contenidoActualizado;
    } else {
        // Si no hay llave de cierre y no se ha hecho clic en una línea, simplemente agregar la declaración de variable al principio del código
        textarea.value = declaracionVariable + '\n' + contenidoActual;
    }

    // Restablecer el número de línea clicada
    numeroLineaClickeado = -1;
}

// Agregar un evento de entrada al área de texto "variablesCargados" para activar la función de alternar
document.getElementById('variablesCargados').addEventListener('input', actualizarBotonGuardarVariables);

// Definir una lista para almacenar nombres de variables utilizados
const nombresVariablesUsados = [];

// Expresión regular para la validación de nombres de variables
const patronNombreVariable = /^[a-z][a-zA-Z0-9]*$/;

// Evento para el botón "Cargar Variables"
document.getElementById('cargarVariablesBtn').addEventListener('click', function () {
    const nombreVariable = document.getElementById('variableNombre').value;
    const tipoVariable = document.getElementById('variableTipo').value;
    let valorVariable = document.getElementById('variableValor').value;

    // Verificar si todos los campos están completos
    if (!nombreVariable || !tipoVariable || !valorVariable) {
        // Mostrar un mensaje de advertencia por entradas incompletas
        swal({
            text: 'Por favor, complete todos los campos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return; // Salir de la función sin agregar la variable
    }

    // Verificar si el nombre de la variable ya está en uso
    if (nombresVariablesUsados.includes(nombreVariable)) {
        swal({
            title: 'Nombre de Variable Repetido',
            text: 'El nombre de la variable ya se encuentra en uso.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Verificar si el nombre de la variable coincide con el patrón
    if (!patronNombreVariable.test(nombreVariable)) {
        swal({
            title: 'Nombre de Variable Inválido',
            text: 'Debe comenzar con una letra minúscula y no contener espacios.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Expresiones regulares para la validación basada en el tipo de variable
    const patronEntero = /^[+-]?\d+$/;
    const patronDecimal = /^[+-]?\d+(\.\d+)?$/;
    const patronCadena = /^[A-Za-z]+$/;

    // Verificar el formato del valor basado en el tipo de variable
    let esValorValido = true;
    switch (tipoVariable) {
        case 'int':
            esValorValido = patronEntero.test(valorVariable);
            break;
        case 'double':
            esValorValido = patronDecimal.test(valorVariable) && valorVariable.includes('.');
            break;
        case 'String':
            esValorValido = patronCadena.test(valorVariable);
            valorVariable = `"${valorVariable}"`;
            break;
        default:
            break;
    }

    if (!esValorValido) {
        // Mostrar un mensaje de advertencia por formato de valor incorrecto
        swal({
            title: 'Formato Incorrecto',
            text: `El formato del valor de ${tipoVariable} es incorrecto.`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Si el formato del valor es correcto, agregar la variable al área de texto
    const entradaVariable = `${tipoVariable} ${nombreVariable} = ${valorVariable};`;
    document.getElementById('variablesCargados').value += entradaVariable + '\n';

    // Agregar el nombre de la variable a la lista de nombres de variables utilizados
    nombresVariablesUsados.push(nombreVariable);

    // Borrar los campos del formulario después de agregar la variable
    document.getElementById('variableNombre').value = '';
    document.getElementById('variableValor').value = '';

    nombresVariables.push(nombreVariable);

    // Llamar a la función de alternar después de agregar la variable para actualizar el estado del botón "Guardar Variables"
    actualizarBotonGuardarVariables();
});

// Evento para el botón "Guardar Variables"
document.getElementById('guardarVariablesBtn').addEventListener('click', function () {

    // Si el usuario hace clic en el botón "Guardar Variables", agregar las variables al área de texto principal
    const variablesGuardadas = document.getElementById('variablesCargados').value;

    // Dividir el contenido del área de texto en líneas individuales
    const lineasVariables = variablesGuardadas.trim().split('\n');

    // Generar código de declaración de variables para cada línea
    const declaracionesVariables = lineasVariables.map((linea) => {
        const indiceAsignacion = linea.indexOf('=');
        if (indiceAsignacion !== -1) {
            const nombreVariable = linea.slice(0, indiceAsignacion).trim();
            const declaracionVariable = nombreVariable + ' = ' + linea.slice(indiceAsignacion + 1).trim();
            return declaracionVariable;
        } else {
            return linea.trim();
        }
    });

    // Llamar a la función crearCodigoVariables() para generar el código de variables
    const codigoVariables = crearCodigoVariables(declaracionesVariables);

    if (codigoVariables !== null) {

        // Insertar la declaración de variable en la línea clicada o dentro del procedimiento
        agregarVariableEnLineaClicadaOInsertarEnProcedimiento(codigoVariables);

        // Cerrar el modal después de guardar las variables
        const modal = document.getElementById('variablesModal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();

        // Mostrar un mensaje de éxito utilizando SweetAlert
        swal({
            title: 'Variables guardadas!',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    }
});

// Función para llenar los menús desplegables en el modal "SI" con los nombres de las variables
function llenarNombresVariables() {
    // Obtener los valores seleccionados en el modal "SI"
    const atributo1 = document.getElementById('attribute1');
    const atributo2 = document.getElementById('attribute2');

    // Borrar las opciones existentes
    atributo1.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';
    atributo2.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';

    // Llenar los menús desplegables con los nombres de las variables del arreglo
    for (const nombre of nombresVariables) {
        const opcion = document.createElement('option');
        opcion.value = nombre;
        opcion.textContent = nombre;
        opcion.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        atributo1.appendChild(opcion);

        const opcion2 = document.createElement('option');
        opcion2.value = nombre;
        opcion2.textContent = nombre;
        opcion2.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        atributo2.appendChild(opcion2);
    }
}

// Función para llenar los menús desplegables en el modal "MIENTRAS" con los nombres de las variables
function llenarNombresVariablesMientras() {
    // Obtener los valores seleccionados en el modal "MIENTRAS"
    const atributo1Mientras = document.getElementById('attribute1While');
    const atributo2Mientras = document.getElementById('attribute2While');

    // Borrar las opciones existentes
    atributo1Mientras.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';
    atributo2Mientras.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';

    // Llenar los menús desplegables con los nombres de las variables del arreglo (asumiendo que tienes un arreglo nombresVariablesMientras)
    for (const nombre of nombresVariables) {
        const opcion = document.createElement('option');
        opcion.value = nombre;
        opcion.textContent = nombre;
        opcion.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Establecer el color de fondo
        atributo1Mientras.appendChild(opcion);

        const opcion2 = document.createElement('option');
        opcion2.value = nombre;
        opcion2.textContent = nombre;
        opcion2.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Establecer el color de fondo
        atributo2Mientras.appendChild(opcion2);
    }
}

// Cuando se abre el modal, actualizar el estado del botón "Guardar Variables"
document.getElementById('variablesModal').addEventListener('show.bs.modal', function () {
    borrarAreaTextoVariables();
    actualizarBotonGuardarVariables();
});

document.getElementById('siModal').addEventListener('show.bs.modal', function () {
    llenarNombresVariables();
});

// Llamar a las funciones cuando se hace clic en el botón "MIENTRAS"
document.getElementById('mientrasModal').addEventListener('show.bs.modal', function () {
    llenarNombresVariablesMientras(); // Llamada para el modal "MIENTRAS"
});
