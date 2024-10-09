document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("token"); 
  
    // URL base de la API
    const app = "https://mediarte-api.vercel.app";
  
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
        renderizarAudios(data.data);
      } catch (error) {
        console.error("Error al obtener los audios guardados:", error);
      }
    };
  
    // Función para guardar un audio en el usuario
    const guardarAudio = async (idAudio) => {
      try {
        const response = await fetch(`${app}/guardados/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
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
    const renderizarAudios = (audios) => {
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
  
      // Agrega el evento para eliminar de guardados
      document.querySelectorAll(".btn-delete").forEach((button) => {
        button.addEventListener("click", () => {
          const idAudio = button.getAttribute("data-id");
          eliminarAudio(idAudio);
        });
      });
    };
  
    // Función para eliminar un audio de los guardados
    const eliminarAudio = async (idAudio) => {
      try {
        const response = await fetch(`${apiUrl}/guardados/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({ id_audio: idAudio }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error al eliminar el audio:", errorData.error);
        } else {
          console.log("Audio eliminado de guardados.");
          obtenerAudiosGuardados(); // Actualiza la lista de audios guardados
        }
      } catch (error) {
        console.error("Error al eliminar el audio:", error);
      }
    };
  
    // Evento para el botón de guardar audio
    document.querySelectorAll(".btn-save").forEach((button) => {
      button.addEventListener("click", () => {
        const idAudio = button.getAttribute("data-id"); // Suponiendo que el botón tiene un atributo `data-id` con el ID del audio
        guardarAudio(idAudio);
      });
    });
  
    // Llama a la función para obtener los audios guardados al cargar la página
    if (userId) {
      obtenerAudiosGuardados();
    } else {
      console.error("No se ha encontrado el ID del usuario.");
    }
  });
  