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