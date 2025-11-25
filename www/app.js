// Referencias
const btnAddCategory = document.getElementById('btn-add-category');
const modalCategoria = document.getElementById('modal-categoria');
const btnCancelCat = document.getElementById('btn-cancel-cat');
const btnSaveCat = document.getElementById('btn-save-cat');
const inputCatName = document.getElementById('input-cat-name');
const btnAddSite = document.getElementById('btn-add-site');





// Navegación a la página de detalle (Nuevo Sitio)
btnAddSite.addEventListener('click', () => {
    const categoryId = getSelectedCategoryId();
    console.log(categoryId.value)
    if(categoryId){
        // Si hay un ID, lo adjuntamos a la URL como un parámetro de consulta
        window.location.href = `detail.html?categoryId=${categoryId}`;
    }
    else {
            // Opcional: Avisar al usuario si no ha seleccionado una categoría
            alert('Por favor, selecciona una categoría válida antes de añadir un sitio.');
        }
    
});



//****************TEORIA***************************************************************/
//La etiqueta <dialog> javascript viene con funciones predefinidas showModal() y close()
//************************************************************************************/

//Modal Para crear nueva Categoria**********************************************

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

        item.id = cat.id; // Asignamos el ID real de la BBDD al elemento HTML
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
    loadSitesByCategory(item.id)
});


//app.get('/categories',listCategories)
async function loadCategories() {
    fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawCategories(data))

}

loadCategories();



//POST CATEGORY **********************************************************

//Al pulsar el boton se llama a la funcion createCategory que es la que interactua con el server
btnSaveCat.addEventListener('click', function () {
    createCategory();
})

//app.post('/categories', addNewCategory)
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

//DELETE CATEGORY

//app.delete('/categories/:id',delCategory)
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


//GET SITES asociados a una category
//app.get('/categories/:id', listCategorySites)


function drawSites(sites) {
    const tbody = document.getElementById('tabla-sites');
    tbody.innerHTML = '';

    sites.forEach(site => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
    
    <td>
        <div style="font-weight:600;">${site.name}</div>
        <div style="font-size:0.85em; color:var(--text-muted);">${site.url}</div>
    </td>
    <td>${site.user}</td>
    <td>${new Date(site.updatedAt).toLocaleDateString()}</td>
    <td class="actions-cell">
        <button class="btn-icon" title="Abrir"><span class="material-icons-round">open_in_new</span></button>
        <button class="btn-icon" title="Editar"><span class="material-icons-round">edit</span></button>
        <button class="btn-icon delete" title="Eliminar"><span
        class="material-icons-round">delete</span></button>
    </td>
    
    
    `;

        tbody.appendChild(fila);
    });


}

async function loadSitesByCategory(categoryId) {

    if (!categoryId) return;

    fetch(`http://localhost:3000/categories/${categoryId}`)
        .then(res => res.json())
        .then(data => drawSites(data.sites));
}



//seleccionar el id de la categoria que h sido seleccionada

function getSelectedCategoryId() {
    // Busca el elemento <li> que tenga la clase 'category-item' y la clase 'active'
    const activeCategoryElement = document.querySelector('.category-list .category-item.active');

    // Verifica si el elemento existe y si tiene un ID válido
    if (activeCategoryElement && activeCategoryElement.id) {
        return activeCategoryElement.id;
    }
    return null;
}






