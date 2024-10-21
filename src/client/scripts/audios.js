    const container = document.querySelector(".container"); 
    console.log(container);
    const cards = document.querySelectorAll('.meditation-card');
    console.log(cards);

    const guardadosCard = document.querySelectorAll('.guardados');

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

            if (!response.ok) throw new Error("Error al obtener audios de tipo ansiedad");

            const data = await response.json();
            const audios = data.message; 
            renderizarAudios(audios, tipo);
        } catch (error) {
            console.error("Error fetching audios:", error);
            container.innerHTML = `<p class="text-danger">Error al cargar los audios de ansiedad. Intenta de nuevo más tarde.</p>`;
        }
    };

    // Función para mostrar audios
    const renderizarAudios = (audios, tipo) => {
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
                        <!--<button class="btn-save" data-id="${audio.id_audio}">✦</button>-->
                        <audio controls class="mp3-audio">
                            <source src="${audio.url_audio}" type="audio/mp3">
                            Tu navegador no soporta audios.
                        </audio>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
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
            window.location.href = "guardados.html";
        }))
    }
