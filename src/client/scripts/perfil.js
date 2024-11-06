const app = "https://mediarte-api.vercel.app";
//const app = "http://127.0.0.1:3000";
const cookie = Cookies.get("token-login");
const logout = document.querySelector(".login-button");

const obtenerDatosDeUsuario = async () => {
  try {
    const response = await fetch(`${app}/usuarios/obtenerDatos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:5501",
        "Access-Control-Allow-Credentials": true,
        "Authorization": `Bearer ${cookie}`
      },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de usuarios");
    }

    const data = await response.json();
    console.log(data.data)
    return(data.data);
  } catch (error) {
    console.error("Error al obtener los datos de usuarios:", error);
  }
};

const mostrarDatosDeUsuario = async () => {
  try {
    const datos = await obtenerDatosDeUsuario();
    const nombre = datos.nombre;
    const email = datos.email;

    const etiquetaNombre = document.querySelector(".card-body .nombre");
    const etiquetaEmail = document.querySelector(".card-body .email");
    
    etiquetaNombre.textContent = `Bienvenido ${nombre} ⋆౨ৎ˚⟡`;
    etiquetaEmail.textContent = `Email: ${email}`;
  } catch (error) {
    console.error("Error al mostrar los datos de usuarios", error);
  }
};

const cerrarSesion = async () => {
    try {
      const response = await fetch(`${app}/usuarios/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
          "Access-Control-Allow-Credentials": true,
          "Authorization": `Bearer ${cookie}`
        },
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }
      
      window.location.href = "https://mediarte.vercel.app/index.html";
    } catch (error) {
      console.error("Error al obtener los audios guardados:", error);
    }
};

addEventListener("DOMContentLoaded", () => {
  mostrarDatosDeUsuario();
})

logout.addEventListener("click", cerrarSesion);