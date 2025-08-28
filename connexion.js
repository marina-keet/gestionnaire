  function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            // le mot de passe et le nom de l'utilisateur : admin / admin
            if (username === "admin" && password === "admin") {
                window.location.href = "index.html";
                return true;
            } else {
                document.getElementById('login-error').style.display = "block";
                return false;
            }
        }