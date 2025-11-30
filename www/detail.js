const api = new ApiService('http://localhost:3000');

// TOOGLE PASSWORD VISIBLE/NO-VISIBLE
const btnVerPass = document.getElementById('btn-ver-pass');
const inputPass = document.getElementById('input-pass');

if (btnVerPass && inputPass) {
    btnVerPass.addEventListener('click', () => {

        const icon = btnVerPass.querySelector('span');


        if (inputPass.type === 'password') {

            inputPass.type = 'text';
            icon.textContent = 'visibility_off';
            btnVerPass.title = "Ocultar contraseña";
        } else {

            inputPass.type = 'password';
            icon.textContent = 'visibility';
            btnVerPass.title = "Ver contraseña";
        }
    });
}


//Generar contraseña segura
const btGenPass = document.getElementById('btn-gen-pass');

btGenPass.addEventListener('click', function () {

    const longitud = 8;
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

    let passwordGenerada = "";

    for (let index = 0; index < longitud; index++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        passwordGenerada += caracteres.charAt(randomIndex);
    }

    inputPass.value = passwordGenerada;

})

//validaciones formulario

const camposAValidar = [
    { id: 'input-name', min: 3 }, 
    { id: 'input-pass', min: 6 }, 
    { id: 'input-user', min: 3 },
    { id: 'input-url',  min: 5 }
];

camposAValidar.forEach(regla => {
    const input = document.getElementById(regla.id);
    
    if (input) {
        //  Se dispara cuando sales de la casilla
        input.addEventListener('blur', () => {
            const texto = input.value.trim();
            
            // Si hay algo escrito PERO es más corto del mínimo
            if (texto.length > 0 && texto.length < regla.min) {
                input.style.borderColor = 'var(--danger-color)'; 
                input.style.backgroundColor = '#fef2f2';         
            } else {
                limpiarEstilo(input);
            }
        });

        // 2. Evento INPUT: Se dispara mientras escribes
        // Si el usuario empieza a corregirlo, quitamos el rojo inmediatamente
        input.addEventListener('input', () => {
            limpiarEstilo(input);
        });
    }
});

function limpiarEstilo(elemento) {
    elemento.style.borderColor = '';
    elemento.style.backgroundColor = '';
}


// POST SITE BY CATEGORY

const sbButton = document.querySelector('.btn-primary');


sbButton.addEventListener('click', function (e) {
    e.preventDefault();
    createSite();

})


async function createSite() {

    const Name = document.getElementById('input-name').value.trim();
    const URL = document.getElementById('input-url').value.trim();
    const UserEmail = document.getElementById('input-user').value.trim();
    const Password = document.getElementById('input-pass').value.trim();
    const Description = document.getElementById('input-desc').value.trim();


    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');

    console.log("Valor de CategoryId:", categoryId);

    if (!Name || !URL || !UserEmail || !Password) {

        alert('Rellena los campos obligatorios por favor (*)')
        return;
    }

    //Validación condiciones de campo
    if (Name.length < 3 || Password.length < 6) {
        alert("Revisa los campos marcados en rojo. Algunos datos son muy cortos.");
        return;
    }

    if (!categoryId) {
        alert("Error: No hay categoría seleccionada. Vuelve al inicio.");
        return;
    }

    const siteData = {
        name: Name,
        url: URL,
        user: UserEmail,
        password: Password,
        description: Description,
        categoryId: categoryId
    }

    try {
        // const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(siteData)
        // })

        await api.createSite(categoryId, siteData);

        console.log('Site guardado correctamente');


        window.location.href = `index.html?openCat=${categoryId}`;
      
    }
    catch (error) {
        console.error(error)
    }

};


