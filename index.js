

const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []


Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})



function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {
    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.lenght; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemento[i]
            inputValue.value++;
            CarritoTotal()

            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}

function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        
        <th scope="row">1</th>
         <td class="table__prodcutos"> 
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
         </td>
         <td class="table__precio">
            <p>${item.precio}</p>
         </td>
         <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
         </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })

    CarritoTotal()

}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })
    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {

    Swal.fire({
        title: '¿Estas seguro que deseas elminar los productos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, borralo!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })


    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function () {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')



    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })

}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}

// let milanesas = []
// const contenedorMilanesas = document.querySelector("#milanesas")

// function cargarMilanesas() {
//     milanesas.forEach(producto => {
//         const div = document.createElement("div");
//         div.classList.add("producto");
//         div.innerHTML = `
//                 <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">

//                     <div class="col d-flex justify-content-center mb-4">
//                         <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
//                             <h5 class="card-title pt-2 text-center text-primary">${producto.nombre}</h5>
//                             <img src="${producto.imagen}" class="card-img-top" alt="...">

//                             <div class="card-body text-center">
//                                 <p class="card-text text-white-50 description">Guarnicion con papas fritas, pure o
//                                     ensalada.
//                                 </p>
//                                 <h5 class="text-primary">Precio: <span class="precio">${producto.precio}</span></h5>
//                                 <div class=" d-grid gap-2">
//                                     <button class="btn btn-primary button">Añadir a Carrito</button>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         `
//         contenedorMilanesas.append(div);
//     })
// }

// cargarMilanesas()


// fetch("productos.json")
//     .then(response => response.json())
//     .then(data => {
//         productos = data;
//         cargarMilanesas(productos)
//     })
//     .catch(error => console.log(error));


    