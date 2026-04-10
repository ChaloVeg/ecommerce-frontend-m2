const productos = [
    { 
        id: 1, 
        nombre: "Cargador Zeeclo Polaris", 
        precio: 45000, 
        img: "img/cargador.jpg",
        descripcion: "Cargador original de carga rápida para scooters Zeeclo Polaris. Garantiza una carga segura y eficiente para tu movilidad."
    },
    { 
        id: 2, 
        nombre: "Kit Mantención MG ZS", 
        precio: 85000, 
        img: "img/kit.jpg",
        descripcion: "Kit completo de mantención para MG ZS. Incluye filtros de aceite, aire, habitáculo y repuestos originales para el óptimo cuidado de tu vehículo."
    },
    { 
        id: 3, 
        nombre: "Filtro de Aire Industrial", 
        precio: 12000, 
        img: "img/filtro.jpg",
        descripcion: "Filtro de aire de alta capacidad para uso industrial. Diseñado para retener partículas finas, prolongando la vida útil y el rendimiento de tus equipos."
    },
    { 
        id: 4, 
        nombre: "Llanta MG", 
        precio: 74000, 
        img: "img/Llanta.jpg",
        descripcion: "Llanta de aleación original para vehículos MG. Diseño deportivo, altamente resistente y ligero para mejorar el rendimiento y la estética."
    }
];

// Inicializar el carrito desde localStorage o como un arreglo vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    
    contenedor.innerHTML = "";
    productos.forEach(p => {
        const item = document.createElement('div');
        item.className = 'col-12 col-md-6 col-lg-3'; 
        item.innerHTML = `
            <div class="card h-100 border-0 shadow-sm">
                <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title h6">${p.nombre}</h5>
                    <p class="fw-bold text-dark">$${p.precio.toLocaleString()}</p>
                    <div class="mt-auto d-grid gap-2">
                        <a href="detalle.html?id=${p.id}" class="btn btn-sm btn-outline-dark">Detalles</a>
                        <button onclick="sumarAlCarrito(${p.id})" class="btn btn-sm btn-primary">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(item);
    });
    // Actualizar el contador apenas carga la página
    actualizarContadorVisual();
}

function sumarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        // Guardar en localStorage (debe ser un string) 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorVisual();
    }
}

function actualizarContadorVisual() {
    const badge = document.getElementById('contador-carrito');
    if (badge) {
        badge.innerText = carrito.length;
    }
}

function renderizarFooter() {
    const footer = document.getElementById('mi-footer');
    if (footer) {
        footer.innerHTML = `
            <div class="container text-center">
                <p class="mb-0">&copy; 2026 TurboStore Chalo - Repuestos Industriales</p>
                <small class="text-muted">Proyecto MVP para Bootcamp Academy</small>
            </div>
        `;
    }
}

function mostrarDetalleProducto() {
    const contenedorDetalle = document.getElementById('contenedor-detalle');
    if (!contenedorDetalle) return; // Si no estamos en detalle.html, salimos

    // Obtener el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const producto = productos.find(p => p.id === id);

    if (producto) {
        contenedorDetalle.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-6 mb-4">
                    <img src="${producto.img}" class="img-fluid rounded shadow-sm" alt="${producto.nombre}">
                </div>
                <div class="col-md-6">
                    <h1 class="display-5 fw-bold">${producto.nombre}</h1>
                    <p class="text-primary h3 fw-bold mb-3">$${producto.precio.toLocaleString()}</p>
                    <p class="lead">${producto.descripcion}</p>
                    <hr>
                    <button onclick="sumarAlCarrito(${producto.id})" class="btn btn-primary btn-lg px-5">Agregar al Carrito</button>
                    <div class="mt-3">
                        <a href="index.html" class="text-decoration-none text-secondary">← Volver al catálogo</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        contenedorDetalle.innerHTML = '<div class="text-center py-5"><h2>Producto no encontrado</h2><a href="index.html" class="btn btn-primary mt-3">Volver al catálogo</a></div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCatalogo();
    renderizarFooter();
    mostrarDetalleProducto();
});