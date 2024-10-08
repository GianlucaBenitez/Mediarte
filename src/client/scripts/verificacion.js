const btn = document.querySelector(".btn-verificar");

btn.addEventListener("click", async function(e) {
e.preventDefault()

const codigo = document.getElementById('codigo').value;
const params = new URLSearchParams(window.location.search); 
const email = params.get("email");

try{
    const response = await fetch("https://mediarte-api.vercel.app/usuarios/validar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(email, codigo)
    })

    const result = await response.json();
        console.log(result)

    if (response.ok){
        alert(result.message);
        window.location.href = 'https://mediarte.vercel.app';
    }

} catch (error) {
    console.error('Error al verificar el usuario', error);
    alert('"Error en el servidor. Por favor, inténtelo de nuevo más tarde."')
}

});