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
}

function AddProductCart(productos, cart, id, form) {
    let productoBuscado = productos.find(producto => producto.id === Number(id))
    let productoEnCarrito = cart.find(producto => producto.id === productoBuscado.id)

    if (productoBuscado.variedad && productoBuscado.variedad.length > 0) {
        // Si el producto tiene variedades, verificar la selección
        let selectedVarianteIndex = -1
        if (form) {
            selectedVarianteIndex = Number(form.querySelector(`input[name="variante-${id}"]:checked`).value)
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
                    subtotal: productoBuscado.variedad[selectedVarianteIndex].precio,
                    rutaImagen: productoBuscado.rutaImagen
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
                productoEnCarrito.unidades++;
                productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario;
            } else {
                // Agregar la propiedad rutaImagen al producto en el carrito
                cart.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.nombre,
                    precioUnitario: productoBuscado.precio,
                    unidades: 1,
                    subtotal: productoBuscado.precio,
                    rutaImagen: productoBuscado.rutaImagen
                });
            }
            productoBuscado.stock--;
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            alert("No hay más stock del producto seleccionado");
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

    // Función para lanzar modal con productos agregados
    btnCart.addEventListener("click", () => {
        popUpCart()
    });
}
function popUpCart() {
    let modalCart = document.getElementById("cartModal")
    let modalBody = modalCart.querySelector(".modal-body")

    // Borrar el contenido actual del modal
    modalBody.innerHTML = ""

    // Inicializamos la variable para calcular el total
    let total = 0

    cart.forEach((producto) => {
        let productoDiv = document.createElement("div");
        productoDiv.className = "mb-2";

        // Agregar la imagen del producto
        let imagenProducto = document.createElement("img");
        imagenProducto.src = `./assets/img/${producto.rutaImagen}`;
        imagenProducto.className = "cart-product-image";
        productoDiv.appendChild(imagenProducto);

        // Agregar el nombre del producto
        let nombreProducto = document.createElement("span");
        nombreProducto.textContent = producto.nombre;
        nombreProducto.className = "cart-product-name";
        productoDiv.appendChild(nombreProducto);

        // Agregar la cantidad
        let cantidadProducto = document.createElement("span");
        cantidadProducto.textContent = `Cantidad: ${producto.unidades}`;
        cantidadProducto.className = "cart-product-quantity";
        productoDiv.appendChild(cantidadProducto);

        // Calcular y agregar el subtotal
        let subtotalProducto = document.createElement("span");
        subtotalProducto.textContent = `Subtotal: $${producto.subtotal}`;
        subtotalProducto.className = "cart-product-subtotal";
        productoDiv.appendChild(subtotalProducto);

        // Actualizar el total
        total += producto.subtotal;

        modalBody.appendChild(productoDiv);
    });

    // Agregar el total al final
    let totalDiv = document.createElement("div");
    totalDiv.className = "cart-total";
    totalDiv.textContent = `Total: $${total}`;
    modalBody.appendChild(totalDiv);


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

        btnComprar.classList.toggle("d-none")
    })
}
comprar()

createCards(productos, cart)

let botonBuscar = document.getElementById("search-button")
let searchInput = document.getElementById("form-imput-search")

botonBuscar.addEventListener("click", () => {
    let searchText = searchInput.value.trim().toLowerCase()
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

// Eventos al botón tipo de mascota para listar sus productos
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

// Iniciar contador al cargar todo el DOM
document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter()
})
