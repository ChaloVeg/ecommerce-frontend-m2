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
        // Opcional: abrir modal o avisar al usuario
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
            <div class="container">
                <div class="row">
                    <div class="col-md-4 text-center text-md-start mb-4 mb-md-0">
                        <h5 class="fw-bold mb-3">TurboStore Chalo</h5>
                        <p class="small text-secondary mb-0">Especialistas en repuestos industriales y soluciones de movilidad eléctrica para flotas.</p>
                    </div>

                    <div class="col-md-4 text-center mb-4 mb-md-0">
                        <h6 class="text-uppercase fw-bold mb-3">Contacto</h6>
                        <ul class="list-unstyled small">
                            <li class="mb-2"><i class="bi bi-geo-alt-fill me-2"></i> Av. Industrial 1234, Pudahuel, Santiago</li>
                            <li class="mb-2"><i class="bi bi-telephone-fill me-2"></i> +56 9 1234 5678</li>
                            <li class="mb-2"><i class="bi bi-envelope-fill me-2"></i> contacto@turbostore.cl</li>
                        </ul>
                    </div>

                    <div class="col-md-4 text-center text-md-end">
                        <h6 class="text-uppercase fw-bold mb-3">Proyecto MVP</h6>
                        <p class="small mb-0 text-muted">Bootcamp Academy - Módulo 2</p>
                        <p class="small mb-0 text-muted">&copy; 2026 Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        `;
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
            </div>
        `;
    } else {
        contenedorDetalle.innerHTML = '<div class="text-center py-5"><h2>Producto no encontrado</h2><a href="index.html" class="btn btn-primary mt-3">Volver al catálogo</a></div>';
    }
}

function inicializarModalCarrito() {
    const modalHTML = `
        <div class="modal fade" id="carritoModal" tabindex="-1" aria-labelledby="carritoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="carritoModalLabel">Tu Carrito</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modal-body-carrito"></div>
                    <div class="modal-footer d-flex justify-content-between align-items-center border-top">
                        <h5 class="mb-0 fw-bold">Total: <span id="total-carrito" class="text-primary">$0</span></h5>
                        <div>
                            <button type="button" class="btn btn-outline-danger btn-sm me-2" onclick="vaciarCarrito()">Vaciar</button>
                            <button type="button" class="btn btn-success" id="btn-pagar" onclick="renderizarContenidoCarrito()">Ir a Pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function renderizarContenidoCarrito() {
    const modalBody = document.getElementById('modal-body-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const btnPagar = document.getElementById('btn-pagar');
    
    if (!modalBody) return;

    if (carrito.length === 0) {
        modalBody.innerHTML = '<p class="text-center text-muted my-4">Tu carrito está vacío.</p>';
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
                <div>
                    <h6 class="my-0">${p.nombre}</h6>
                    <small class="text-muted">$${p.precio.toLocaleString()}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger border-0" onclick="eliminarDelCarrito(${index})">
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        `;
    });
    html += '</ul>';
    
    modalBody.innerHTML = html;
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

    // Listener para actualizar el contenido cuando se abre el modal
    const modalEl = document.getElementById('carritoModal');
    if (modalEl) {
        modalEl.addEventListener('show.bs.modal', renderizarContenidoCarrito);
    }
});