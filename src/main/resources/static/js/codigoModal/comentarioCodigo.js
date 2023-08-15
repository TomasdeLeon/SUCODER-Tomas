// Function to handle the "Guardar Comentario" button click
  function saveComment() {
    const commentMessage = document.getElementById('mensajeComentado').value;

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

    addCommentToProcedure(commentMessage); // Pass the comment message as an argument to the function
  }

  // Function to update the procedure with the entered message
  function addCommentToProcedure(commentMessage) {
    const variablesGuardados = document.getElementById('variablesCargados').value;
    const commentStructure = `//${commentMessage}`;

    // Construct the procedure with the entered message and comment
    const formattedProcedure = `public static void main(String[] args) {\n${variablesGuardados}\n${ifStructure}\n${whileStructure}\n\n${messageStructure}\n\n${commentStructure}\n\n}`;

    // Update the maintextarea with the complete procedure
    const maintextarea = document.getElementById('maintextarea');
    maintextarea.value = formattedProcedure;

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