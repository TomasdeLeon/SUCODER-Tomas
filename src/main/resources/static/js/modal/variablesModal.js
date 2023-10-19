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

// Function to clear the variables textarea
function clearVariablesTextarea() {
    document.getElementById('variablesCargados').value = '';
    variableNames.length = 0; // Clear the variable names array
    updateGuardarVariablesButton(); // Update the button state
}

// Function to get the line number where the cursor is
function getLineNumber(textarea, cursorPosition) {
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lines = textBeforeCursor.split('\n');
    return lines.length;
}

let clickedLineNumber = -1; // Initialize to -1 when no line is clicked
let clickedCursorPosition = -1; // Initialize to -1 when no line is clicked

// Event listener for clicking on a line in the textarea
document.getElementById('maintextarea').addEventListener('click', function (event) {
    const textarea = event.target;
    const cursorPosition = textarea.selectionStart;
    clickedLineNumber = getLineNumber(textarea, cursorPosition);
    clickedCursorPosition = cursorPosition;
});

// Function to add a variable declaration inside the procedure or at the clicked line
function addVariableAtClickedLineOrInsertOfProcedure(variableDeclaration) {
    const textarea = document.getElementById('maintextarea');
    const currentContent = textarea.value;

    // Find the position of the last closing curly brace '}' within the procedure
    const lastClosingBraceIndex = currentContent.lastIndexOf('}');

    if (clickedLineNumber !== -1 && clickedLineNumber < currentContent.split('\n').length) {
        // Insert the variable declaration at the clicked line
        const lines = currentContent.split('\n');
        // Insert a blank line before the clicked line
        lines.splice(clickedLineNumber - 1, 0, '');
        // Insert the variable declaration at the clicked line
        lines.splice(clickedLineNumber, 0, variableDeclaration);
        // Update the textarea with the modified content, joining lines with '\n'
        textarea.value = lines.join('\n');
    } else if (lastClosingBraceIndex !== -1) {
        // Insert the variable declaration after the last closing curly brace
        const updatedContent =
            currentContent.slice(0, lastClosingBraceIndex) +
            '\n' + variableDeclaration + '\n' +
            currentContent.slice(lastClosingBraceIndex);
        textarea.value = updatedContent;
    } else {
        // If there is no closing curly brace and no line is clicked, simply add the variable declaration at the start of the code
        textarea.value = variableDeclaration + '\n' + currentContent;
    }

    // Reset the clicked line number
    clickedLineNumber = -1;
}

// Add an input event listener to the variablesCargados textarea to trigger the toggle function
document.getElementById('variablesCargados').addEventListener('input', updateGuardarVariablesButton);

// Define a list to store used variable names
const usedVariableNames = [];
// Regular expression for variable name validation
const variableNamePattern = /^[a-z][a-zA-Z0-9]*$/;

// Event listener for "Cargar Variables" button
document.getElementById('cargarVariablesBtn').addEventListener('click', function () {
    const variableNombre = document.getElementById('variableNombre').value;
    const variableTipo = document.getElementById('variableTipo').value;
    let variableValor = document.getElementById('variableValor').value;

    // Check if all fields are filled
    if (!variableNombre || !variableTipo || !variableValor) {
        // Show warning message for incomplete inputs
        swal({
            title: 'Por favor, complete todos los campos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return; // Exit the function without adding the variable
    }

    // Check if the variable name is already in use
    if (usedVariableNames.includes(variableNombre)) {
        swal({
            title: 'Nombre de Variable Repetido',
            text: 'El nombre de la variable ya se encuentra en uso.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return; // Exit the function without adding the variable
    }

    // Check if the variable name matches the pattern
        if (!variableNamePattern.test(variableNombre)) {
            swal({
                title: 'Nombre de Variable Inválido',
                text: 'Debe empezar con letra minúscula y no contener espacios..',
                icon: 'error',
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
            variableValor = `"${variableValor}"`;
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

    // If the value format is correct and the name is not in use, add the variable to the textarea
    const variableEntry = `${variableTipo} ${variableNombre} = ${variableValor};`;
    document.getElementById('variablesCargados').value += variableEntry + '\n';

    // Add the variable name to the list of used variable names
    usedVariableNames.push(variableNombre);

    // Clear the form fields after adding the variable
    document.getElementById('variableNombre').value = '';
    document.getElementById('variableValor').value = '';

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
        // Insert the variable declaration at the clicked line or inside the procedure
        addVariableAtClickedLineOrInsertOfProcedure(variableCode);

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
    attribute1Dropdown.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';
    attribute2Dropdown.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';

    // Populate the dropdowns with variable names from the array
    for (const name of variableNames) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        option.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        attribute1Dropdown.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = name;
        option2.textContent = name;
        option2.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        attribute2Dropdown.appendChild(option2);
    }
}

// Function to populate the dropdowns in the "MIENTRAS" modal with the names of the variables
function refereeVariableNamesMientras() {
    // Get the values selected in the MIENTRAS modal
    const attribute1WhileDropdown = document.getElementById('attribute1While');
    const attribute2WhileDropdown = document.getElementById('attribute2While');

    // Clear existing options
    attribute1WhileDropdown.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';
    attribute2WhileDropdown.innerHTML = '<option value="-" style="background-color: rgba(0, 0, 0, 0.8);">-</option>';

    // Populate the dropdowns with variable names from the array (assuming you have a variableNamesMientras array)
    for (const name of variableNames) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        option.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Set background color
        attribute1WhileDropdown.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = name;
        option2.textContent = name;
        option2.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Set background color
        attribute2WhileDropdown.appendChild(option2);
    }
}

// When the modal is opened, update the "Guardar Variables" button state
document.getElementById('variablesModal').addEventListener('show.bs.modal', function () {
    clearVariablesTextarea();
    updateGuardarVariablesButton();
});

document.getElementById('siModal').addEventListener('show.bs.modal', function () {
    refereeVariableNames();
});

// Call the functions when the "MIENTRAS" button is clicked
document.getElementById('mientrasModal').addEventListener('show.bs.modal', function () {
    refereeVariableNamesMientras(); // Call for MIENTRAS modal
});
