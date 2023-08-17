// Create an array to store the names of the variables
const variableNames = [];

// Function to toggle the visibility and disabled state of the "Guardar Variables" button
function updateGuardarVariablesButton() {
    const variablesCargadosValue = document.getElementById('variablesCargados').value.trim();
    const guardarVariablesBtn = document.getElementById('guardarVariablesBtn');
    guardarVariablesBtn.disabled = variablesCargadosValue === ''; // Disable the button if the textarea is empty
}

// Function to create code for declaring variables
function createVariablesCode(variableDeclarations) {
    // Construct the code for declaring the variables
    const variableCode = variableDeclarations.join('\n');

    return variableCode;
}

// Add an input event listener to the variablesCargados textarea to trigger the toggle function
document.getElementById('variablesCargados').addEventListener('input', updateGuardarVariablesButton);

// Event listener for "Cargar Variables" button
document.getElementById('cargarVariablesBtn').addEventListener('click', function () {
    const variableNombre = document.getElementById('variableNombre').value;
    const variableTipo = document.getElementById('variableTipo').value;
    const variableValor = document.getElementById('variableValor').value;

    // Check if all fields are filled
    if (!variableNombre || !variableTipo || !variableValor) {
        // Show warning message for incomplete inputs
        swal({
            text: 'Por favor, complete todos los campos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return; // Exit the function without adding the variable
    }

    // Regular expressions for validation based on variable type
    const intPattern = /^[+-]?\d+$/;
    const doublePattern = /^[+-]?\d+(\.\d+)?$/;
    const stringPattern = /^[A-Za-z]+$/;

    // Check the value format based on the variable type
    let isValidValue = true;
    switch (variableTipo) {
        case 'int':
            isValidValue = intPattern.test(variableValor);
            break;
        case 'double':
            isValidValue = doublePattern.test(variableValor) && variableValor.includes('.');
            break;
        case 'String':
            isValidValue = stringPattern.test(variableValor);
            break;
        // Add more cases for other variable types if needed
        default:
            break;
    }

    if (!isValidValue) {
        // Show warning message for incorrect value format
        swal({
            title: 'Formato Incorrecto',
            text: `El formato del valor de ${variableTipo} es incorrecto.`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return; // Exit the function without adding the variable
    }

    const variableName = document.getElementById('variableNombre').value;
        const variableType = document.getElementById('variableTipo').value;
        const variableValue = document.getElementById('variableValor').value;

    // If the value format is correct, add the variable to the textarea
    const variableEntry = `${variableType} ${variableNombre} = ${variableValor};`;
    document.getElementById('variablesCargados').value += variableEntry + '\n';

    // Clear the form fields after adding the variable
    document.getElementById('variableNombre').value = '';
    document.getElementById('variableValor').value = '';

    variableNames.push(variableNombre);

    // Call the toggle function after adding the variable to update the "Guardar Variables" button
    updateGuardarVariablesButton();
});

// Event listener for "Guardar Variables" button
document.getElementById('guardarVariablesBtn').addEventListener('click', function () {
    // If the user clicks the "Guardar Variables" button, append the variables to the main textarea
    const variablesGuardados = document.getElementById('variablesCargados').value;

    // Split the textarea content into individual lines
    const variableLines = variablesGuardados.trim().split('\n');

    // Generate variable declaration code for each line
        const variableDeclarations = variableLines.map((line) => {
            const assignmentIndex = line.indexOf('=');
            if (assignmentIndex !== -1) {
                const variableName = line.slice(0, assignmentIndex).trim();
                const variableDeclaration = variableName + ' = ' + line.slice(assignmentIndex + 1).trim();
                return variableDeclaration;
            } else {
                return line.trim(); // Handle lines without assignments (e.g., comments)
            }
        });

    // Call createVariablesCode() to generate the variable code
    const variableCode = createVariablesCode(variableDeclarations);

    if (variableCode !== null) {
        // Get the existing content of the maintextarea
        const maintextarea = document.getElementById('maintextarea');
        const existingContent = maintextarea.value;

        // Find the position of the last closing curly brace in the existing content
        const lastClosingBraceIndex = existingContent.lastIndexOf('}');

        // Insert the generated code before the last closing curly brace
        const updatedContent = existingContent.slice(0, lastClosingBraceIndex) +
        '\n' + variableCode + '\n' + existingContent.slice(lastClosingBraceIndex);

        // Update the maintextarea with the updated content
        maintextarea.value = updatedContent;

        // Close the modal after saving variables
        const modal = document.getElementById('variablesModal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();

        // Show a success message using SweetAlert
        swal({
            title: 'Variables guardadas!',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    }
});

    // Function to populate the dropdowns in the "SI" modal with the names of the variables
    function refereeVariableNames() {
      // Get the values selected in the SI modal
      const attribute1Dropdown = document.getElementById('attribute1');
      const attribute2Dropdown = document.getElementById('attribute2');

      // Clear existing options
      attribute1Dropdown.innerHTML = '<option value="-">-</option>';
      attribute2Dropdown.innerHTML = '<option value="-">-</option>';

      // Populate the dropdowns with variable names from the array
      for (const name of variableNames) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        attribute1Dropdown.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = name;
        option2.textContent = name;
        attribute2Dropdown.appendChild(option2);
      }
    }

    // Function to populate the dropdowns in the "MIENTRAS" modal with the names of the variables
    function refereeVariableNamesMientras() {
      // Get the values selected in the MIENTRAS modal
      const attribute1WhileDropdown = document.getElementById('attribute1While');
      const attribute2WhileDropdown = document.getElementById('attribute2While');

      // Clear existing options
      attribute1WhileDropdown.innerHTML = '<option value="-">-</option>';
      attribute2WhileDropdown.innerHTML = '<option value="-">-</option>';

      // Populate the dropdowns with variable names from the array (assuming you have a variableNamesMientras array)
      for (const name of variableNames) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        attribute1WhileDropdown.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = name;
        option2.textContent = name;
        attribute2WhileDropdown.appendChild(option2);
      }
    }

    // When the modal is opened, update the "Guardar Variables" button state
    document.getElementById('variablesModal').addEventListener('show.bs.modal', function () {
        updateGuardarVariablesButton();
    });

    document.getElementById('siModal').addEventListener('show.bs.modal', function () {
        refereeVariableNames();
    });

    // Call the functions when the "MIENTRAS" button is clicked
      document.getElementById('mientrasModal').addEventListener('show.bs.modal', function () {
        refereeVariableNamesMientras(); // Call for MIENTRAS modal
    });
