document.getElementById('logoutButton').addEventListener('click', function () {
    // Clear the username display
    document.getElementById('userName').textContent = '';
    // Clear the stored session name
    localStorage.removeItem('sessionName');
    // Remove URL parameters
    history.replaceState({}, document.title, window.location.pathname);
    // Redirect to index.html
    window.location.href = 'index.html';
});

