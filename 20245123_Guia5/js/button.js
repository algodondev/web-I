function aviso() {
    alert("Bienvenido al mundo JavaScript");
}

function confirmation() {
    // Los valores que puede almacenar la variable confirmacion
    // son true o false
    let confirmation = confirm("¿Desea salir de la Sesión?");
    /* para imprimir una variable en una cadena podemos
    utilizar las comillas simples inversas y luego hacemos el llamado
    de la variable con ${aquí deberá describir el nombre de la variable}
    */
    alert('Valor seleccionado $(confirmacion)');
}

function capturarDatos() {
    let nombre = prompt("¿Cual es su nombre?");
    // Notese que en campo del pront se mostrará 0 por defecto
    let edad = prompt("¿Cual es su edad?", 0);

    alert('Su nombre es $(nombre) y su edad $(edad)');
}

function dibujarParnafo() {
    let parnafo = prompt(
    "Escriba la información que desea visualizar en el parnafo"
    );

    /* Utilizaremos la API DOM para acceder al elemento
    <p id="idParnafo"></p> que hemos creado en nuestro documento HTML*/

    const p = document.querySelector("#idParnafo");
    p.innerHTML = parnafo;
}