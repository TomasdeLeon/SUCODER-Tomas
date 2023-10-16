// Function to create the PROCEDIMIENTO code
    function createProcedimientoCode(procedureName) {
        const procedureCallCode = `${procedureName}();`;
        return procedureCallCode;
    }

    // Function to generate the procedure code and insert it
    function generateProcedureCode() {
        // Get the procedimiento name from the modal field
        const procedimientoName = document.getElementById('procedimientoName').value;

        // Generate the code for calling the PROCEDIMIENTO component
        const procedureCallCode = createProcedimientoCode(procedimientoName);

        // Get the existing content of the maintextarea (replace 'maintextarea' with the correct ID)
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

        // After inserting the procedure, check if the procedimientoText is empty and disable the button
        toggleInsertButton();

        // Show SweetAlert confirmation
        swal({
            icon: 'success',
            title: 'Procedimiento Insertado',
        });
    }

    // Function to enable or disable the "Insertar Procedimiento" button
    function toggleInsertButton() {
        const procedimientoText = document.getElementById('procedimientoText').value;
        const insertButton = document.getElementById('insertProcedimiento');

        if (procedimientoText.trim() === '') {
            insertButton.disabled = true;
        } else {
            insertButton.disabled = false;
        }
    }

    // Add an event listener to the "Insertar Procedimiento" button
    document.getElementById('insertProcedimiento').addEventListener('click', function () {
        generateProcedureCode(); // Call the function to insert the procedure call into the maintextarea
    });

    // Add an event listener to the "searchProcedimiento" button (if needed)
    document.getElementById('searchProcedimiento').addEventListener('click', function () {
        // Add logic to fetch and populate procedimientoText
        const procedimientoText = "Procedimiento content here.";
        document.getElementById('procedimientoText').value = procedimientoText;
        toggleInsertButton();
    });

    // Call the toggleInsertButton function initially to set the button's initial state
    toggleInsertButton();

    // Function to clear procedimientoText and procedimientoName
        function clearProcedimientoFields() {
            document.getElementById('procedimientoName').value = '';
            document.getElementById('procedimientoText').value = '';
            toggleInsertButton();
        }

        // Add an event listener to clear the fields when the modal is hidden
        $('#procedimientoModal').on('hidden.bs.modal', function () {
            clearProcedimientoFields();
        });

        // Add an event listener to clear the fields when the modal is dismissed
        $('#procedimientoModal').on('dismiss.bs.modal', function () {
            clearProcedimientoFields();
        });
