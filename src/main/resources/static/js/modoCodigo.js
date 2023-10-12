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
  if (modo) {
    const modoMensaje = document.getElementById('modoMensaje');
    if (modo === 'Ejercicio') {
      modoMensaje.innerHTML = '<i class="bx bx-dumbbell" style="font-size: 2.15rem;"></i>';
    } else if (modo === 'Libre') {
      modoMensaje.innerHTML = '<i class="bx bx-compass" style="font-size: 2.15rem;"></i>';
    }
  }

  // Handle "Modo Ejercicio" link and button visibility
  const exerciseName = urlParams.get('exerciseName');
  const crearProcedimientoLink = document.getElementById('crearProcedimientoLink');
  const solucionButtonDiv = document.getElementById('solucionButtonDiv');

  if (modo === 'Ejercicio') {
    // If in "Modo Ejercicio," construct the link with exercise details
    const encodedExerciseName = encodeURIComponent(exerciseName);
    const encodedExerciseDescription = encodeURIComponent(exerciseDescription);
    crearProcedimientoLink.href = `procedimiento.html?modo=Ejercicio&exerciseName=${encodedExerciseName}&exerciseDescription=${encodedExerciseDescription}`;

    // Show the "Mostrar Solución" button
    solucionButtonDiv.style.display = 'block';

    // Add a line break after the "Mostrar Solución" button
    solucionButtonDiv.insertAdjacentHTML('afterend', '<br><br><br>');
  } else {
    // If in "Modo Libre" or other modes, set a default link
    crearProcedimientoLink.href = 'procedimiento.html';

    // Hide the "Ver Letra" button with id 'verLetraButton'
    verLetraButton.style.display = 'none';

    // Hide the "Mostrar Solución" button
    solucionButtonDiv.style.display = 'none';
  }