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
  const updatedContent = maintextarea.value.slice(0, lastClosingBraceIndex) +
    '\n' + procedureCallCode + '\n' + maintextarea.value.slice(lastClosingBraceIndex);

  // Update the maintextarea with the new content
  maintextarea.value = updatedContent;

  // Close the modal
  const modal = document.getElementById('procedimientoModal');
  const bsModal = bootstrap.Modal.getInstance(modal);
  bsModal.hide();
}

// Add an event listener to the "Insertar Procedimiento" button
document.getElementById('insertProcedimiento').addEventListener('click', function () {
  generateProcedureCode(); // Call the function to insert the procedure call into the maintextarea
});