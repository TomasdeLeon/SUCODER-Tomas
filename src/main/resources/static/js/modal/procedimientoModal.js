// Function to create the PROCEDIMIENTO code
function createProcedimientoCode(procedureName) {
  const procedureCallCode = `${procedureName}();`;
  return procedureCallCode;
}

// Function to populate procedimientoText
function populateProcedimientoText() {
  const procedimientoName = document.getElementById('procedimientoName').value;

  // Replace this logic with your own to fetch the procedure for the user.
  // For this example, we'll use an empty string.
  const fetchedProcedimientoText = ''; // Fetch the procedure content

  const procedimientoText = document.getElementById('procedimientoText');
  procedimientoText.value = fetchedProcedimientoText;

  // After populating procedimientoText, check if it's empty and hide/show the button
  const insertButton = document.getElementById('insertProcedimiento');
  if (procedimientoText.value.trim() === '') {
    insertButton.disabled = false; // Hide the button
  } else {
    insertButton.disabled = true; // Show the button
  }
}

// Add an event listener to the "searchProcedimiento" button
document.getElementById('searchProcedimiento').addEventListener('click', function () {
  populateProcedimientoText();
});

// Function to generate the procedure code and insert it
function generateProcedureCode() {
  const procedimientoName = document.getElementById('procedimientoName').value;
  const procedureCallCode = createProcedimientoCode(procedimientoName);
  const maintextarea = document.getElementById('maintextarea');
  const lastClosingBraceIndex = maintextarea.value.lastIndexOf('}');
  const updatedContent = insertCodeAtLocation(maintextarea.value, procedureCallCode, clickedLineNumber, lastClosingBraceIndex);
  maintextarea.value = updatedContent;

  // Get the procedimientoText and split it into lines
  const procedimientoText = document.getElementById('procedimientoText').value;
  const procedimientoTextLines = procedimientoText.split('\n');

  // Add a comment message
  maintextarea.value += `\n// Procedimiento ${procedimientoName}\n`;

  // Add procedimientoText lines as comments outside the main method code
  for (const line of procedimientoTextLines) {
    maintextarea.value += `\n// ${line}`;
  }
  maintextarea.value += '\n'; // Add an extra line for separation

  // Close the modal
  const modal = document.getElementById('procedimientoModal');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();

  // Clear the procedimientoName field
  document.getElementById('procedimientoName').value = '';

  // Hide the "Insertar Procedimiento" button after the procedure is inserted
  const insertButton = document.getElementById('insertProcedimiento');
  insertButton.style.display = 'none';
}

// Add an event listener to the "Insertar Procedimiento" button
document.getElementById('insertProcedimiento').addEventListener('click', function () {
  generateProcedureCode();
});

// Function to clear procedimientoText and procedimientoName
function clearProcedimientoFields() {
  document.getElementById('procedimientoName').value = '';
  document.getElementById('procedimientoText').value = '';

  // Hide the "Insertar Procedimiento" button when clearing the fields
  const insertButton = document.getElementById('insertProcedimiento');
  insertButton.disabled = true;
}

// Add an event listener to clear the fields when the modal is hidden
$('#procedimientoModal').on('hidden.bs.modal', function () {
  clearProcedimientoFields();
});
