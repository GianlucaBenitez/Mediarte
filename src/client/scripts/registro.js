//Registro
const form = document.querySelector(".btn-registro"); // Botón de envío

form.addEventListener("click", async function(e) {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("Ccontrasena").value;

    // Validar campos antes de enviar 
    if (!nombreUsuario || !email || !contrasena || !confirmarContrasena) {
        return alert("Todos los campos son obligatorios");
    }

    if (contrasena !== confirmarContrasena) {
        return alert("Las contraseñas no coinciden");
    }

    try {
        // Crear objeto con los datos del formulario
        const registroData = {
            nombre: nombreUsuario,
            email: email,
            contrasena: contrasena,
            confirmarContrasena: confirmarContrasena
        };

        console.log(registroData);

        // Hacer la solicitud POST al backend
        const response = await fetch("http://mediarte-api.vercel.app/usuarios/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(registroData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        

        const result = await response.json();

        if (response.ok) {
            // Registro exitoso
            alert(result.message);
            // Redirigir o mostrar mensaje de éxito
            window.location.href = "login.html"; // Redirige al login
        } else {
            // Error en el registro
            alert(result.error || "Error al registrar usuario");
        }
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        alert("Error en el servidor. Por favor, inténtelo de nuevo más tarde.");
    }
});