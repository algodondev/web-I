// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRÁ LOS NUEVOS ELEMENTOS

const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES

const buttonCrear = document.getElementById("idBtnCrear");

const buttonAddElemento = document.getElementById("idBtnAddElement");

const buttonValidar = document.getElementById("idBtnValidar");

// Array para almacenar los IDs de los controles creados
const controlIds = [];

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR

const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL

const tituloElemento = document.getElementById("idTituloElemento");

const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// AGREGANDO FUNCIONES
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    //validando que se haya seleccionado un elemento
    if (elemento != "") {
    // Metodo perteneciente al modal de bootstrap
    modal.show();
    } else {
    alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function () {
    // Validar que el ID no exista
    if (controlIds.includes(nombreElemento.value)) {
        alert(`El ID "${nombreElemento.value}" ya existe. Por favor, elija un ID diferente.`);
        return;
    }
    
    // Creado elementos
    let addElemento = document.createElement("select");
    //creado atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    //creado option para el select
    for (let i = 1; i <= 10; i++) {
    let addOption = document.createElement("option");
    addOption.value = i;
    addOption.innerHTML = `Option ${i}`;
    addElemento.appendChild(addOption);
    }

    //creado label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    //creado texto para label
    labelElemento.textContent = tituloElemento.value;

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    // Validar que el ID no exista
    if (controlIds.includes(nombreElemento.value)) {
        alert(`El ID "${nombreElemento.value}" ya existe. Por favor, elija un ID diferente.`);
        return;
    }
    
    // Creando elementos
    let addElemento = document.createElement("input");
    //creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    //creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-check");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
    
    // Agregar ID al array de controles
    controlIds.push(nombreElemento.value);
};

const newInput = function (newElemento) {
    // Validar que el ID no exista
    if (controlIds.includes(nombreElemento.value)) {
        alert(`El ID "${nombreElemento.value}" ya existe. Por favor, elija un ID diferente.`);
        return;
    }
    
    // Creando elementos de tipo = text, number, date, password, color, email y textarea
    let addElemento =
    newElemento == "textarea"
    ? document.createElement("textarea")
    : document.createElement("input");

    // creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    
    if (newElemento !== "textarea") {
        addElemento.setAttribute("type", newElemento);
    }
    
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    //creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    //creando texto para label
    labelElemento.textContent = tituloElemento.value;

    //creando el elemento i como hijo del label, afterbegin le
    // indicamos que se creara antes de su primer hijo
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    //Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");

    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    //Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    //Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
    
    // Agregar ID al array de controles
    controlIds.push(nombreElemento.value);
};

// FUNCIÓN PARA VALIDAR CONTROLES DEL FORMULARIO
const validarFormulario = function () {
    let resultado = "Validación de controles:\n\n";
    let todosValidos = true;
    
    // Recorrer todos los IDs almacenados
    for (let controlId of controlIds) {
        let elemento = document.getElementById(`id${controlId}`);
        
        if (!elemento) continue;
        
        let tipo = elemento.type || elemento.tagName.toLowerCase();
        let valor = "";
        let valido = false;
        
        // Validar según el tipo de control
        switch (tipo) {
            case "text":
            case "number":
            case "date":
            case "password":
            case "email":
            case "color":
            case "textarea":
                valor = elemento.value.trim();
                valido = valor !== "";
                resultado += `${controlId} (${tipo}): ${valido ? '✓ Completo' : '✗ Vacío'}\n`;
                break;
                
            case "radio":
            case "checkbox":
                valido = elemento.checked;
                resultado += `${controlId} (${tipo}): ${valido ? '✓ Seleccionado' : '✗ No seleccionado'}\n`;
                break;
                
            case "select":
            case "select-one":
                valor = elemento.value;
                valido = valor !== "";
                resultado += `${controlId} (select): ${valido ? '✓ Opción seleccionada' : '✗ Sin selección'}\n`;
                break;
        }
        
        if (!valido) todosValidos = false;
    }
    
    resultado += `\n${todosValidos ? '✓ Todos los controles son válidos' : '✗ Hay controles sin completar'}`;
    alert(resultado);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
    let elemento = cmbElemento.value;

    if (elemento == "select") {
    newSelect();
    } else if (elemento == "radio" || elemento == "checkbox") {
    newRadioCheckbox(elemento);
    } else {
    newInput(elemento);
    }
    } else {
    alert("Faltan campos por completar");
    }
};

buttonValidar.onclick = () => {
    if (controlIds.length === 0) {
        alert("No hay controles para validar. Agregue controles primero.");
    } else {
        validarFormulario();
    }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    // Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";
    // inicializando puntero en el campo del titulo para el control
    tituloElemento.focus();
});