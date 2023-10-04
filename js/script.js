// Función para generar un ID único usando un contador incremental
let contadorID = 1
function generarIDUnico() {
    return contadorID++
}

// Array de productos en objetos
let productos = [
    {
        id: generarIDUnico(),
        nombre: "Cat Chow",
        marca: "Purina",
        categoria: "Alimento",
        rutaImagen: "purina_cat_chow_cat.jpg",
        especie: "gato",
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
        nombre: "Gati",
        marca: "Purina",
        categoria: "Alimento",
        rutaImagen: "purina_gati_cat.jpg",
        especie: "gato",
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
        nombre: "One",
        marca: "Purina",
        categoria: "Alimento",
        rutaImagen: "purina_one_cat.jpg",
        especie: "gato",
        variedad: [
            {
                peso: 1.8,
                stock: 6,
                precio: 6990,
            },
            {
                peso: 5.5,
                stock: 7,
                precio: 14990,
            },
        ],
    },
    {
        id: generarIDUnico(),
        nombre: "Dog Chow",
        marca: "Purina",
        categoria: "Alimento",
        rutaImagen: "purina_dog_chow_dog.jpg",
        especie: "perro",
        variedad: [
            {
                peso: 5,
                stock: 10,
                precio: 13990,
            },
            {
                peso: 10,
                stock: 3,
                precio: 26990,
            },
        ],
    },
    {
        id: generarIDUnico(),
        nombre: "One",
        marca: "Purina",
        categoria: "Alimento",
        rutaImagen: "purina_one_dog.jpg",
        especie: "perro",
        variedad: [
            {
                peso: 1.8,
                stock: 6,
                precio: 6990,
            },
            {
                peso: 5.5,
                stock: 7,
                precio: 14990,
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
        especie: "gato / perro",
    },
    {
        id: generarIDUnico(),
        nombre: "Fury Ball",
        marca: "AFP",
        categoria: "Juguete",
        rutaImagen: "all-for-paws-juguetes-para-gatos-furry-ball.jpg",
        precio: 4690,
        stock: 4,
        especie: "gato",
    },
    {
        id: generarIDUnico(),
        nombre: "Pups cuerda suave multitextura",
        marca: "AFP",
        categoria: "Juguete",
        rutaImagen: "pups_cuerda_suave_multitextura.jpg",
        precio: 3990,
        stock: 4,
        especie: "perro",
    },
    {
        id: generarIDUnico(),
        nombre: "Lanzador interactivo de pelotas",
        marca: "AFP",
        categoria: "Juguete",
        rutaImagen: "interactive_fetch_mini.jpg",
        precio: 120990,
        stock: 4,
        especie: "gato / perro",
    },
    {
        id: generarIDUnico(),
        nombre: "Air dog squeaks bone",
        marca: "Kong",
        categoria: "Juguete",
        rutaImagen: "air_dog_kong_squeak.jpg",
        precio: 7990,
        stock: 4,
        especie: "perro",
    },
    {
        id: generarIDUnico(),
        nombre: "Cama anti estrés",
        marca: "Fabricación propia",
        categoria: "Bienestar",
        rutaImagen: "cama_anti_stress.jpg",
        precio: 13990,
        stock: 4,
        especie: "perro / gato",
    },
    {
        id: generarIDUnico(),
        nombre: "Cama Caracol",
        marca: "Fabricación propia",
        categoria: "Bienestar",
        rutaImagen: "cama_caracol.jpg",
        precio: 17990,
        stock: 2,
        especie: "perro / gato",
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
                form.className = "list-group list-group-flush flex-column"

                variedad.forEach((variante, index) => {
                    let label = document.createElement("label")
                    label.className = "d-flex list-group-item gap-2 px-0"

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

                cardBody.appendChild(form)
                form.appendChild(submitButton)

                form.addEventListener("submit", (e) => {
                    e.preventDefault()
                    AddProductCart(productos, cart, id, form)
                })

            } else {
                let precioTexto = document.createElement("p")
                precioTexto.textContent = `$ ${precio}`

                let addButton = document.createElement("button")
                addButton.className = "btn btn-primary btn-sm btn-violet w-100"
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
}

function AddProductCart(productos, cart, id, form) {
    let selectedVarianteIndex = -1
    
    let productoBuscado = productos.find(producto => producto.id === Number(id))
    
    // Mover la inicialización de selectedVarianteIndex aquí después de verificar si form existe
    if (form) {
        selectedVarianteIndex = Number(form.querySelector(`input[name="variante-${id}"]:checked`).value)
    }
    
    let productoEnCarrito = cart.find(producto => producto.id === productoBuscado.id && producto.varianteIndex === selectedVarianteIndex)
    
    if (productoBuscado) {
        if (productoBuscado.variedad && productoBuscado.variedad.length > 0) {
            if (selectedVarianteIndex >= 0 && productoBuscado.variedad[selectedVarianteIndex].stock > 0) {
                if (productoEnCarrito) {
                    productoEnCarrito.unidades++
                    productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
                    addToast(productoBuscado.nombre)
                } else {
                    cart.push({
                        id: productoBuscado.id,
                        nombre: productoBuscado.nombre,
                        precioUnitario: productoBuscado.variedad[selectedVarianteIndex].precio,
                        unidades: 1,
                        subtotal: productoBuscado.variedad[selectedVarianteIndex].precio,
                        rutaImagen: productoBuscado.rutaImagen,
                        varianteIndex: selectedVarianteIndex
                    })
                    addToast(productoBuscado.nombre)
                }
                productoBuscado.variedad[selectedVarianteIndex].stock--
                localStorage.setItem("cart", JSON.stringify(cart))
            } else {
                addToastFalse()
            }
        } else {
            if (productoBuscado.stock > 0) {
                if (productoEnCarrito) {
                    productoEnCarrito.unidades++
                    productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
                    addToast(productoBuscado.nombre)
                } else {
                    cart.push({
                        id: productoBuscado.id,
                        nombre: productoBuscado.nombre,
                        precioUnitario: productoBuscado.precio,
                        unidades: 1,
                        subtotal: productoBuscado.precio,
                        rutaImagen: productoBuscado.rutaImagen,
                        varianteIndex: selectedVarianteIndex
                    })
                    addToast(productoBuscado.nombre)
                }
                productoBuscado.stock--
                localStorage.setItem("cart", JSON.stringify(cart))
            } else {
                addToastFalse()
            }
        }
        
        updateCartCounter()
    }
}

function updateCartCounter() {
    let btnCart = document.getElementById("cartUpdate")
    let cartCounter = btnCart.querySelector(".badge")
    
    if (cart.length > 0) {
        btnCart.classList.remove("d-none")
        if (!cartCounter) {
            cartCounter = document.createElement("span")
            cartCounter.className = "badge text-bg-warning"
            btnCart.appendChild(cartCounter)
        }
        cartCounter.textContent = cart.reduce((total, producto) => total + producto.unidades, 0)
    } else {
        
        btnCart.classList.add("d-none")
        if (cartCounter) {
            cartCounter.remove()
        }
    }

    btnCart.addEventListener("click", () => {
        popUpCart()
    })
}

function popUpCart() {
    let modalCart = document.getElementById("cartModal")
    let modalBody = modalCart.querySelector(".modal-body")

    modalBody.innerHTML = ""

    let total = 0

    let groupedCart = groupCartByProduct(cart)

    for (let group of groupedCart) {
        let productoDiv = document.createElement("div")
        productoDiv.className = "mb-2"

        let producto = group[0]

        let imagenProducto = document.createElement("img")
        imagenProducto.src = `./assets/img/${producto.rutaImagen}`
        imagenProducto.className = "cart-product-image"
        productoDiv.appendChild(imagenProducto)

        let nombreProducto = document.createElement("span")

        // Agregar la variedad de peso si existe
        if (producto.variedad && producto.variedad.peso) {
            nombreProducto.textContent = `${producto.nombre} - Peso: ${producto.variedad.peso} kg`
        } else {
            nombreProducto.textContent = `${producto.nombre}`
        }

        nombreProducto.className = "cart-product-name"
        productoDiv.appendChild(nombreProducto)

        let totalGrupo = 0

        for (let item of group) {
            let cantidadProducto = document.createElement("span")
            cantidadProducto.textContent = ` - Cantidad: ${item.unidades}`

            cantidadProducto.textContent += ` - Precio: $${item.precioUnitario} - Subtotal: $${item.subtotal}`
            cantidadProducto.className = "cart-product-quantity"
            productoDiv.appendChild(cantidadProducto)

            totalGrupo += item.subtotal
        }

        let subtotalProducto = document.createElement("span")
        subtotalProducto.className = "cart-product-subtotal"
        productoDiv.appendChild(subtotalProducto)

        total += totalGrupo

        modalBody.appendChild(productoDiv)
    }

    let totalDiv = document.createElement("div")
    totalDiv.className = "cart-total"
    totalDiv.textContent = `Total: $${total}`
    modalBody.appendChild(totalDiv)
}

function groupCartByProduct(cart) {
    let groupedCart = []

    for (let item of cart) {
        let existingGroup = groupedCart.find(group => group[0].id === item.id && group[0].varianteIndex === item.varianteIndex)

        if (existingGroup) {
            existingGroup.push(item)
        } else {
            groupedCart.push([item])
        }
    }

    return groupedCart
}

function comprar() {
    let btnComprar = document.getElementById("comprar")
    btnComprar.addEventListener("click", () => {
        // Borramos los productos del carrito y localmente
        cart = [] // Borra el carrito en memoria
        localStorage.removeItem("cart") // Borra el carrito en el almacenamiento local
        updateCartCounter() // Actualiza el contador del carrito
    
        let modalCart = document.getElementById("cartModal")
        let modalBody = modalCart.querySelector(".modal-body")
    
        // Borrar el contenido actual del modal
        modalBody.innerHTML = `Gracias por tu compra`

        // Recargar la página
        setTimeout(() => {
            location.reload()
        }, 2000)
    })
}

// Toast para agregar a stock
function addToast(productoNombre) {
    Toastify({
        text: `Agregaste ${productoNombre} al carrito`,
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}

// Toast para falla en stock
function addToastFalse() {
    Toastify({
        text: `No queda existencias del producto`,
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #e93750, #900e3c)",
        }
    }).showToast()
}

comprar()

createCards(productos, cart)

// Captura de botón de búsqueda y el input
let botonBuscar = document.getElementById("search-button")
let searchInput = document.getElementById("form-imput-search")

// Convierte el texto de búsqueda a minúsculas antes de comparar
let searchText = searchInput.value.trim().toLowerCase();

// Productos a minúsculas antes de comparar
let searchFilter = productos.filter(producto => producto.nombre.toLowerCase().includes(searchText));


botonBuscar.addEventListener("click", () => {
    let searchText = searchInput.value.trim().toLowerCase()
    let searchFilter = productos.filter(producto => producto.nombre.toLowerCase().includes(searchText));
    createCards(searchFilter, cart)
    // Productos filtrados aquí
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

// Eventos al botón tipo de mascota para listar sus productos
let btnPerro = document.getElementById("perro")
btnPerro.addEventListener("click", () => {
    let searchFilter = productos.filter(producto => producto.especie.toLowerCase().includes("perro"))
    createCards(searchFilter, cart)
})

let btnGato = document.getElementById("gato")
btnGato.addEventListener("click", () => {
    let searchFilter = productos.filter(producto => producto.especie.toLowerCase().includes("gato"))
    createCards(searchFilter, cart)
})

// Iniciar contador al cargar todo el DOM
document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter()
})

// Filtro para categorias laterales
function generarOpcionesCategoria(productos) {
    let categoriaFiltro = document.getElementById("categoria-filtro")
    let categorias = [...new Set(productos.map((producto) => producto.categoria))]

    categorias.forEach((categoria) => {
        let listItem = document.createElement("li")
        listItem.innerHTML = `<label><input type="checkbox" value="${categoria}"> ${categoria}</label>`
        categoriaFiltro.appendChild(listItem)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    // Generar las opciones de categoría al cargar la página
    generarOpcionesCategoria(productos)

    let aplicarFiltrosBtn = document.getElementById("aplicar-filtros")
    let limpiarFiltrosBtn = document.getElementById("limpiar-filtros")

    aplicarFiltrosBtn.addEventListener("click", () => {
        // Obtener los valores seleccionados para categoría y rango de precios
        let categoriaSeleccionada = Array.from(document.querySelectorAll("#categoria-filtro input:checked")).map(
            (checkbox) => checkbox.value
        )
        let precioMin = document.getElementById("precio-min").value
        let precioMax = document.getElementById("precio-max").value
        
        // Filtrar productos según los criterios seleccionados
        let productosFiltrados = productos.filter((producto) => {
        let categoriaCoincide = categoriaSeleccionada.length === 0 || categoriaSeleccionada.includes(producto.categoria)

        if (producto.variedad && producto.variedad.length > 0) {
            // Si el producto tiene variedades, verificar si alguna variedad coincide con el rango de precios
            let algunaVariedadCoincide = producto.variedad.some(
                (variedad) =>
                    (!precioMin || variedad.precio >= precioMin) && (!precioMax || variedad.precio <= precioMax)
            )
            return categoriaCoincide && algunaVariedadCoincide
        } else {
            // Si el producto no tiene variedades, verificar si el precio del producto coincide con el rango de precios
            let precioCoincide = (!precioMin || producto.precio >= precioMin) && (!precioMax || producto.precio <= precioMax)
            return categoriaCoincide && precioCoincide
        }
        })

        // Actualizar la lista de productos con los productos filtrados
        createCards(productosFiltrados, cart)
    })

    limpiarFiltrosBtn.addEventListener("click", () => {
        // Limpiar los valores de categoría y rango de precios
        document.querySelectorAll("#categoria-filtro input:checked").forEach((checkbox) => (checkbox.checked = false))
        document.getElementById("precio-min").value = ""
        document.getElementById("precio-max").value = ""

        // Restablecer la lista de productos mostrando todos los productos
        createCards(productos, cart)
    })
})