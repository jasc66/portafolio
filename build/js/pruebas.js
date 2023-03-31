const btn = document.getElementById('button');

document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        
        asunto: '',
        mensaje: ''
    }
    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCopia = document.querySelector('#copia');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //asignar un eventos
    inputEmail.addEventListener('input', validar);
    inputCopia.addEventListener('input', validarCopia);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    //formulario.addEventListener('submit', enviarCorreo);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        btnSubmit.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'template_ck5shih';
     
        emailjs.sendForm(serviceID, templateID, this)
         .then(() => {
            btnSubmit.value = 'Send Email';
           alert('Sent!');
         }, (err) => {
            btnSubmit.value = 'Send Email';
           alert(JSON.stringify(err));
         });

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();
            
            //Crear alerta 
            const alertaExito = document.createElement('P');
            alertaExito.textContent = mensaje;
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove(); 
            }, 3000);
            
        }, 3000);
    }

    function enviarCorreo(e) {
        
        e.preventDefault();

        btnSubmit.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'template_ck5shih';
     
        emailjs.sendForm(serviceID, templateID, this)
         .then(() => {
            btnSubmit.value = 'Send Email';
           alert('Sent!');
         }, (err) => {
            btnSubmit.value = 'Send Email';
           alert(JSON.stringify(err));
         });

          //Crear alerta 
          const alertaExito = document.createElement('P');
          alertaExito.textContent = mensaje;
          alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
          alertaExito.textContent = 'Mensaje enviado correctamente';

          formulario.appendChild(alertaExito);

          setTimeout(() => {
              alertaExito.remove(); 
          }, 3000);
     
    }



    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
            
        }
                
        //Limpiar alerta
        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();


    }
    function validarCopia(e) {

        if (e.target.id === 'copia' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            
            comprobarEmail();
            return;
        }
        if (e.target.value.trim() === '') {
            limpiarAlerta(e.target.parentElement);
            return;
        }
        
        //Limpiar alerta
        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
        
    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprueba si ya existe una alerta 
        limpiarAlerta(referencia);

        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        //Inyectar el error al formulario
        referencia.appendChild(error);
     
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;

    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        // reiniciar el objeto
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }

});



document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_ck5shih';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});