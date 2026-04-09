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

let carrito = [];

function mostrarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    
    // Limpiamos el contenedor por si acaso
    contenedor.innerHTML = "";

    productos.forEach(p => {
        const item = document.createElement('div');
        // Clase responsiva: 1 col en móvil, 2 en tablets, 4 en desktop [cite: 29, 32]
        item.className = 'col-12 col-md-6 col-lg-3'; 
        
        item.innerHTML = `
            <div class="card h-100 border-0 shadow-sm">
                <img src="${p.img}" class="card-img-top" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/400x300?text=Error+al+cargar'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title h6">${p.nombre}</h5>
                    <p class="fw-bold text-dark">$${p.precio.toLocaleString()}</p>
                    <div class="mt-auto d-grid gap-2">
                        <a href="detalle.html" class="btn btn-sm btn-outline-dark">Detalles</a>
                        <button onclick="sumarAlCarrito()" class="btn btn-sm btn-primary">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(item);
    });
}

function sumarAlCarrito() {
    carrito.push(1);
    const badge = document.getElementById('contador-carrito');
    if (badge) {
        badge.innerText = carrito.length;
    }
}

document.addEventListener('DOMContentLoaded', mostrarCatalogo);