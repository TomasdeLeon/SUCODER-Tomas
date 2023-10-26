// Función para obtener y mostrar la solución del ejercicio
function mostrarSolucion() {
    // Reemplaza esto con la solución real del ejercicio
    const solucionEjercicio = "// Reemplaza esto con la solución del ejercicio\n";

    // Obtén el contenido actual del área de texto principal
    const mainTextarea = document.getElementById('maintextarea');
    const contenidoActual = mainTextarea.value;

    // Combina el contenido actual con la solución del ejercicio
    const nuevoContenido = `${contenidoActual}\n${solucionEjercicio}`;

    // Establece el contenido actualizado en el área de texto
    mainTextarea.value = nuevoContenido;
}

// Adjunta un event listener al botón "Mostrar Solución"
const botonMostrarSolucion = document.getElementById('mostrarSolucionButton');
botonMostrarSolucion.addEventListener('click', mostrarSolucion);
