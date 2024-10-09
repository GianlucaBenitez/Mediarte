document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container .row");
    const path=window.location.pathname.split("/")
    const tipo=path[path.length-1].split(".")[0]
    

    // Función para obtener los audios de tipo "ansiedad" desde el servidor
    const obtenerAudios = async (tipo) => {
        try {
            const response = await fetch('http://localhost:3000/audios/Ansiedad', { // https://mediarte-api.vercel.app
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "https://mediarte.vercel.app",
                "Access-Control-Allow-Origin": "http://localhost:5501", 
                "Access-Control-Allow-Credentials": true,
                },
            }); 

            if (!response.ok) throw new Error("Error al obtener audios de tipo ansiedad");

            const data = await response.json();
            const audios = data.message; 
            renderizarAudios(audios);
        } catch (error) {
            console.error("Error fetching audios:", error);
            container.innerHTML = `<p class="text-danger">Error al cargar los audios de ansiedad. Intenta de nuevo más tarde.</p>`;
        }
    };

    // Función para renderizar audios
    const renderizarAudios = (audios) => {
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
                    <img class="card-img-top mp3-cover" src="styles/ansiedad.jpeg" alt="${audio.nombre_audio}">
                    <div class="card-body">
                        <h4 class="card-title">${audio.nombre_audio}</h4>
                        <p class="card-text">${audio.tipo_meditacion}</p>
                        <button class="btn-save">✦</button>
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

    // Llamar a la función para obtener y mostrar los audios de tipo "ansiedad"
    obtenerAudios();
});
