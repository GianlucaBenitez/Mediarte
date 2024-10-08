const btnLogin = document.querySelector(".btn-login");

btnLogin.addEventListener("click", async () => {
    // Obtenemos los valores del input
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    // Validamos que los campos no estén vacíos
    if (!email || !contrasena) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const dataLogin = {
            email: email,
            contrasena: contrasena
        };

        console.log(dataLogin)

        // Hacemos el fetch al backend usando el método POST
        const response = await fetch("https://mediarte-api.vercel.app/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(dataLogin)
        });

        // Manejamos la respuesta del servidor
        const data = await response.json();

        if (response.ok) {
            alert("Inicio de sesión exitoso");
            console.log("Usuario logueado:", data.data.usuarioToken);
            
            // Guardamos el token en localStorage o cookies si es necesario
            localStorage.setItem("token", data.data.token);

            // Redirigimos a la página principal o dashboard
            window.location.href = "https://mediarte.vercel.app/indexmenu.html";
        } else {
            alert(data.error || "Error en el inicio de sesión");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error en la conexión con el servidor");
    }
});

// Ver bupicontraseña
const veoContrasena = document.getElementById('mostrarContrasena');
const inputContrasena = document.getElementById("contrasena");
let click = false;

veoContrasena.addEventListener('click', (e) => {
    if (!click) {
        inputContrasena.type = 'text';
        click = true;
    } else {
        inputContrasena.type = 'password';
        click = false;
    }
});
