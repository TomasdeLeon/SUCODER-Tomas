let messageStructure = '';

// Function to handle the "Guardar Mensaje" button click
  function saveMessage() {
    const message = document.getElementById('imprimirMensaje').value;

    // Check if the message is not empty
    if (message.trim() === "") {
      // Show a warning message using SweetAlert
      swal({
        title: "Error",
        text: "Por favor ingrese un mensaje.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    addMessageToProcedure(message); // Pass the message as an argument to the function
  }

  // Function to update the procedure with the entered message
  function addMessageToProcedure(message) {
    const procedureName = document.getElementById('procedureName').value;
    const variablesGuardados = document.getElementById('variablesCargados').value;

    messageStructure = `System.out.println("${message}");`;

    // Construct the procedure with the entered message
    const formattedProcedure = `public void ${procedureName}() {\n${variablesGuardados}\n${ifStructure}\n${whileStructure}\n\n${messageStructure}\n}`;

    // Update the maintextarea with the complete procedure
    const maintextarea = document.getElementById('maintextarea');
    maintextarea.value = formattedProcedure;

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