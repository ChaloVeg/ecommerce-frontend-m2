const productos = [
    { 
        id: 1, 
        nombre: "Cargador Zeeclo Polaris", 
        precio: 45000, 
        img: "https://images.pexels.com/photos/11039478/pexels-photo-11039478.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
        id: 2, 
        nombre: "Kit Mantención MG ZS", 
        precio: 85000, 
        img: "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
        id: 4, 
        nombre: "Filtro de Aire Industrial", 
        precio: 12000, 
        img: "https://images.pexels.com/photos/209243/pexels-photo-209243.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
        id: 4, 
        nombre: "Filtro de Aire Industrial", 
        precio: 12000, 
        img: "https://images.pexels.com/photos/209243/pexels-photo-209243.jpeg?auto=compress&cs=tinysrgb&w=400" 
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
                        <a href="detalle.html" class="btn btn-sm btn-outline-dark">Detalles</a>
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

document.addEventListener('DOMContentLoaded', mostrarCatalogo);