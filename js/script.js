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
        rutaImagen: "pelota_juegos.jpg",
        precio: 3990,
        stock: 4,
    },
]

let cartRecover = localStorage.getItem("cart")
let cart = cartRecover ? JSON.parse(cartRecover) : []

function createCards(productos, cart) {
    let products = document.getElementById("products")
    products.innerHTML = ""

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

        if (variedad && variedad.length > 0) {
            let form = document.createElement("form")
            form.id = `form-${id}`
            form.className = "flex-column"

            variedad.forEach((variante, index) => {
                let label = document.createElement("label")
                label.className = "d-flex gap-2"

                let radioInput = document.createElement("input")
                radioInput.type = "radio"
                radioInput.name = `variante-${id}`
                radioInput.value = index
                radioInput.required = true

                let labelText = document.createTextNode(`${variante.peso} kg - $ ${variante.precio}`)

                label.appendChild(radioInput)
                label.appendChild(labelText)

                form.appendChild(label)
            })

            let submitButton = document.createElement("button")
            submitButton.type = "submit"
            submitButton.className = "btn btn-primary btn-sm btn-violet"
            submitButton.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping"></i>`

            form.appendChild(submitButton)

            form.addEventListener("submit", (e) => {
                e.preventDefault()
                AddProductCart(productos, cart, id, form)
            })

            cardBody.appendChild(form)
        } else {
            let precioTexto = document.createElement("p")
            precioTexto.textContent = `$${precio}`

            let addButton = document.createElement("button")
            addButton.className = "btn btn-primary btn-sm btn-violet"
            addButton.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping"></i>`

            addButton.addEventListener("click", () => {
                AddProductCart(productos, cart, id, null)
            })

            cardBody.appendChild(precioTexto)
            cardBody.appendChild(addButton)
        }

        cardProducto.appendChild(cardImage)
        cardProducto.appendChild(cardBody)

        colDiv.appendChild(cardProducto)
        products.appendChild(colDiv)
    })
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

document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
})
