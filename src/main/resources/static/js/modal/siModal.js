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

// Function to create code for the SI component
function createSiCode(attribute1, attribute2, comparisonOperation, trueConditionStatements, falseConditionStatements) {
  // Get the SI component data from the modal fields
  const attribute1Input = document.getElementById('attribute1').value;
  const attribute2Input = document.getElementById('attribute2').value;

  let siCode = `if (${attribute1} ${comparisonOperation} ${attribute2}) {\n`;
  siCode += `  System.out.println("${trueConditionStatements}");\n`; // Code to execute when the condition is true
  siCode += "} else {\n";
  siCode += `  System.out.println("${falseConditionStatements}");\n`; // Code to execute when the condition is false
  siCode += "}";

  return siCode;
}

// Function to insert code at a specific location
function insertCodeAtLocation(existingContent, codeToInsert, clickedLineNumber, lastClosingBraceIndex) {
    const textarea = document.getElementById('maintextarea');
    const currentContent = existingContent;

    if (clickedLineNumber !== -1 && clickedLineNumber < currentContent.split('\n').length) {
        // Insert the code at the clicked line
        const lines = currentContent.split('\n');
        lines.splice(clickedLineNumber - 1, 0, '');
        lines.splice(clickedLineNumber, 0, codeToInsert, '');
        return lines.join('\n');
    } else if (lastClosingBraceIndex !== -1) {
        // Insert the code after the last closing curly brace
        return currentContent.slice(0, lastClosingBraceIndex) +
            '\n' + codeToInsert + '\n' +
            currentContent.slice(lastClosingBraceIndex);
    } else {
        // If there is no closing curly brace and no line is clicked, simply add the code at the start of the code
        return codeToInsert + '\n' + currentContent;
    }
}

// Function to format the code in maintextarea
function formatCodeInTextarea() {
  // Get the content of the maintextarea
  const textarea = document.getElementById('maintextarea');
  const code = textarea.value;

  // Split the code into lines and trim each line
  const lines = code.split('\n').map(line => line.trim());

  // Create an indentation level variable
  let indentationLevel = 0;

  // Initialize the formatted code as an empty string
  let formattedCode = '';

  // Iterate through the lines of code
  for (let line of lines) {
    // Remove any existing leading indentation
    line = line.trimStart();

    // Add the appropriate indentation based on the level
    for (let i = 0; i < indentationLevel; i++) {
      formattedCode += '  '; // You can adjust the number of spaces per level
    }

    // Add the line to the formatted code
    formattedCode += line + '\n';

    // Adjust the indentation level based on the code structure
    if (line.includes('{')) {
      indentationLevel++;
    } else if (line.includes('}')) {
      indentationLevel--;
    }
  }

  // Update the maintextarea with the formatted code
  textarea.value = formattedCode;
}

// Function to handle the "Guardar Condición 'SI'" button click
function generateIfStructure() {
  // Get the SI component data from the modal fields
  const attribute1Value = document.getElementById("attribute1").value;
  const attribute2Value = document.getElementById("attribute2").value;
  const comparisonOperation = document.getElementById("comparisonOperation").value;

  // Your logic to check the condition based on the selected values and operator
  const conditionMet = checkCondition(attribute1Value, attribute2Value, comparisonOperation);

  // Get the true and false messages from the input fields
  const trueConditionStatements = document.getElementById("trueConditionStatements").value;
  const falseConditionStatements = document.getElementById("falseConditionStatements").value;

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

  // Generate the if structure based on the condition using createSiCode()
  const ifStructureCode = createSiCode(attribute1Value, attribute2Value, comparisonOperation, trueConditionStatements, falseConditionStatements);

  // Get the existing content of the maintextarea
  const maintextarea = document.getElementById("maintextarea");

  // Find the position of the last closing curly brace in the existing content
  const lastClosingBraceIndex = maintextarea.value.lastIndexOf('}');

  // Insert the generated if structure code either at the clicked line or after the last closing curly brace
  const updatedContent = insertCodeAtLocation(maintextarea.value, ifStructureCode, clickedLineNumber, lastClosingBraceIndex);

  // After generating code, format the maintextarea
  formatCodeInTextarea();

  // Update the maintextarea with the complete procedure
  maintextarea.value = updatedContent;

  // Close the "Imprimir" modals (optional)
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