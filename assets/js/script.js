import { productos } from './data.js';

const tableBody = document.getElementById('my_table-body')


let productosGlobal = [...productos]

const addProduct = () => {
    const newProduct = {
        id: generateId(),
        nombre: 'Pantalones',
        precio: 39.99,
        categoria: 'Ropa',
        descripcion: 'Pantalones vaqueros ajustados',
        disponible: true,
        stock: 30,
        fechaAgregado: '2023-03-15',
        calificaciones: [4, 3, 4, 4],
        imagen: './assets/img/default.png'
    }

    productosGlobal.push(newProduct)

    renderData(tableBody, productosGlobal)
    countAndRenderTotal(productosGlobal)
    countAndRenderDiponible(productosGlobal)
}


const deleteProduct = (event) => {
    const id = event.target.dataset.id

    productosGlobal = productosGlobal.filter((producto) => producto.id != id)

    renderData(tableBody, productosGlobal)
    countAndRenderTotal(productosGlobal)
    countAndRenderDiponible(productosGlobal)
}

const handleSwicthChange = (event) => {
    const id = event.target.dataset.id
    const checked = event.target.checked

    const producto = productosGlobal.find((producto) => producto.id == id)
    producto.disponible = checked;

    renderData(tableBody, productosGlobal)
    countAndRenderDiponible(productosGlobal)

}

const generateId = () => {
    const maxID = productosGlobal.reduce((max, producto) => (producto.id > max ? producto.id : max), 0);

    return maxID + 1
}

const addEventListeners = () => {

    document.querySelectorAll('input.mySwitch').forEach((element) => {
        element.addEventListener('change', handleSwicthChange)
    })


    document.querySelectorAll(".delete").forEach((element) => {
        element.addEventListener('click', deleteProduct)
    })
}

const countAndRenderTotal = (productos) => {
    const total = productos.length
    document.getElementById('total').innerText = total
}

const countAndRenderDiponible = (productos) => {
    const disponible = productos.reduce((counter, producto) => {
        if (producto.disponible) counter++
        return counter
    }, 0)

    document.getElementById('disponible').innerText = disponible
}

function renderData(container, products) {

    container.innerHTML = '';

    products.forEach((producto) => {
        const row = document.createElement('tr')

        row.innerHTML = `
            <th scope="row">${producto.id}</th>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.categoria}</td>
            <td>${producto.stock}</td>
            <td>
                <div class="form-check form-switch">
                    <input
                    ${producto.disponible ? 'checked' : ''}
                    data-id="${producto.id}"
                        class="form-check-input mySwitch"
                        type="checkbox"
                        id="mySwitch${producto.id}"
                        name="darkmode"
                        value="yes"
                    >
                    <label class="form-check-label" for="mySwitch${producto.id}">
                        ${producto.disponible ? 'Disponible' : 'No disponible'}
                    </label>
                </div>
            </td>
            <td>
                <button
                    type="button"
                    class="btn btn-danger delete"
                    data-id="${producto.id}"
                >
                    X
                </button>
            </td>
        `;

        container.appendChild(row)
    })

    addEventListeners()
}

document.getElementById('add_product').addEventListener('click', addProduct)

renderData(tableBody, productos)
countAndRenderTotal(productos)
countAndRenderDiponible(productos)


