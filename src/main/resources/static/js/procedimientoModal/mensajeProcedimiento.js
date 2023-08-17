// Function to create code for the IMPRIMIR component
function createImprimirCode() {
  // Get the IMPRIMIR component data from the modal fields
  const imprimirMensaje = document.getElementById('imprimirMensaje').value;

  // Check if the message is empty
  if (imprimirMensaje.trim() === "") {
    // Show error message
    swal({
      title: "Error",
      text: "Por favor ingrese un mensaje.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null; // Return null to indicate an error
  }

  // Construct the code for the IMPRIMIR component
  const imprimirCode = `System.out.println("${imprimirMensaje}");`;

  // Show a success message using SweetAlert
  swal({
    title: 'Mensaje guardado correctamente!',
    icon: 'success',
    confirmButtonText: 'OK',
  });

  return imprimirCode; // Return the generated code
}

// Add an event listener to the "Guardar Mensaje" button
const guardarMensajeButton = document.getElementById('guardarMensajeButton');
guardarMensajeButton.addEventListener('click', function() {
  const imprimirCode = createImprimirCode();

  if (imprimirCode !== null) {
    // Get the existing content of the maintextarea
    const maintextarea = document.getElementById('maintextarea');
    const existingContent = maintextarea.value;

    // Find the position of the last closing curly brace in the existing content
    const lastClosingBraceIndex = existingContent.lastIndexOf('}');

    // Insert the generated code before the last closing curly brace
    const updatedContent = existingContent.slice(0, lastClosingBraceIndex) +
      '\n' + imprimirCode + '\n' + existingContent.slice(lastClosingBraceIndex);

    // Update the maintextarea with the updated content
    maintextarea.value = updatedContent;

    // Hide the modal
    const modal = document.getElementById('imprimirModal');
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    // Show a success message using SweetAlert
        swal({
          title: 'Mensaje guardado correctamente!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
  }
});