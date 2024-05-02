document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const employeeID = document.getElementById('employeeID').value;
        try {
            // Send login request to backend
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ employeeID })
            });
            const data = await response.json();
            
            if (data && data.success) {
                // Redirect to logged-in page
                window.location.href = 'loggedin.html';
            } else {
                // Show an alert for invalid login
                alert("Invalid login credentials");
            }
        } catch (err) {
            alert("An error occurred during login: " + err.message);
        }
    });
});
