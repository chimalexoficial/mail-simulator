document.addEventListener('DOMContentLoaded', function () {
    // Selecting elements
    const inputEmail = document.querySelector('#email');
    const inputSubject = document.querySelector('#subject');
    const inputMessage = document.querySelector('#message');
    const formulario = document.querySelector('#formulario');
    
    // Events

    const inputListener = (input) => {
        input.addEventListener('blur', e => {
            console.log(e.target.parentElement);
            const actualInput = e.target.id
            if(e.target.value.trim() === '') {
                showAlert(`The ${actualInput} field is required`, e.target.parentElement);
            } else {
                console.log('Not empty');
            }
        })
    };

    const showAlert = (mensaje, reference) => {
        // Is there an alert already?
        const alert = reference.querySelector('.bg-red-600');
        if(alert) {
            alert.remove();
        }
        // Generate HTML
        const error = document.createElement('p');
        error.textContent = mensaje;
       error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Error in form
        reference.appendChild(error);
    }

    inputListener(inputEmail);
    inputListener(inputSubject);
    inputListener(inputMessage);


})