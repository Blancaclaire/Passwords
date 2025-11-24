//Mostrar Categories**********************************************************
let drawData = (data) => {
    data.forEach(category => {
        let parent = document.getElementsByTagName('ul')[0]
        let child = document.createElement('li')
        // child.innerText = JSON.stringify(category)
        child.innerText = category.name
        parent.appendChild(child)
    })
}

fetch("http://localhost:3000/categories")
    .then(res => res.json())
    .then(data => drawData(data))

//*****************************************************************************Problema: He creado un anueva categoria, pero he tenido que recargar la pagina para que aparezca




//Modal Para crear New Categorie

// Referencias
const btnAddCategory = document.getElementById('btn-add-category');
const modalCategoria = document.getElementById('modal-categoria');
const btnCancelCat = document.getElementById('btn-cancel-cat');
const btnSaveCat = document.getElementById('btn-save-cat');
const inputCatName = document.getElementById('input-cat-name');

// 1. ABRIR
btnAddCategory.addEventListener('click', () => {
    modalCategoria.showModal();
});

// 2. CERRAR
btnCancelCat.addEventListener('click', () => {
    // Añadir clase de salida si quisieras animar el cierre, pero por simplicidad:
    modalCategoria.close();
    inputCatName.value = ''; // Limpiar al cancelar también es buena práctica
});

// 3. GUARDAR
btnSaveCat.addEventListener('click', async () => {
    const nombre = inputCatName.value.trim();

    if (!nombre) {
        // Puedes poner un borde rojo temporalmente
        inputCatName.style.borderColor = 'var(--danger-color)';
        setTimeout(() => inputCatName.style.borderColor = '', 2000);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nombre })
        });

        if (response.ok) {
            modalCategoria.close();
            inputCatName.value = '';
            // cargarCategorias(); // <--- TU FUNCIÓN PARA RECARGAR LA LISTA
        } else {
            alert('Error al crear la categoría');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
});