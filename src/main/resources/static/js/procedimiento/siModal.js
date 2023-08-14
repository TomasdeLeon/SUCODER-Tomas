// Function to enable or disable the "Siguiente" button based on the selected values of "Variable 1" and "Variable 2"
function toggleSiguienteButton() {
  const attribute1Value = document.getElementById("attribute1").value;
  const attribute2Value = document.getElementById("attribute2").value;
  const siguienteButton = document.querySelector("#siModal .modal-footer button");

  if (attribute1Value !== "-" && attribute2Value !== "-") {
    siguienteButton.disabled = false;
  } else {
    siguienteButton.disabled = true;
  }
}

// Call the function when the modal is shown (e.g., after clicking the "SI" button)
document.getElementById("siModal").addEventListener("shown.bs.modal", function () {
  toggleSiguienteButton();
});

// Call the function whenever "Variable 1" or "Variable 2" selection changes
document.getElementById("attribute1").addEventListener("change", function () {
  toggleSiguienteButton();
});

document.getElementById("attribute2").addEventListener("change", function () {
  toggleSiguienteButton();
});

let trueConditionStatements = '';
let falseConditionStatements = '';

// Function to check the condition based on the selected values and operator
function checkCondition(attribute1Value, attribute2Value, comparisonOperation) {
  // Your logic to check the condition and return a boolean value
  // For example:
  switch (comparisonOperation) {
    case "==":
      return attribute1Value == attribute2Value;
    case "!=":
      return attribute1Value != attribute2Value;
    case ">":
      return attribute1Value > attribute2Value;
    case ">=":
      return attribute1Value >= attribute2Value;
    case "<":
      return attribute1Value < attribute2Value;
    case "<=":
      return attribute1Value <= attribute2Value;
    default:
      return false;
  }
}

// Define the ifStructure variable at the global scope
let ifStructure = '';

// Function to handle the "Guardar Condición 'SI'" button click
function generateIfStructure() {
  const attribute1Value = document.getElementById("attribute1").value;
  const attribute2Value = document.getElementById("attribute2").value;
  const comparisonOperation = document.getElementById("comparisonOperation").value;

  // Your logic to check the condition based on the selected values and operator
  const conditionMet = checkCondition(attribute1Value, attribute2Value, comparisonOperation);

  // Get the true and false messages from the input fields
  trueConditionStatements = document.getElementById("trueConditionStatements").value;
  falseConditionStatements = document.getElementById("falseConditionStatements").value;

  // Check if both true and false condition messages are not empty
  if (trueConditionStatements.trim() === "" && falseConditionStatements.trim() === "") {
    // Show a warning message using SweetAlert
    swal({
      title: "Error",
      text: "Por favor ingrese por lo menos un mensaje.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return; // Exit the function without generating the if structure
  }

  // Generate the if structure based on the condition
    ifStructure = conditionMet
      ? `if (${attribute1Value} ${comparisonOperation} ${attribute2Value}) {\n  System.out.println("${trueConditionStatements}");\n} else {\n  System.out.println("${falseConditionStatements}");\n}\n`
      : `if (${attribute1Value} ${comparisonOperation} ${attribute2Value}) {\n  System.out.println("${falseConditionStatements}");\n} else {\n  System.out.println("${trueConditionStatements}");\n}\n`;

  // Get the existing procedure name and variables from the variablesModal
  const procedureName = document.getElementById("procedureName").value;
  const variablesGuardados = document.getElementById("variablesCargados").value;

  // Concatenate the existing procedure and variables with the if structure
  const formattedProcedure = `public void ${procedureName}() {\n${variablesGuardados}\n${ifStructure}\n}`;

  // Update the maintextarea with the complete procedure
  const maintextarea = document.getElementById("maintextarea");
  maintextarea.value = formattedProcedure;

  // Close the "Imprimir" modals (optional)
  const modalVerdadero = document.getElementById("modalVerdadero");
  const modalFalso = document.getElementById("modalFalso");

  const modal = document.getElementById('exampleModalToggle2');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  // Show a success message using SweetAlert
  swal({
    title: 'Condición SI guardada correctamente!',
    icon: 'success',
    confirmButtonText: 'OK',
  });
}

// Add an event listener to the "Guardar Condicion Si" button
document.getElementById("guardarCondicionSiBtn").addEventListener("click", function () {
  generateIfStructure(); // Call the function to generate the if structure
});