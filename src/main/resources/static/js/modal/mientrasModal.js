// Function to enable or disable the "Siguiente" button based on the selected values of "Variable 1" and "Variable 2" in the MIENTRAS modal
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

// Function to dynamically populate the attribute dropdown in "Definir Incremento o Decremento" modal
document.getElementById("modalIncrementDecrement").addEventListener("show.bs.modal", function () {
  // Get the available attributes from the "MIENTRAS" modal
  const attribute1ValueWhile = document.getElementById("attribute1While").value;
  const attribute2ValueWhile = document.getElementById("attribute2While").value;

  // Populate the attribute dropdown in the "Definir Incremento o Decremento" modal
  const attributeDropdown = document.getElementById("attributeDropdown");
  attributeDropdown.innerHTML = `
    <option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>
    <option value="${attribute1ValueWhile}" style="background-color: rgba(0, 0, 0, 0.8);">${attribute1ValueWhile}</option>
    <option value="${attribute2ValueWhile}" style="background-color: rgba(0, 0, 0, 0.8);">${attribute2ValueWhile}</option>
  `;

  // Disable the "Aceptar" button initially when the modal is shown
  const aceptarButton = document.getElementById("aceptarButton");
  aceptarButton.disabled = true;
});

// Add an event listener to the attribute dropdown
document.getElementById("attributeDropdown").addEventListener("change", function () {
  // Get the selected value
  const selectedValue = this.value; // Use "this" to refer to the attributeDropdown

  // Get the "Aceptar" button by its id
  const aceptarButton = document.getElementById("aceptarButton");

  // Check if the selected value is '-'
  if (selectedValue === '-') {
    // Disable the "Aceptar" button
    aceptarButton.disabled = true;
  } else {
    // Enable the "Aceptar" button
    aceptarButton.disabled = false;
  }
});

// Add an event listener to the "Siguiente" button in the "MIENTRAS" modal
document.getElementById("siguienteButton").addEventListener("click", function () {
  // Get the values of "Variable 1" and "Variable 2" selected in the "MIENTRAS" modal
  const attribute1ValueWhile = document.getElementById("attribute1While").value;
  const attribute2ValueWhile = document.getElementById("attribute2While").value;
  const comparisonOperation2Value = document.getElementById("comparisonOperation2").value;

  // Rest of your code for handling the "Siguiente" button click...
});

// Function to create code for the MIENTRAS component
function createMientrasCode(attribute1While, attribute2While, comparisonOperation2, messageWhileValue, selectedAttribute, incrementDecrementValue) {

  // Construct the code for the MIENTRAS component
  let mientrasCode = `while (${attribute1While} ${comparisonOperation2} ${attribute2While}) {\n`;
  mientrasCode += `  System.out.println("${messageWhileValue}");\n`; // Code to execute while the condition is true

  // Check if an Increment or Decrement is selected for the selected attribute
  if (incrementDecrementValue === '++') {
    mientrasCode += `  ${selectedAttribute}++;\n`;
  } else if (incrementDecrementValue === '--') {
    mientrasCode += `  ${selectedAttribute}--;\n`;
  }

  mientrasCode += `}`;

  return mientrasCode;
}

// Function to handle the "Guardar Condición 'MIENTRAS'" button click
function saveWhileCondition() {
  // Get the values selected in the MIENTRAS modal
  const attribute1WhileValue = document.getElementById('attribute1While').value;
  const attribute2WhileValue = document.getElementById('attribute2While').value;
  const comparisonOperation2Value = document.getElementById('comparisonOperation2').value;

  // Get the message from the "Imprimir Mensaje" modal
  const messageWhileValue = document.getElementById('messageWhile').value;

  // Get the selected value from the Increment/Decrement dropdown
  const attributeDropdownValue = document.getElementById('attributeDropdown').value;

  // Check if message is not empty
  if (messageWhileValue.trim() === "") {
    // Show a warning message using SweetAlert
    swal({
      title: "Error",
      text: "Por favor ingrese un mensaje.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return; // Exit the function without generating the while structure
  }

  // Check if Increment/Decrement option is not selected (assuming '-' is the default value)
  if (attributeDropdownValue === '-') {
    // Show a warning message using SweetAlert for the Increment/Decrement
    swal({
      title: "Error",
      text: "Por favor seleccione un Incremento o Decremento.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return; // Exit the function without generating the while structure
  }

  // Get the selected Increment/Decrement value from the corresponding dropdown
  const incrementDecrementValue = document.getElementById('incrementDecrementDropdown').value;

  // Construct the while loop structure based on the user inputs using createMientrasCode()
  const whileStructureCode = createMientrasCode(
    attribute1WhileValue,
    attribute2WhileValue,
    comparisonOperation2Value,
    messageWhileValue,
    attributeDropdownValue,
    incrementDecrementValue
  );

  // Get the existing procedure name and variables from the variablesModal
  const variablesGuardados = document.getElementById('variablesCargados').value;

  // Get the existing content of the maintextarea
  const maintextarea = document.getElementById('maintextarea');

  // Find the position of the last closing curly brace in the existing content
  const lastClosingBraceIndex = maintextarea.value.lastIndexOf('}');

  // Insert the generated while structure code either at the clicked line or after the last closing curly brace
  const updatedContent = insertCodeAtLocation(maintextarea.value, whileStructureCode, clickedLineNumber, lastClosingBraceIndex);

  // After generating code, format the maintextarea
  formatCodeInTextarea();

  // Update the maintextarea with the complete procedure
  maintextarea.value = updatedContent;

  // Close the "condicionWhileModal" (optional)
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


// Add an event listener to the "Guardar Condicion MIENTRAS" button
document.getElementById('guardarCondicionWhile').addEventListener('click', function () {
  saveWhileCondition(); // Call the function to save the while condition
});

