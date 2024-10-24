const userId = localStorage.getItem("token"); 
  
// URL base de la API
const app = "https://mediarte-api.vercel.app";

const obtenerId = async () => {
  try {
    const response = await fetch(`${app}/usuarios/obtenerDatos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
        "Access-Control-Allow-Credentials": true,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de usuarios");
    }

    const data = await response.json();
    return(data.data.id_usuario);
  } catch (error) {
    console.error("Error al obtener los audios guardados:", error);
  }
};

// Función para obtener todos los audios guardados por el usuario
const obtenerAudiosGuardados = async () => {
  try {
    const response = await fetch(`${app}/guardados/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
        "Access-Control-Allow-Credentials": true,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los audios guardados");
    }

    const data = await response.json();
    mostrarAudios(data.data);
  } catch (error) {
    console.error("Error al obtener los audios guardados:", error);
  }
};

// Función para guardar un audio en el usuario
const guardarAudio = async (idAudio, userId) => {
  try {
    const response = await fetch(`${app}/guardados/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://mediarte-api.vercel.app",
        "Access-Control-Allow-Credentials": true,

      },
      body: JSON.stringify({ id_audio: idAudio }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al guardar el audio:", errorData.error);
    } else {
      console.log("Audio guardado exitosamente.");
      obtenerAudiosGuardados(); // Actualiza la lista de audios guardados
    }
  } catch (error) {
    console.error("Error al guardar el audio:", error);
  }
};

// Función para renderizar los audios guardados en la interfaz
const mostrarAudios = (audios) => {
  const container = document.querySelector(".container .row");
  container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos elementos

  audios.forEach((audio) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card">
        <audio controls>
          <source src="${audio.url_audio}" type="audio/mpeg">
          Tu navegador no soporta el elemento de audio.
        </audio>
        <div class="card-body">
          <h5 class="card-title">${audio.nombre_audio}</h5>
          <p class="card-text">Tipo: ${audio.tipo_meditacion}</p>
          <button class="btn-delete" data-id="${audio.id_audio}">Borrar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}


if(window.location.pathname == "/guardados.html"){
  mostrarAudios(audios);
  }

if(window.location.pathname == "/audio.html"){
document.querySelectorAll(".btn-save").forEach((button) => {
  button.addEventListener("click", () => {
    const idAudio = button.getAttribute("data-id"); 
    guardarAudio(idAudio);
  });
});
}

  