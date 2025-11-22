// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aquí se esta utilizando el atributo name de cada elemento

const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// OBTENIENDO REFERENCIAS DE LOS CAMPOS DEL FORMULARIO
const nombre = document.getElementById("idNombre");
const apellidos = document.getElementById("idApellidos");
const fechaNac = document.getElementById("idFechaNac");
const correo = document.getElementById("idCorreo");
const password = document.getElementById("idPassword");
const passwordRepetir = document.getElementById("idPasswordRepetir");
const pais = document.getElementById("idCmPais");

// Checkboxes de intereses
const ckProgramacion = document.getElementById("idCkProgramacion");
const ckBD = document.getElementById("idCkBD");
const ckRedes = document.getElementById("idCkRedes");
const ckSeguridad = document.getElementById("idCkSeguridad");

// Radio buttons de carrera
const rdIng = document.getElementById("idRdIng");
const rdLic = document.getElementById("idRdLic");
const rdTec = document.getElementById("idRdTec");
const rdOtro = document.getElementById("idRdOtro");

// FUNCIÓN PARA VALIDAR EL CORREO ELECTRÓNICO CON EXPRESIÓN REGULAR
const validarEmail = function (email) {
    // Expresión regular para validar correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// FUNCIÓN PARA VALIDAR QUE LA FECHA NO SUPERE LA FECHA ACTUAL
const validarFecha = function (fecha) {
    const fechaIngresada = new Date(fecha);
    const fechaActual = new Date();
    // Configurar la hora a 00:00:00 para comparar solo fechas
    fechaActual.setHours(0, 0, 0, 0);
    return fechaIngresada <= fechaActual;
};

// FUNCIÓN PARA VALIDAR QUE AL MENOS UN INTERÉS ESTÉ SELECCIONADO
const validarIntereses = function () {
    return ckProgramacion.checked || ckBD.checked || ckRedes.checked || ckSeguridad.checked;
};

// FUNCIÓN PARA VALIDAR QUE UNA CARRERA ESTÉ SELECCIONADA
const validarCarrera = function () {
    return rdIng.checked || rdLic.checked || rdTec.checked || rdOtro.checked;
};

// FUNCIÓN PARA OBTENER LA CARRERA SELECCIONADA
const obtenerCarrera = function () {
    if (rdIng.checked) return "Ingeniería de Software y Negocios Digitales";
    if (rdLic.checked) return "Licenciatura en Economía y Negocios";
    if (rdTec.checked) return "Ingeniería de Negocios";
    if (rdOtro.checked) return "Otra";
    return "";
};

// FUNCIÓN PARA OBTENER LOS INTERESES SELECCIONADOS
const obtenerIntereses = function () {
    let intereses = [];
    if (ckProgramacion.checked) intereses.push("Programación");
    if (ckBD.checked) intereses.push("Base de Datos");
    if (ckRedes.checked) intereses.push("Inteligencia Artificial");
    if (ckSeguridad.checked) intereses.push("Seguridad Informática");
    return intereses.join(", ");
};

// FUNCIÓN PARA OBTENER EL TEXTO DEL PAÍS SELECCIONADO
const obtenerPais = function () {
    const indice = pais.selectedIndex;
    return indice > 0 ? pais.options[indice].text : "";
};

// FUNCIÓN PARA CREAR UNA TABLA CON DOM
const crearTabla = function (datos) {
    // Limpiar el contenido del modal
    bodyModal.innerHTML = "";
    
    // Crear elemento table
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped table-bordered");
    
    // Crear thead
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    
    // Crear th para encabezados
    const thCampo = document.createElement("th");
    thCampo.textContent = "Campo";
    const thValor = document.createElement("th");
    thValor.textContent = "Valor";
    
    trHead.appendChild(thCampo);
    trHead.appendChild(thValor);
    thead.appendChild(trHead);
    tabla.appendChild(thead);
    
    // Crear tbody
    const tbody = document.createElement("tbody");
    
    // Agregar filas con los datos
    for (let campo in datos) {
        const tr = document.createElement("tr");
        
        const tdCampo = document.createElement("td");
        tdCampo.textContent = campo;
        tdCampo.setAttribute("class", "fw-bold");
        
        const tdValor = document.createElement("td");
        tdValor.textContent = datos[campo];
        
        tr.appendChild(tdCampo);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    }
    
    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);
};

// FUNCIÓN PRINCIPAL DE VALIDACIÓN
const validarFormulario = function () {
    // a. Validar que los campos no estén vacíos
    if (nombre.value.trim() === "") {
        alert("El campo Nombres es obligatorio");
        nombre.focus();
        return false;
    }
    
    if (apellidos.value.trim() === "") {
        alert("El campo Apellidos es obligatorio");
        apellidos.focus();
        return false;
    }
    
    if (fechaNac.value === "") {
        alert("El campo Fecha de Nacimiento es obligatorio");
        fechaNac.focus();
        return false;
    }
    
    // b. Validar que la fecha de nacimiento no supere la fecha actual
    if (!validarFecha(fechaNac.value)) {
        alert("La fecha de nacimiento no puede ser mayor a la fecha actual");
        fechaNac.focus();
        return false;
    }
    
    if (correo.value.trim() === "") {
        alert("El campo Correo Electrónico es obligatorio");
        correo.focus();
        return false;
    }
    
    // c. Validar correo electrónico con expresión regular
    if (!validarEmail(correo.value)) {
        alert("El formato del correo electrónico no es válido");
        correo.focus();
        return false;
    }
    
    if (password.value === "") {
        alert("El campo Contraseña es obligatorio");
        password.focus();
        return false;
    }
    
    if (passwordRepetir.value === "") {
        alert("Debe repetir la contraseña");
        passwordRepetir.focus();
        return false;
    }
    
    // d. Validar que las contraseñas sean iguales
    if (password.value !== passwordRepetir.value) {
        alert("Las contraseñas no coinciden");
        passwordRepetir.focus();
        return false;
    }
    
    // e. Validar que al menos un interés esté seleccionado
    if (!validarIntereses()) {
        alert("Debe seleccionar al menos un interés");
        return false;
    }
    
    // f. Validar que una carrera esté seleccionada
    if (!validarCarrera()) {
        alert("Debe seleccionar una carrera");
        return false;
    }
    
    // g. Validar que un país esté seleccionado
    if (pais.selectedIndex === 0) {
        alert("Debe seleccionar un país de origen");
        pais.focus();
        return false;
    }
    
    return true;
};

// FUNCIÓN PARA MOSTRAR LOS DATOS EN EL MODAL
const mostrarDatos = function () {
    // Validar el formulario antes de mostrar
    if (!validarFormulario()) {
        return;
    }
    
    // Crear objeto con los datos del formulario
    const datosFormulario = {
        "Nombres": nombre.value,
        "Apellidos": apellidos.value,
        "Fecha de Nacimiento": fechaNac.value,
        "Correo Electrónico": correo.value,
        "Intereses": obtenerIntereses(),
        "Carrera": obtenerCarrera(),
        "País de Origen": obtenerPais()
    };
    
    // Actualizar título del modal
    document.getElementById("modalLabel").textContent = "Datos del Registro";
    
    // Crear tabla con los datos usando DOM
    crearTabla(datosFormulario);
    
    // Mostrar el modal
    modal.show();
};

// Agregando eventos al botón
button.onclick = () => {
    mostrarDatos();
};