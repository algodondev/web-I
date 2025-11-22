//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotification");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];
// índice para edición (-1 = modo agregar)
let editingIndex = -1;
// Guardar el HTML original del botón agregar para restaurarlo
const originalAgregarHtml = buttonAgregarPaciente ? buttonAgregarPaciente.innerHTML : "Guardar Datos";

/*  
Creado una función para que limpie el formulario  
siempre que se cargue la pagina o cuando se presione  
el boton limpiar del formulario  
*/  

const limpiarForm = () => {  
    inputNombre.value = "";  
    inputApellido.value = "";  
    inputFechaNacimiento.value = "";  
    inputRdMasculino.checked = false;  
    inputRdFemenino.checked = false;  
    cmbPais.value = 0;  
    inputDireccion.value = "";  
    inputNombrePais.value = "";  
    inputNombre.focus();  
};

/*
| Function para validar el ingreso del paciente
*/ 

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true
        ? "Mujer"
        : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;
    
    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        if (editingIndex === -1) {
            // modo agregar
            arrayPaciente.push(
                new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
            );
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            // modo editar: actualizar registro existente
            arrayPaciente[editingIndex] = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];
            mensaje.innerHTML = "Paciente actualizado correctamente";
            // salir del modo edición
            editingIndex = -1;
            if (buttonAgregarPaciente) buttonAgregarPaciente.innerHTML = originalAgregarHtml;
        }

        //Llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();
        // Actualizar tabla si está visible
        imprimirPacientes();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

//function que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        // añadimos data-index y clases para enlazar eventos tras renderizar
        $fila += '<tr>' +
            '<td scope="row" class="text-center fw-bold">' + contador + '</td>' +
            '<td>' + element[0] + '</td>' +
            '<td>' + element[1] + '</td>' +
            '<td>' + element[2] + '</td>' +
            '<td>' + element[3] + '</td>' +
            '<td>' + element[4] + '</td>' +
            '<td>' + element[5] + '</td>' +
            '<td>' +
            '<button data-index="' + (contador - 1) + '" type="button" class="btn btn-primary btn-editar me-1" title="Editar">' +
            '<i class="bi bi-pencil-square"></i>' +
            '</button>' +
            '<button data-index="' + (contador - 1) + '" type="button" class="btn btn-danger btn-eliminar" title="Eliminar">' +
            '<i class="bi bi-trash3-fill"></i>' +
            '</button>' +
            '</td>' +
            '</tr>';
        contador++;
    });

    return $fila;
}

const imprimirPacientes = () => {
    let $table = '<div class="table-responsive">' +
        '<table class="table table-striped table-hover table-bordered">' +
        '<tr>' +
        '<th scope="col" class="text-center" style="width:5%">#</th>' +
        '<th scope="col" class="text-center" style="width:15%">Nombre</th>' +
        '<th scope="col" class="text-center" style="width:15%">Apellido</th>' +
        '<th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>' +
        '<th scope="col" class="text-center" style="width:10%">Sexo</th>' +
        '<th scope="col" class="text-center" style="width:10%">País</th>' +
        '<th scope="col" class="text-center" style="width:25%">Dirección</th>' +
        '<th scope="col" class="text-center" style="width:10%">Opciones</th>' +
        '</tr>' +
        imprimirFilas() +
        '</table>' +
        '</div>';
    document.getElementById("idTablaPacientes").innerHTML = $table;
    // Después de renderizar la tabla, enlazar eventos a los botones dinámicos
    const container = document.getElementById("idTablaPacientes");
    if (container) {
        container.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                editarPaciente(idx);
            });
        });
        container.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                eliminarPaciente(idx);
            });
        });
    }
};

// Eliminar paciente por índice (0-based)
function eliminarPaciente(index) {
    if (index >= 0 && index < arrayPaciente.length) {
        arrayPaciente.splice(index, 1);
        mensaje.innerHTML = "Paciente eliminado";
        toast.show();
        // si estábamos editando ese registro, cancelar edición
        if (editingIndex === index) {
            editingIndex = -1;
            if (buttonAgregarPaciente) buttonAgregarPaciente.innerHTML = originalAgregarHtml;
            limpiarForm();
        }
        imprimirPacientes();
    }
}

// Preparar edición: cargar datos en el formulario y poner modo edición
function editarPaciente(index) {
    if (index >= 0 && index < arrayPaciente.length) {
        const p = arrayPaciente[index];
        inputNombre.value = p[0];
        inputApellido.value = p[1];
        inputFechaNacimiento.value = p[2];
        if (p[3] === 'Hombre') {
            inputRdMasculino.checked = true;
            inputRdFemenino.checked = false;
        } else if (p[3] === 'Mujer') {
            inputRdFemenino.checked = true;
            inputRdMasculino.checked = false;
        }
        // seleccionar país por texto (si existe)
        for (let i = 0; i < cmbPais.options.length; i++) {
            if (cmbPais.options[i].text === p[4]) {
                cmbPais.selectedIndex = i;
                break;
            }
        }
        inputDireccion.value = p[5];
        editingIndex = index;
        if (buttonAgregarPaciente) buttonAgregarPaciente.innerHTML = '<i class="bi bi-save"></i> Guardar cambios';
        inputNombre.focus();
    }
}

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Pais agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar función al momento de cargar la pagina HTML
limpiarForm();