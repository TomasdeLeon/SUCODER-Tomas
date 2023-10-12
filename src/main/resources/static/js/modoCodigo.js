function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to retrieve exercise description from URL
  function getExerciseDescription() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('exerciseDescription');
  }

  // Get the exercise description
  const exerciseDescription = getExerciseDescription();

  // Set the exercise description in the textarea
  const descripcionTextarea = document.getElementById('descripcion');
  if (exerciseDescription) {
    descripcionTextarea.value = exerciseDescription;
  }

  // Attach a click event handler to the "Ver Letra" button
  const verLetraButton = document.getElementById('verLetraButton');
  verLetraButton.addEventListener('click', function () {
    // Show the modal
    $('#descripcionModal').modal('show');
  });

  // JavaScript to populate the mode message based on URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const modo = urlParams.get('modo');

  // Get the session name from the query parameter
  const sessionName = getQueryParam('sesion');

  if (modo) {
    const modoMensaje = document.getElementById('modoMensaje');
    if (modo === 'Ejercicio') {
      const userNameElement = document.getElementById('userName');
      userNameElement.innerHTML = sessionName ? `<i class='bx bxs-user'></i> ${sessionName}` : 'Usuario Desconocido';

      modoMensaje.innerHTML = '<i class="bx bx-dumbbell" style="font-size: 2.15rem;"></i>';
    } else if (modo === 'Libre') {
      const userNameElement = document.getElementById('userName');
      userNameElement.innerHTML = sessionName ? `<i class='bx bxs-user'></i> ${sessionName}` : 'Usuario Desconocido';

      modoMensaje.innerHTML = '<i class="bx bx-compass" style="font-size: 2.15rem;"></i>';
    }
  }

  // Modify the link to procedimiento.html and codigo.html based on mode
  const exerciseName = urlParams.get('exerciseName');
  let procedimientoLink = '';
  let codigoLink = '';
  const solucionButtonDiv = document.getElementById('solucionButtonDiv');

  if (modo === 'Ejercicio') {
    procedimientoLink = `procedimiento.html?modo=${modo}&sesion=${encodeURIComponent(sessionName)}&exerciseName=${encodeURIComponent(exerciseName)}&exerciseDescription=${encodeURIComponent(exerciseDescription)}`;
    codigoLink = `codigo.html?modo=${modo}&sesion=${encodeURIComponent(sessionName)}&exerciseName=${encodeURIComponent(exerciseName)}&exerciseDescription=${encodeURIComponent(exerciseDescription)}`;

    // Show the "Mostrar Solución" button
    solucionButtonDiv.style.display = 'block';

    // Add a line break after the "Mostrar Solución" button
    solucionButtonDiv.insertAdjacentHTML('afterend', '<br><br>');
  } else {
    procedimientoLink = `procedimiento.html?modo=${modo}&sesion=${encodeURIComponent(sessionName)}`;
    codigoLink = `codigo.html?modo=${modo}&sesion=${encodeURIComponent(sessionName)}`;

    // Hide the "Ver Letra" button with id 'verLetraButton'
    verLetraButton.style.display = 'none';
    // Hide the "Mostrar Solución" button
    solucionButtonDiv.style.display = 'none';
  }

  // Set the href attributes of the dropdown buttons
  document.getElementById('procedimientoLink').setAttribute('href', procedimientoLink);
  document.getElementById('codigoLink').setAttribute('href', codigoLink);