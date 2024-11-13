    const cookieAudios = Cookies.get("token-login");

    const container = document.querySelector("#audiosContainer"); 
    console.log(container);

    const cards = document.querySelectorAll('.meditation-card:not(.Guardados)');
    const guardadosCard = document.querySelectorAll('.Guardados');

    const obtenerUserId = async () => {
        try {
          const response = await fetch(`https://mediarte-api.vercel.app/usuarios/obtenerDatos`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
              "Access-Control-Allow-Credentials": true,
              "Authorization": `Bearer ${cookieAudios}`
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

    const obtenerAudios = async (tipo) => {
        try {
            console.log(tipo);  
            const response = await fetch(`https://mediarte-api.vercel.app/audios/${tipo}`, { 
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
                "Access-Control-Allow-Credentials": true,
                },
            }); 

            if (!response.ok) throw new Error(`Error al obtener audios de tipo ${tipo}`);

            const data = await response.json();
            const audios = data.message; 
            renderizarAudios(audios, tipo);
        } catch (error) {
            console.error("Error fetching audios:", error);
            container.innerHTML = `<p class="text-danger">Error al cargar los audios de ${tipo}. Intenta de nuevo más tarde.</p>`;
        }
    };

    const obtenerIdFavoritos = async (userId) => {
        try {
          const response = await fetch(`https://mediarte-api.vercel.app/guardados/obtenerIdFavoritos/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
              "Access-Control-Allow-Credentials": true,
              "Authorization": `Bearer ${cookieAudios}`
            },
            credentials: "include"
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error("Error al obtener los datos de usuarios");
          }
      
          return(data.data);
        } catch (error) {
          console.error("Error al obtener los audios guardados:", error);
        }
      };

    // Función para mostrar audios
    const renderizarAudios = async (audios, tipo) => {
        const userId = await obtenerUserId();
        console.log(userId);

        const audiosFavoritos = await obtenerIdFavoritos(userId);
        console.log(audiosFavoritos);

        container.innerHTML = ""; 

        if (audios.length === 0) {
            container.innerHTML = `<p class="text-muted">No hay audios de tipo ansiedad disponibles.</p>`;
            return;
        }

        audios.forEach(audio => {
            const card = document.createElement('div');
            card.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

            card.innerHTML = `
                <div class="card">
                    <img class="card-img-top mp3-cover" src="https://res.cloudinary.com/de2ggefyf/image/upload/imagenes/${tipo}.jpg" alt="${audio.nombre_audio}">
                    <div class="card-body">
                        <h4 class="card-title">${audio.nombre_audio}</h4>
                        <p class="card-text">${audio.tipo_meditacion}</p>
                        <audio controls class="mp3-audio">
                            <source src="${audio.url_audio}" type="audio/mp3">
                        </audio>
                        <button class="btn-save" data-id="${audio.id_audio}">✦</button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);

            if(audiosFavoritos.includes(audio.id_audio)){
                const botonFavorito = card.querySelector(`button`);
                botonFavorito.classList.add("favorito");
                console.log(botonFavorito)
            }

            let boton = card.querySelector('.btn-save');
            boton.addEventListener('click', async function() {
                if(boton.classList.contains("favorito")){
                    const idAudio = Number(this.getAttribute('data-id'));
                    const userId = await obtenerId();

                    console.log(`ID Usuario: ${userId} Tipo:${typeof(userId)}`);
                    console.log(`ID Audio: ${idAudio} Tipo:${typeof(idAudio)}`); 
                    borrarAudio(idAudio, userId);
                }else{
                    const idAudio = Number(this.getAttribute('data-id'));
                    const userId = await obtenerId(); 

                    console.log(`ID Usuario: ${userId} Tipo:${typeof(userId)}`);
                    console.log(`ID Audio: ${idAudio} Tipo:${typeof(idAudio)}`);  
                    guardarAudio(idAudio, userId);
                }

                boton.classList.toggle("favorito")
            });
        });
    };

    if(cards){
        cards.forEach(card => card.addEventListener('click', async function(e) {
            let tipo = e.target.classList[1]; 
            window.location.href = `audio.html?tipo=${encodeURIComponent(tipo)}`;
         }));
    }
    console.log(window.location.pathname)

    if(window.location.pathname == "/audio.html"){
        const params = new URLSearchParams(window.location.search); 
        const tipo = params.get("tipo");
        obtenerAudios(tipo);
    }

    if(guardadosCard){
        guardadosCard.forEach(guardado => guardado.addEventListener('click', async function(e) {
            window.location.href = "./guardados.html";
        }))
    }
