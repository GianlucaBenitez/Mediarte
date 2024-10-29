 // URL base de la API
const app = "https://mediarte-api.vercel.app";
const cookie = Cookies.get("token-login");

const obtenerId = async () => {
  try {
    const response = await fetch(`${app}/usuarios/obtenerDatos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
        "Access-Control-Allow-Credentials": true,
        "Authorization": `Bearer ${cookie}`
      },
      credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error al obtener los datos de usuarios");
    }

    return(data.data.id_usuario);
  } catch (error) {
    console.error("Error al obtener los audios guardados:", error);
  }
};

// Función para obtener todos los audios guardados por el usuario
const obtenerAudiosGuardados = async (userId) => {
  try {
    const response = await fetch(`${app}/guardados/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
        "Access-Control-Allow-Credentials": true,
        "Authorization": `Bearer ${cookie}`
      },
      credentials: "include"
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
        "Authorization": `Bearer ${cookie}`
      },
      credentials: "include",
      body: JSON.stringify({ id_audio: idAudio }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al guardar el audio:", errorData.error);
    } else {
      console.log("Audio guardado exitosamente.");
      // obtenerAudiosGuardados(); // Actualiza la lista de audios guardados
    }
  } catch (error) {
    console.error("Error al guardar el audio:", error);
  }
};

const borrarAudio = async (idAudio, userId) => {
  try {
    const response = await fetch(`${app}/guardados/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://mediarte-api.vercel.app",
        "Access-Control-Allow-Credentials": true,
        "Authorization": `Bearer ${cookie}`
      },
      credentials: "include",
      body: JSON.stringify({ id_audio: idAudio }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al borrar el audio:", errorData.error);
    } else {
      console.log("Audio borrado exitosamente.");
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
      <img class="card-img-top mp3-cover" src="https://res.cloudinary.com/de2ggefyf/image/upload/imagenes/${audio.tipo_meditacion}.jpg" alt="${audio.nombre_audio}">
      <div class="card-body">
          <h4 class="card-title">${audio.nombre_audio}</h4>
          <p class="card-text">${audio.tipo_meditacion}</p>
          <audio controls class="mp3-audio">
              <source src="${audio.url_audio}" type="audio/mp3">
          </audio>
          <button class="btn-delete" data-id="${audio.id_audio}">Borrar</button>
      </div>
    </div>
    `;

    container.appendChild(card);

    card.querySelector('.btn-delete').addEventListener('click', async function() {
      const idAudio = Number(this.getAttribute('data-id'));
      const userId = await obtenerId(); 

      console.log(`ID Usuario: ${userId} Tipo:${typeof(userId)}`);
      console.log(`ID Audio: ${idAudio} Tipo:${typeof(idAudio)}`);  
      borrarAudio(idAudio, userId);
  });
  });
}

const cargarDatos = async () => {
  const userId = await obtenerId();
  console.log(userId);
  await obtenerAudiosGuardados(userId)
}

if(window.location.pathname == "/guardados.html"){
  cargarDatos();
}

if(window.location.pathname == "/audio.html"){
document.querySelectorAll(".btn-save").forEach((button) => {
  button.addEventListener("click", () => {
    const idAudio = button.getAttribute("data-id"); 
    guardarAudio(idAudio);
  });
});
}