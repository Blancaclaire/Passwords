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


// POST SITE BY CATEGORY

// createSite();


const sbButton = document.querySelector('.btn-primary');


sbButton.addEventListener('click', function (e) {
    e.preventDefault();
    createSite();
    window.location.href = 'index.html';
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
        const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(siteData)
        })

        if (response.ok) {
            console.log('site guardado correctamente');
            Name.value = '';
            URL.value = '';
            UserEmail.value = '';
            Password.value = '';
            Description.value = '';

        }
        else {
            console.error('Error al crear el site asociado a esta categoria')
        }
    }
    catch (error) {
        console.error(error)
    }

};





