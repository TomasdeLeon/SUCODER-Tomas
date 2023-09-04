// Function to create code for the COMENTARIO component
function createComentarioCode(commentMessage) {
  // Construct the code for the COMENTARIO component
  const comentarioCode = `// ${commentMessage}`;
  return comentarioCode;
}

// Function to handle the "Guardar Comentario" button click
function saveComment() {
  let commentMessage = document.getElementById('mensajeComentado').value;

  // Check if the comment is not empty
  if (commentMessage.trim() === "") {
    // Show a warning message using SweetAlert
    swal({
      title: "Error",
      text: "Por favor ingrese un comentario.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  // Create the COMENTARIO code using the comment message
  const comentarioCode = createComentarioCode(commentMessage);

  // Get the existing content of the maintextarea
  const maintextarea = document.getElementById('maintextarea');
  const existingContent = maintextarea.value;

  // Find the position of the last closing curly brace in the existing content
  const lastClosingBraceIndex = maintextarea.value.lastIndexOf('}');

  // Insert the generated comentario code using the generalized function
  const updatedContent = insertCodeAtLocation(existingContent, comentarioCode, clickedLineNumber, lastClosingBraceIndex);

  // Update the maintextarea with the new content
  maintextarea.value = updatedContent;

  const modal = document.getElementById('comentarModal');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  // Show a success message using SweetAlert
  swal({
    title: 'Mensaje guardado correctamente!',
    icon: 'success',
    confirmButtonText: 'OK',
  });
}

// Add an event listener to the "Guardar Comentario" button
document.getElementById('guardarComentarioBtn').addEventListener('click', function () {
  saveComment(); // Call the function to save the comment
});