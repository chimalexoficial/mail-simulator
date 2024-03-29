document.addEventListener('DOMContentLoaded', function () {
    // Selecting elements
    const inputEmail = document.querySelector('#email');
    const inputSubject = document.querySelector('#subject');
    const inputMessage = document.querySelector('#message');
    const form = document.querySelector('#form');
    const btnSubmit = document.querySelector('#form button[type="submit"]');
    const btnReset = document.querySelector('#form button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    const email = {
        email: '',
        subject: '',
        message: ''
    }
    // Events

    const inputListener = (input) => {
        input.addEventListener('input', e => {
            console.log(e.target.parentElement);
            const actualInput = e.target.id
            if (e.target.value.trim() === '') {
                showAlert(`The ${actualInput} field is required`, e.target.parentElement);
                email[e.target.name] = '';
                checkEmail();
                return;
            }
            if(e.target.id === 'email' && !emailValidator(e.target.value)) {
                showAlert(`The email is not valid`, e.target.parentElement);
                email[e.target.name] = '';
                checkEmail();
                return;
            }

            cleanAlert(e.target.parentElement);

            // Validation for each key on object
            email[e.target.name] = e.target.value.trim().toLowerCase();
            // console.log(email);

            // Email object
            checkEmail();

        })
    };

    const showAlert = (mensaje, reference) => {
        // Is there an alert already?
        cleanAlert(reference);

        // Generate HTML
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Error in form
        reference.appendChild(error);
    }

    function cleanAlert(reference) {
        const alert = reference.querySelector('.bg-red-600');
        if (alert) {
            alert.remove();
        }
    }

    function emailValidator(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const res = regex.test(email);
        return res;
    }

    function checkEmail() {
        console.log(email);
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    }

    inputListener(inputEmail);
    inputListener(inputSubject);
    inputListener(inputMessage);

    btnReset.addEventListener('click', (e) => {
        e.preventDefault();

        //reset button
        form.reset();

        //reset fields object
        email.email = '';
        email.message = '';
        email.subject = '';
        checkEmail();

    });

    //spinner, submit email
    form.addEventListener('submit', function submitEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        //spinner removed after 2 seconds
        setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');
        
        //reset fields object
        email.email = '';
        email.message = '';
        email.subject = '';

        //reset button
        form.reset();
        checkEmail();
        }, 3000);

        //sucsess message
        const success = document.createElement('p');
        success.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        success.textContent = `Message sent successfull, restarting form...`;
        form.appendChild(success);

        setTimeout(() => {
            success.remove();
        }, 2000);
    });


})