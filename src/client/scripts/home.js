// Ocultar la pantalla de bienvenida después de 3 segundos y mostrar el contenido con transición
setTimeout(function() {
    document.getElementById('welcome-screen').style.opacity = '0';
    setTimeout(function() {
      document.getElementById('welcome-screen').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
      document.getElementById('main-container').style.display = 'block';
  
      // Aplicar transición de opacidad al contenido
      setTimeout(function() {
        document.getElementById('main-content').style.opacity = '1';
        document.getElementById('main-container').style.opacity = '1';
      }, 50); // Delay pequeño para que la transición ocurra después de mostrar el contenido
    }, 1000); // Espera 1 segundo antes de ocultar completamente
  }, 3000);
  