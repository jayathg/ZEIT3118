document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    const userID = document.getElementById('userID').value;
    login(userID);
});

function login(userID) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID })
    })
    .then(data => {
        if(data && data.success) {
            magicLink(data[0].email);
        }else {
            alert("Invalid userID")
        }
    })
    .catch(err => {
        alert("An error occured during login " + err.message);
    });

}

// To be implemented by Kiara
function magicLink(userEmail) {
    
}