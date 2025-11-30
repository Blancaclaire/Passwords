
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





