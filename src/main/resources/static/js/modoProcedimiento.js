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
      const userNameElement = document.getElementById('userName');
      userNameElement.innerHTML = sessionName ? `<i class='bx bxs-user'></i> ${sessionName}` : 'Usuario Desconocido';

      modoMensaje.innerHTML = '<i class="bx bx-dumbbell" style="font-size: 2.15rem;"></i>';
    } else if (modo === 'Libre') {
      const userNameElement = document.getElementById('userName');
      userNameElement.innerHTML = sessionName ? `<i class='bx bxs-user'></i> ${sessionName}` : 'Usuario Desconocido';

      modoMensaje.innerHTML = '<i class="bx bx-compass" style="font-size: 2.15rem;"></i>';
    }
  }

  // Handle "Modo Ejercicio" link and button visibility
  const exerciseName = urlParams.get('exerciseName');
  const crearProcedimientoLink = document.getElementById('crearProcedimientoLink');

  if (modo === 'Ejercicio') {
    // If in "Modo Ejercicio," construct the link with exercise details
    const encodedExerciseName = encodeURIComponent(exerciseName);
    const encodedExerciseDescription = encodeURIComponent(exerciseDescription);
    crearProcedimientoLink.href = `procedimiento.html?modo=Ejercicio&exerciseName=${encodedExerciseName}&exerciseDescription=${encodedExerciseDescription}`;
  } else {
    // If in "Modo Libre" or other modes, set a default link
    crearProcedimientoLink.href = 'procedimiento.html';

    // Hide the "Ver Letra" button with id 'verLetraButton'
    verLetraButton.style.display = 'none';
  }