// Function to retrieve and display the exercise solution
    function mostrarSolucion() {
        // Replace this with the actual exercise solution
        const exerciseSolution = "// Replace this with the exercise solution\n";

        // Get the current content of the maintextarea
        const mainTextarea = document.getElementById('maintextarea');
        const currentContent = mainTextarea.value;

        // Combine the current content and exercise solution
        const newContent = `${currentContent}\n${exerciseSolution}`;

        // Set the updated content in the textarea
        mainTextarea.value = newContent;
    }

    // Attach an event listener to the "Mostrar Solución" button
    const mostrarSolucionButton = document.getElementById('mostrarSolucionButton');
    mostrarSolucionButton.addEventListener('click', mostrarSolucion);