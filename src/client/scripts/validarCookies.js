const cookieExiste = Cookies.get("token-login");

const celular = document.querySelector(".celular-buttons");
const escritorio = document.querySelector(".escritorio-buttons");

if(cookieExiste){
    celular.innerHTML = `
        <a class="btn registro-button mb-2" href="indexmenu.html">Meditaciones</a>
        <a class="btn registro-button mb-2" href="perfil2.html">Perfil</a>
        <a class="btn registro-button" href="guardados.html">Favoritos</a>
    `

    escritorio.innerHTML = `
        <a class="btn registro-button me-2" href="indexmenu.html">Meditaciones</a>
        <a class="btn registro-button me-2" href="perfil2.html">Perfil</a>
        <a class="btn registro-button" href="guardados.html">Favoritos</a>
    `
}

if(window.location.pathname == "/src/client/perfil.html" && !cookieExiste){
    const body = document.querySelector(".card");
    body.innerHTML = `
        <div class="card-text">Por favor, inicie sesión para acceder a esta página</div>
    `
}