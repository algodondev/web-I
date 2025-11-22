// Validaciones con expresiones regulares para la ficha de estudiante
const carnetInput = document.getElementById('idCarnet');
const nombreInput = document.getElementById('idNombreCompleto');
const duiInput = document.getElementById('idDUI');
const nitInput = document.getElementById('idNIT');
const fechaInput = document.getElementById('idFecha');
const correoInput = document.getElementById('idCorreo');
const edadInput = document.getElementById('idEdad');
const btnValidar = document.getElementById('btnValidar');
const btnLimpiarEst = document.getElementById('btnLimpiarEst');
const resultado = document.getElementById('resultadoValidacion');

// Expresiones regulares usadas
const regexCarnet = /^[A-Za-z]{2}\d{3}$/; // dos letras y tres números, e.g. AB001
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/; // solo letras y espacios
const regexDUI = /^\d{8}-\d{1}$/; // ########-#
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/; // ####-######-###-#
const regexFecha = /^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[0-2])[\/\-](\d{4})$/; // dd/mm/yyyy o dd-mm-yyyy
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexEdad = /^\d+$/;

function validarCampos() {
    const errores = [];

    const carnet = (carnetInput.value || '').trim();
    const nombre = (nombreInput.value || '').trim();
    const dui = (duiInput.value || '').trim();
    const nit = (nitInput.value || '').trim();
    const fecha = (fechaInput.value || '').trim();
    const correo = (correoInput.value || '').trim();
    const edad = (edadInput.value || '').trim();

    if (!regexCarnet.test(carnet)) errores.push('Carnet inválido. Formato: dos letras y tres números (ej: AB001)');
    if (!regexNombre.test(nombre)) errores.push('Nombre completo inválido. No debe contener números ni caracteres especiales.');
    if (!regexDUI.test(dui)) errores.push('DUI inválido. Formato: ########-#');
    if (!regexNIT.test(nit)) errores.push('NIT inválido. Formato: ####-######-###-#');
    if (!regexFecha.test(fecha)) errores.push('Fecha inválida. Formato: dd/mm/yyyy');
    if (!regexCorreo.test(correo)) errores.push('Correo electrónico inválido.');
    if (!regexEdad.test(edad)) errores.push('Edad inválida. Debe contener solo números.');

    showResultado(errores);
}

function showResultado(errors) {
    if (!resultado) return;
    if (errors.length === 0) {
        resultado.innerHTML = '<div class="alert alert-success" role="alert">Todos los campos son válidos.</div>';
    } else {
        const list = errors.map(e => '<li>' + e + '</li>').join('');
        resultado.innerHTML = '<div class="alert alert-danger" role="alert"><strong>Errores encontrados:</strong><ul>' + list + '</ul></div>';
    }
}

btnValidar.addEventListener('click', validarCampos);
btnLimpiarEst.addEventListener('click', () => {
    document.getElementById('formEstudiante').reset();
    resultado.innerHTML = '';
});

// Validación en tiempo real (opcional): al salir del campo mostrar si es válido
[carnetInput, nombreInput, duiInput, nitInput, fechaInput, correoInput, edadInput].forEach(input => {
    if (!input) return;
    input.addEventListener('blur', () => {
        // simplemente re-ejecutar la validación completa para simplicidad
        validarCampos();
    });
});
