function toggleSiguienteWhile() {
  const attribute1ValueWhile = document.getElementById("attribute1While").value;
  const attribute2ValueWhile = document.getElementById("attribute2While").value;
  const siguienteButtonWhile = document.getElementById("siguienteButton");

  // For the "MIENTRAS" modal
  if (attribute1ValueWhile !== "-" && attribute2ValueWhile !== "-") {
    siguienteButtonWhile.disabled = false;
  } else {
    siguienteButtonWhile.disabled = true;
  }
}

// Call the function when the modal is shown (e.g., after clicking the "MIENTRAS" button)
document.getElementById("mientrasModal").addEventListener("shown.bs.modal", function () {
  toggleSiguienteWhile();
});


// Add event listeners to the dropdowns in the "MIENTRAS" modal to trigger the toggleSiguienteWhile function
document.getElementById("attribute1While").addEventListener("change", function () {
  toggleSiguienteWhile();
});

document.getElementById("attribute2While").addEventListener("change", function () {
  toggleSiguienteWhile();
});

// Add an event listener to the "Siguiente" button in the "MIENTRAS" modal
document.getElementById("siguienteButton").addEventListener("click", function () {
  // Get the values of "Variable 1" and "Variable 2" selected in the "MIENTRAS" modal
  const attribute1ValueWhile = document.getElementById("attribute1While").value;
  const attribute2ValueWhile = document.getElementById("attribute2While").value;
  const comparisonOperation2Value = document.getElementById("comparisonOperation2").value;

});


// Function to handle the "Guardar Condición 'MIENTRAS'" button click
function saveWhileCondition() {
  // Get the values selected in the MIENTRAS modal
  const attribute1WhileValue = document.getElementById('attribute1While').value;
  const attribute2WhileValue = document.getElementById('attribute2While').value;
  const comparisonOperation2Value = document.getElementById('comparisonOperation2').value;

  // Get the message from the "Imprimir Mensaje" modal
  const messageWhileValue = document.getElementById('messageWhile').value;

  // Check if  message is not empty
    if (messageWhileValue.trim() === "") {
      // Show a warning message using SweetAlert
      swal({
        title: "Error",
        text: "Por favor ingrese un mensaje.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Exit the function without generating the if structure
    }

  // Construct the while loop structure based on the user inputs
  if (comparisonOperation2Value === "==") {
    whileStructure = `while (${attribute1WhileValue} == ${attribute2WhileValue}) {
      System.out.println("${messageWhileValue}");
      // Increment or decrement logic based on your needs
      ${attribute1WhileValue}++; // o ${attribute1WhileValue}--;
    }`;
  } else if (comparisonOperation2Value === "!=") {
    whileStructure = `while (${attribute1WhileValue} != ${attribute2WhileValue}) {
      System.out.println("${messageWhileValue}");
      // Increment or decrement logic based on your needs
      ${attribute1WhileValue}++; // o ${attribute1WhileValue}--;
    }`;
  } else if (comparisonOperation2Value === ">") {
    whileStructure = `while (${attribute1WhileValue} > ${attribute2WhileValue}) {
      System.out.println("${messageWhileValue}");
      // Increment or decrement logic based on your needs
      ${attribute1WhileValue}++; // o ${attribute1WhileValue}--;
    }`;
  } else if (comparisonOperation2Value === "<") {
    whileStructure = `while (${attribute1WhileValue} < ${attribute2WhileValue}) {
      System.out.println("${messageWhileValue}");
      // Increment or decrement logic based on your needs
      ${attribute1WhileValue}++; // o ${attribute1WhileValue}--;
    }`;
  } else if (comparisonOperation2Value === ">=") {
    whileStructure = `while (${attribute1WhileValue} >= ${attribute2WhileValue}) {
      System.out.println("${messageWhileValue}");
      // Increment or decrement logic based on your needs
      ${attribute1WhileValue}++; // o ${attribute1WhileValue}--;
    }`;
  } else if (comparisonOperation2Value === "<=") {
    whileStructure = `while (${attribute1WhileValue} <= ${attribute2WhileValue}) {
      System.out.println("${messageWhileValue}");
      // Increment or decrement logic based on your needs
      ${attribute1WhileValue}++; // o ${attribute1WhileValue}--;
    }`;
  }

  // Concatenate the existing procedure and variables with the while loop structure and if structure
    const variablesGuardados = document.getElementById('variablesCargados').value;

    // Concatenate the existing if structure with the while loop structure
    const formattedProcedure = `public static void main(String[] args) {\n${variablesGuardados}\n${ifStructure}\n${whileStructure}\n\n${messageStructure}\n\n${commentStructure}\n\n}`;

    // Update the maintextarea with the complete procedure
    const maintextarea = document.getElementById('maintextarea');
    maintextarea.value = formattedProcedure;

    const modal = document.getElementById('condicionWhileModal');
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal.hide();

      // Show a success message using SweetAlert
      swal({
        title: 'Condición MIENTRAS guardada correctamente!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
}

// Add an event listener to the "Guardar Condición 'MIENTRAS'" button
document.getElementById("guardarCondicionWhile").addEventListener("click", function() {
  saveWhileCondition();
});