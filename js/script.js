// Función para generar un ID único usando un contador incremental
let contadorID = 1
function generarIDUnico() {
    return contadorID++
}

// Array de productos en objetos
let productos = [
    {
        id: generarIDUnico(),
        nombre: "Purina Cat Chow",
        marca: "Purina",
        categoria: "Alimento",
        rutaImagen: "purina_cat_chow_cat.jpg",
        especie:"gato",
        variedad: [
            {
                peso: 5,
                stock: 10,
                precio: 14990,
            },
            {
                peso: 10,
                stock: 3,
                precio: 24990,
            },
        ],
    },
    {
        id: generarIDUnico(),
        nombre: "Purina Gati",
        marca: "Purina",
        categoria: "Alimento",
        rutaImagen: "purina_gati_cat.jpg",
        especie:"gato",
        variedad: [
            {
                peso: 1,
                stock: 3,
                precio: 2990,
            },
            {
                peso: 3.5,
                stock: 3,
                precio: 4990,
            },
        ],
    },
    {
        id: generarIDUnico(),
        nombre: "Pelota de juegos",
        marca: "ABC Toys",
        categoria: "Juguete",
        rutaImagen: "pelota_juegos.webp",
        precio: 3990,
        stock: 4,
        especie:"gato / perro",
    },
]

let cartRecover = localStorage.getItem("cart")
let cart = cartRecover ? JSON.parse(cartRecover) : []

function createCards(productos, cart) {
    let products = document.getElementById("products")
    products.innerHTML = ""

    if (productos.length === 0) {
        // No se encontraron productos, muestra el mensaje
        let noProductsMessage = document.getElementById("no-products-message")
        noProductsMessage.style.display = "block"
    } else {
        // Hay productos para mostrar, oculta el mensaje
        let noProductsMessage = document.getElementById("no-products-message")
        noProductsMessage.style.display = "none"

        // Resto del código para crear las tarjetas de productos...
        productos.forEach(({ nombre, marca, precio, variedad, rutaImagen, id }) => {
            let colDiv = document.createElement("div")
            colDiv.className = "col"

            let cardProducto = document.createElement("div")
            cardProducto.className = "card h-100"

            let cardImage = document.createElement("img")
            cardImage.className = "card-img-top"
            cardImage.src = `./assets/img/${rutaImagen}`

            let cardBody = document.createElement("div")
            cardBody.className = "card-body"

            let titulo = document.createElement("h3")
            titulo.textContent = nombre

            let marcaTexto = document.createElement("h5")
            marcaTexto.textContent = marca

            cardBody.appendChild(titulo)
            cardBody.appendChild(marcaTexto)

            // Resto del código para crear las tarjetas de productos...
            // ...

            cardProducto.appendChild(cardImage)
            cardProducto.appendChild(cardBody)

            colDiv.appendChild(cardProducto)
            products.appendChild(colDiv)
        })
    }
}


function AddProductCart(productos, cart, id, form) {
    let productoBuscado = productos.find(producto => producto.id === Number(id))
    let productoEnCarrito = cart.find(producto => producto.id === productoBuscado.id)

    if (productoBuscado.variedad && productoBuscado.variedad.length > 0) {
        // Si el producto tiene variedades, verificar la selección
        let selectedVarianteIndex = -1;
        if (form) {
            selectedVarianteIndex = Number(form.querySelector(`input[name="variante-${id}"]:checked`).value);
        }

        if (selectedVarianteIndex >= 0 && productoBuscado.variedad[selectedVarianteIndex].stock > 0) {
            if (productoEnCarrito) {
                productoEnCarrito.unidades++
                productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
            } else {
                cart.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.nombre,
                    precioUnitario: productoBuscado.variedad[selectedVarianteIndex].precio,
                    unidades: 1,
                    subtotal: productoBuscado.variedad[selectedVarianteIndex].precio
                })
            }
            productoBuscado.variedad[selectedVarianteIndex].stock--
            localStorage.setItem("cart", JSON.stringify(cart))
        } else {
            alert("No hay más stock de la variante seleccionada")
        }
    } else {
        if (productoBuscado.stock > 0) {
            if (productoEnCarrito) {
                productoEnCarrito.unidades++
                productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
            } else {
                cart.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.nombre,
                    precioUnitario: productoBuscado.precio,
                    unidades: 1,
                    subtotal: productoBuscado.precio
                })
            }
            productoBuscado.stock--
            localStorage.setItem("cart", JSON.stringify(cart))
        } else {
            alert("No hay más stock del producto seleccionado")
        }
    }

    // Actualizar el contador del carrito
    updateCartCounter();
}

function updateCartCounter() {
    let btnCart = document.getElementById("cartUpdate")
    let cartCounter = btnCart.querySelector(".badge")

    if (cart.length > 0) {
        btnCart.classList.remove("d-none")
        if (!cartCounter) {
            cartCounter = document.createElement("span")
            cartCounter.className = "badge text-bg-secondary"
            btnCart.appendChild(cartCounter)
        }
        cartCounter.textContent = cart.reduce((total, producto) => total + producto.unidades, 0)
    } else {
        btnCart.classList.add("d-none")
        if (cartCounter) {
            cartCounter.remove()
        }
    }
}

createCards(productos, cart)

let botonBuscar = document.getElementById("search-button")
let searchInput = document.getElementById("form-imput-search")

botonBuscar.addEventListener("click", () => {
    let searchText = searchInput.value.trim().toLowerCase();
    let searchFilter = productos.filter(producto => producto.nombre.toLowerCase().includes(searchText))
    createCards(searchFilter)
})

// Función para restablecer todos los productos sin filtrar
function resetProducts() {
    let searchInput = document.getElementById("form-imput-search")
    searchInput.value = ""
    createCards(productos, cart)
}

// Evento al botón tienda para restablecer los productos
let btnTienda = document.getElementById("tienda")
btnTienda.addEventListener("click", resetProducts)

// Evento al botón tipo de mascota para listar sus productos
let btnPerro = document.getElementById("perro")
btnPerro.addEventListener("click", () => {
    let searchFilter = productos.filter(producto => producto.especie.toLowerCase().includes("perro"))
    createCards(searchFilter)
})
let btnGato = document.getElementById("gato")
btnGato.addEventListener("click", () => {
    let searchFilter = productos.filter(producto => producto.especie.toLowerCase().includes("gato"))
    createCards(searchFilter)
})


document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter()
})
