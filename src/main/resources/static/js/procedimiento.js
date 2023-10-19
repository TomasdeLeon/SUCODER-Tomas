let procedureName = '';
let components = [];

function isProcedureNameEmpty() {
  const procedureName = document.getElementById('procedureName').value;
  return procedureName.trim() === '';
}

function isValidProcedureName() {
  const procedureName = document.getElementById('procedureName').value;
  // Check if the procedure name contains spaces and starts with a lowercase letter
  return /^[a-z][a-zA-Z0-9]*$/.test(procedureName);
}

function validateProcedureName() {
  if (isProcedureNameEmpty()) {
    swal("El nombre del procedimiento no puede estar vacío.", "", "warning");
  } else if (!isValidProcedureName()) {
    swal("El nombre del procedimiento no puede contener espacios y debe comenzar con una letra minúscula.", "", "warning");
  }
}

function openModal(modalId) {
  if (isProcedureNameEmpty()) {
    // Display a SweetAlert warning when the procedure name is empty or invalid
    swal("El nombre del procedimiento no puede estar vacío.", "", "warning");

  } else if(!isValidProcedureName()) {
    swal("El nombre del procedimiento no es válido.", "Debe empezar con letra minúscula y no contener espacios.", "error");

  }
  else {
    // Procedure name is not empty and valid, open the specified modal
    $(modalId).modal('show');
  }
}

function updateProcedureName() {
    procedureName = document.getElementById('procedureName').value;
    updateTextArea();
}

function updateComponents(component) {
    components.push(component);
    updateTextArea();
}

function updateTextArea() {
    const formattedProcedure = createJavaProcedure(procedureName, components);
    document.getElementById('maintextarea').value = formattedProcedure;
}

function createJavaProcedure(name, components) {
    let procedureCode = '';

    if (name) {
        procedureCode = `public class ${name}() {\n`;
    }

    for (const component of components) {
        procedureCode += component + '\n';
    }

    if (name) {
        procedureCode += '}\n';
    }

    return procedureCode;
}