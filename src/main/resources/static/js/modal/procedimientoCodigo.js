$(document).ready(function() {

    // When the Insertar Procedimiento button is clicked
        $("#insertProcedimiento").click(function() {
          const procedimientoName = $("#procedimientoName").val();
          if (procedimientoName) {
            // Get the current content of the main text area
            const mainTextArea = document.getElementById("maintextarea");
            let currentContent = mainTextArea.value;

            // Find the position of the opening curly brace of the main method
            const mainMethodStart = currentContent.indexOf("{");

            // Construct the procedure invocation and insert it right after the opening curly brace
            const procedureInvocation = `\n${procedimientoName}();\n`;
            const newContent = currentContent.substring(0, mainMethodStart + 1) +
                               procedureInvocation +
                               currentContent.substring(mainMethodStart + 1);

            // Update the content of the main text area
            mainTextArea.value = newContent;

            // Close the modal
            $("#procedimientoModal").modal("hide");
          } else {
            alert("Please enter a procedimiento name.");
          }
        });
  });