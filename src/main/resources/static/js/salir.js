document.getElementById('btnCerrarSesion').addEventListener('click', function () {
    // Limpiar la visualización del nombre de usuario
    document.getElementById('nombreUsuario').textContent = '';
    // Eliminar el nombre de sesión almacenado
    localStorage.removeItem('nombreSesion');
    // Eliminar los parámetros de la URL
    history.replaceState({}, document.title, window.location.pathname);
    // Redirigir a index.html
    window.location.href = 'index.html';
});

