const form = document.querySelector('form')

if (!form){
    console.log('No se ha encontrado ningún formulario: Saliendo...');
    exit(0);
}/*ReqJ1*/

function updatePreview(){
    const nombre = document.querySelector('#name').value;
    const telefono = document.querySelector('#phone').value;
    const correo = document.querySelector('#email').value;
    const mensaje = document.querySelector('#message').value;

    const preview = document.querySelector('#preview');

    preview.innerHTML = `
        <h3>Vista previa de contacto</h3>
        <p><strong>Nombre: </strong> ${nombre}</p>
        <p><strong>Telefono: </strong> ${telefono}</p>
        <p><strong>Correo electronico: </strong> ${correo}</p>
        <p><strong>Mensaje: </strong> ${mensaje}</p>
    `;
}/*ReqJ2*/

function checkValidityState(field){
    field.classList.remove('valid', 'invalid');
    if(field.checkValidity()){
        field.classList.add('valid');
    } else{
        field.classList.add('invalid')
    }
}/*ReqJ3*/

function validateForm(){
    const errorBox = document.getElementById('error-box');
    errorBox.textContent = '';
    errorBox.classList.remove('visible');

    if(!formulario.reportValidity()){ 
    return false;
    }
    
    const customError = checkCustomRules();
    if (customError){
        errorBox.textContent = customError;
        errorBox.classList.add('visible');
        const invalidField = document.querySelector(':invalid');
        if (invalidField) {
            invalidField.focus();
        }
        return false;
    }
    return true;
} /*ReqJ4*/

function checkCustomRules(){
    const selected = document.querySelector('input[name="discovery"]:checked');
    const messageInput = document.querySelector('#message');
    const message = messageInput.value.trim();

    if (!selected) return null;

    if(selected.value === "other" && message.length < 10){
        messageInput.focus(); /*ReqJ6*/
        return 'Si eliges "Otro motivo", explica un poco más en el mensaje.';
    }

    return null;
}/*ReqJ5*/

function handleKeydown(event){
    if(event.key === 'Enter'){
        const submitButton = document.getElementById('submit-btn');
        submitButton.classList.add('highlight');
    }
}/*ReqJ7*/

function handleKeyup(event){
    if(event.key === 'Enter'){
        const submitButton = document.getElementById('submit-btn');
        submitButton.classList.remove('highlight');
    }
}/*ReqJ7*/


function handleMouseOver(element){
    element.classList.add('highlight');
}/*ReqJ8*/

function handleMouseOut(element){
    element.classList.remove('highlight');
}/*ReqJ8*/

