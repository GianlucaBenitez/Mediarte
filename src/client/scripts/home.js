window.onload = function() {
    const navbar = document.getElementById("mainNavbar");
    const splashScreen = document.getElementById("splashScreen");
    const backgroundImage = document.getElementById("backgroundImage");
    const centralBox = document.getElementById("centralBox");

    
    setTimeout(() => { // Animación del splash screen/pantalla de inicio
        splashScreen.style.opacity = 0;
        setTimeout(() => {
            splashScreen.style.display = "none"; 
            
      
            navbar.style.transition = "opacity 1s ease-in-out"; // esto sirve para mostrar la barrita despues de la animacion
            navbar.style.opacity = 1;

            setTimeout(() => {
                centralBox.style.display = "flex"; 
                centralBox.classList.add('active'); 
                
                backgroundImage.classList.add('blurred'); 
                
            }, 200); 
        }, 100); 
    }, 100);  
};
window.onload = function() {
    const navbar = document.getElementById("mainNavbar");
    const splashScreen = document.getElementById("splashScreen");
    const backgroundImage = document.getElementById("backgroundImage");
    const centralBox = document.getElementById("centralBox");
    const imageElement = document.getElementById("centralImage");
    const textElement = document.getElementById("centralText");
    const arrowButton = document.getElementById("arrowButton");

    // Lista de imágenes y textos para la rotación
    const contentList = [
        { image: 'styles/logo_mediarte.png', text: 'ejemplo de texto jjk' },
        { image: 'styles/logo_mediarte.png', text: 'ejemplo de texto 2' },
        { image: 'styles/logo_mediarte.png', text: 'ejemplo de texto 3' }
    ];

    let currentIndex = 0;

    // Función para actualizar el contenido (imagen y texto)
    function updateContent() {
        imageElement.src = contentList[currentIndex].image;
        textElement.textContent = contentList[currentIndex].text;
        currentIndex = (currentIndex + 1) % contentList.length; // Rotar en ciclo
    }

    // Al hacer clic en el botón de flecha, cambiar el contenido
    arrowButton.addEventListener('click', function() {
        // Agregar animación suave al cambiar contenido
        centralBox.classList.add('fade-out');
        setTimeout(() => {
            updateContent(); // Actualizar imagen y texto
            centralBox.classList.remove('fade-out'); // Quitar clase de fade-out
        }, 500); // Tiempo de transición de la animación
    });

    // Animación del splash screen/pantalla de inicio
    setTimeout(() => {
        splashScreen.style.opacity = 0;
        setTimeout(() => {
            splashScreen.style.display = "none";

            // Mostrar la barra de navegación con animación
            navbar.style.transition = "opacity 1s ease-in-out";
            navbar.style.opacity = 1;

            // Mostrar el recuadro central después de un breve retraso
            setTimeout(() => {
                centralBox.style.display = "flex"; 
                centralBox.classList.add('active');
                backgroundImage.classList.add('blurred'); 
                updateContent(); 
            }, 1000); 
        }, 1000); 
    }, 2000);
};

