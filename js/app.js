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
        // CORRECCIÓN 1: El nombre del archivo debe ser exacto (minúsculas/mayúsculas)
        img: "img/llanta.jpg", 
        descripcion: "Llanta de aleación original para vehículos MG. Diseño deportivo, altamente resistente y ligero para mejorar el rendimiento y la estética."
    }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    
    contenedor.innerHTML = "";
    productos.forEach(p => {
        const item = document.createElement('article');
        item.className = 'col-12 col-md-6 col-lg-3 mb-4'; 
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
}

function sumarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorVisual();
        // CORRECCIÓN 2: Actualiza el modal inmediatamente si el usuario agrega desde el detalle
        renderizarContenidoCarrito(); 
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
        footer.className = "bg-dark text-white py-5 mt-5";
        footer.innerHTML = `
            <div class="container text-center">
                <div class="row">
                    <div class="col-md-4 mb-4 mb-md-0">
                        <h5 class="fw-bold">TurboStore Chalo</h5>
                        <p class="small text-secondary">Repuestos y movilidad eléctrica.</p>
                    </div>
                    <div class="col-md-4 mb-4 mb-md-0">
                        <h6 class="text-uppercase fw-bold">Contacto</h6>
                        <p class="small mb-0">Av. Industrial 1234, Pudahuel</p>
                        <p class="small">+56 9 1234 5678</p>
                    </div>
                    <div class="col-md-4">
                        <h6 class="text-uppercase fw-bold">Proyecto MVP</h6>
                        <p class="small text-muted">Bootcamp Academy - Módulo 2</p>
                    </div>
                </div>
            </div>`;
    }
}

function mostrarDetalleProducto() {
    const contenedorDetalle = document.getElementById('contenedor-detalle');
    if (!contenedorDetalle) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const producto = productos.find(p => p.id === id);

    if (producto) {
        contenedorDetalle.innerHTML = `
            <div class="row align-items-center py-5">
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
            </div>`;
    }
}

function inicializarModalCarrito() {
    // CORRECCIÓN 3: Evitar duplicados si la función se llama varias veces
    if (document.getElementById('carritoModal')) return; 

    const modalHTML = `
        <div class="modal fade" id="carritoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title">Tu Carrito</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="modal-body-carrito"></div>
                    <div class="modal-footer d-flex justify-content-between border-top">
                        <h5 class="mb-0 fw-bold">Total: <span id="total-carrito" class="text-primary">$0</span></h5>
                        <div>
                            <button type="button" class="btn btn-outline-danger btn-sm" onclick="vaciarCarrito()">Vaciar</button>
                            <button type="button" class="btn btn-success" id="btn-pagar">Ir a Pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function renderizarContenidoCarrito() {
    const modalBody = document.getElementById('modal-body-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const btnPagar = document.getElementById('btn-pagar');
    
    if (!modalBody) return;

    if (carrito.length === 0) {
        modalBody.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío.</p>';
        totalCarrito.innerText = '$0';
        if (btnPagar) btnPagar.disabled = true;
        return;
    }

    if (btnPagar) btnPagar.disabled = false;
    let total = 0;
    let html = '<ul class="list-group list-group-flush">';
    carrito.forEach((p, index) => {
        total += p.precio;
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div><h6 class="my-0 small">${p.nombre}</h6><small class="text-muted">$${p.precio.toLocaleString()}</small></div>
                <button class="btn btn-sm text-danger" onclick="eliminarDelCarrito(${index})">&times;</button>
            </li>`;
    });
    modalBody.innerHTML = html + '</ul>';
    totalCarrito.innerText = `$${total.toLocaleString()}`;
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarContadorVisual();
    renderizarContenidoCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorVisual();
    renderizarContenidoCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarModalCarrito();
    mostrarCatalogo();
    renderizarFooter();
    mostrarDetalleProducto();
    actualizarContadorVisual();

    // Sincronización del modal
    const modalEl = document.getElementById('carritoModal');
    if (modalEl) {
        modalEl.addEventListener('show.bs.modal', renderizarContenidoCarrito);
    }
});