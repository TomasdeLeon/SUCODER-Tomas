// Function to extract query parameters from URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Update the mode message and exercise description
    const modo = getQueryParam('modo');
    const nombreSesion = getQueryParam('sesion'); // Get the session name from the URL

    if (modo === 'Ejercicio') {
        const exerciseName = getQueryParam('exerciseName');
        const exerciseDescription = getQueryParam('exerciseDescription');

        const userNameElement = document.getElementById('nombreUsuario');
        userNameElement.innerHTML = nombreSesion ? `<i class='bx bxs-user'></i> ${nombreSesion}` : 'Usuario Desconocido';

        // Update the "modoMensaje" element to show the exercise description
        const modoMensaje = document.getElementById('modoMensaje');
        modoMensaje.innerHTML = `<i class="bx bx-dumbbell"></i> Modo Ejercicio`;

        // Update the "descripcion" element with the exercise description
        const descripcionElement = document.getElementById('descripcion');
        descripcionElement.textContent = `${exerciseDescription}`;

        // Show the "Ver Letra" button
        const verLetraButton = document.getElementById('verLetraButton');
        verLetraButton.style.display = 'block';
    } else if (modo === 'Libre') {

        const userNameElement = document.getElementById('nombreUsuario');
        userNameElement.innerHTML = nombreSesion ? `<i class='bx bxs-user'></i> ${nombreSesion}` : 'Usuario Desconocido';

        // Update the "modoMensaje" element for "Modo Libre"
        const modoMensaje = document.getElementById('modoMensaje');
        modoMensaje.innerHTML = '<i class="bx bx-compass"></i> Modo Libre';

        // Hide the "Ver Letra" button when in "Modo Libre"
        const verLetraButton = document.getElementById('verLetraButton');
        verLetraButton.style.display = 'none';
    }

    // Modify the link to procedimiento.html and codigo.html based on mode
const urlParams = new URLSearchParams(window.location.search);
const exerciseName = urlParams.get('exerciseName');
const exerciseDescription = urlParams.get('exerciseDescription');
let procedimientoLink = '';
let codigoLink = '';

if (modo === 'Ejercicio') {
    procedimientoLink = `procedimiento.html?modo=${modo}&sesion=${encodeURIComponent(nombreSesion)}&exerciseName=${encodeURIComponent(exerciseName)}&exerciseDescription=${encodeURIComponent(exerciseDescription)}`;
    codigoLink = `codigo.html?modo=${modo}&sesion=${encodeURIComponent(nombreSesion)}&exerciseName=${encodeURIComponent(exerciseName)}&exerciseDescription=${encodeURIComponent(exerciseDescription)}`;
} else if (modo === 'Libre') {
    procedimientoLink = `procedimiento.html?modo=${modo}&sesion=${encodeURIComponent(nombreSesion)}`;
    codigoLink = `codigo.html?modo=${modo}&sesion=${encodeURIComponent(nombreSesion)}`;
}

const generarProcedimientoBtn = document.getElementById('generarProcedimientoBtn');
const generarCodigoBtn = document.getElementById('generarCodigoBtn');

generarProcedimientoBtn.href = procedimientoLink;
generarCodigoBtn.href = codigoLink;