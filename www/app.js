//Modal Para crear nueva Categoria**********************************************

// Referencias
const btnAddCategory = document.getElementById('btn-add-category');
const modalCategoria = document.getElementById('modal-categoria');
const btnCancelCat = document.getElementById('btn-cancel-cat');
const btnSaveCat = document.getElementById('btn-save-cat');
const inputCatName = document.getElementById('input-cat-name');



//****************TEORIA***************************************************************/
//La etiqueta <dialog> javascript viene con funciones predefinidas showModal() y close()
//************************************************************************************/

btnAddCategory.addEventListener('click', () => {
    modalCategoria.showModal();
});

btnCancelCat.addEventListener('click', () => {

    modalCategoria.close();
    inputCatName.value = '';
});



//Mostrar Categories**********************************************************

//app.get('/categories',listCategories)
let drawCategories = (categories) => {
    const parent = document.getElementsByTagName('ul')[0];
    parent.innerHTML = '';

    categories.forEach(cat => {


        const item = document.createElement('li');
        item.className = 'category-item';
        item.innerHTML = `
        
        <div class="category-content">
                    <span>${cat.name}</span>
        </div>
                
        <button class="btn-delete-cat" title="Eliminar categoría">
                    <span class="material-icons-round" style="font-size: 16px;">delete</span>
        </button>
        
        `;

        clickCategorie(item);
        const deleteBtn = item.querySelector('.btn-delete-cat');
        deleteBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const confirmar = confirm(`¿Estás seguro de eliminar "${cat.name}"?`);
            if (confirmar) {
                await eliminarCategoria(cat.id);
            }
        });


        parent.appendChild(item);
    })
}


//La función permite hacer click sobre el elemento que se desea seleccionar de manera visual
let clickCategorie = (item) => item.addEventListener('click', function () {
    let categories = document.querySelectorAll('.category-item');
    categories.forEach(cat => {
        cat.classList.remove('active')
    });
    item.classList.add('active')
});


//app.get('/categories',listCategories)
async function loadCategories() {
    fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawCategories(data))

}
loadCategories();



//CrearCategoria **********************************************************

btnSaveCat.addEventListener('click', function() {
    createCategory();
})


async function createCategory() {

    const input = document.getElementById('input-cat-name');
    const categoryName = input.value.trim();


    console.log(categoryName);

    if (!categoryName) {
        input.style.border = "red";
        alert('Por favor rellena el campo')
        return
    }
    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: categoryName
            })

        });

        if (response.ok) {
            console.log('categoria guardada')
            modalCategoria.close();
            input.value = '';
            input.style.border = '';
            loadCategories();
        } else {
            console.error('Error 400: El servidor rechazó los datos. Revisa el body/headers.');
        }

    }
    catch (error) {
        console.error(error)

    }


}



// Nueva función auxiliar para borrar
async function eliminarCategoria(id) {
    try {
        const res = await fetch(`http://localhost:3000/categories/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            // Si se borra bien, recargamos la lista
           loadCategories();
        } else {
            alert("Error al eliminar la categoría");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
}



