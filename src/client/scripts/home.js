window.onload = function() {
    const navbar = document.getElementById("mainNavbar");
    const splashScreen = document.getElementById("splashScreen");
    const backgroundImage = document.getElementById("backgroundImage");
    const centralBox = document.getElementById("centralBox");
    const textElement = document.getElementById("centralText");
    const arrowButton = document.getElementById("arrowButton");

    // Lista de párrafos para rotar
    const textList = [
        '¡Bienvenidos a Mediarte! Nuestro principal deseo es que, al llegar aquí, sientas que no estás solo. Sabemos que momentos de ansiedad, estrés, ataques de pánico o depresión pueden hacer que te sientas abrumado, y es por eso que hemos creado este espacio: para brindarte un respiro, una mano amiga que te guíe hacia un estado de calma y bienestar.',
        'En Mediarte, encontrarás un catálogo de meditaciones guiadas diseñadas con cariño y cuidado para acompañarte en esos momentos difíciles. No pretendemos reemplazar el apoyo profesional, sino ser un puente que te ayude a sentirte mejor y más estable, para que puedas estar en condiciones de buscar la ayuda que necesites, cuando te sientas listo.',
        'Nuestro propósito es simple: que te sientas acogido, comprendido y con herramientas para reconectar con una versión más tranquila y equilibrada de ti mismo. Estamos aquí para acompañarte en este camino hacia el bienestar, paso a paso, a tu propio ritmo.'
    ];

    let currentIndex = 0;

    // Función para actualizar el texto
    function updateText() {
        textElement.textContent = textList[currentIndex];
        currentIndex = (currentIndex + 1) % textList.length; // Rotar en ciclo
    }

    // Al hacer clic en el botón de flecha, cambiar el texto
    arrowButton.addEventListener('click', function() {
        // Agregar animación suave al cambiar contenido
        centralBox.classList.add('fade-out');
        setTimeout(() => {
            updateText(); // Actualizar el texto
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
                updateText(); 
            }, 1000); 
        }, 1000); 
    }, 2000);
};
