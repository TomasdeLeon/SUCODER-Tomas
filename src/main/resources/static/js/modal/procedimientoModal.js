function createProcedimientoCode(procedureName) {
  const procedureCallCode = `${procedureName}();`;
  return procedureCallCode;
}

function generateProcedureCode() {
  // Get the procedimiento name from the modal field
  const procedimientoName = document.getElementById('procedimientoName').value;

  // Generate the code for calling the PROCEDIMIENTO component
  const procedureCallCode = createProcedimientoCode(procedimientoName);

  // Get the existing content of the maintextarea
  const maintextarea = document.getElementById('maintextarea');

  // Find the position of the last closing curly brace in the existing content
  const lastClosingBraceIndex = maintextarea.value.lastIndexOf('}');

  // Insert the generated procedure call code before the last closing curly brace
  const updatedContent = insertCodeAtLocation(maintextarea.value, procedureCallCode, clickedLineNumber, lastClosingBraceIndex);

  // Update the maintextarea with the new content
  maintextarea.value = updatedContent;

  // Get the procedimientoText and split it into lines
  const procedimientoText = document.getElementById('procedimientoText').value;
  const procedimientoTextLines = procedimientoText.split('\n');

  // Add a comment message
  const procedureName = document.getElementById('procedimientoName').value;
  maintextarea.value += `\n// Procedimiento ${procedureName}\n`;

  // Add procedimientoText lines as comments outside the main method code
  for (const line of procedimientoTextLines) {
    maintextarea.value += `\n// ${line}`;
  }
  maintextarea.value += '\n'; // Add an extra line for separation

  // Close the modal
  const modal = document.getElementById('procedimientoModal');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();
}

// Add an event listener to the "Insertar Procedimiento" button
document.getElementById('insertProcedimiento').addEventListener('click', function () {
  generateProcedureCode(); // Call the function to insert the procedure call into the maintextarea
});
