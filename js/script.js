// clase de producto
class producto{
    constructor(id, nombre, color, precio, stock,){
        this.id = id;
        this.nombre = nombre;
        this.color = color;
        this.precio = precio;
        this.stock = stock;
    }
}

// array con los productos disponibles 
const productos = [];
productos.push(new producto(1, "remera", "verde", 20000, 10));
productos.push(new producto(2, "gorra", "roja", 5000, 2));
productos.push(new producto(3, "buzo", "negro", 40000, 60));
productos.push(new producto(4, "campera", "azul y negro", 70000, 50));
productos.push(new producto(5, "guantes", "negro", 1500, 45));
productos.push(new producto(6, "medias", "azul", 2000, 88));


const carrito = [];
let numCarrito = 0;


// Agrega al carrito y validacion de stock
function agregarProductoAlCarrito(id){
    let productoAgregado = productos.find((p) => p.id === id);
    let stockId = "stock" + id;
    let stockDOM = document.getElementById(stockId);
    if(productoAgregado.stock<1){
        alert("No hay stock del producto, lo siento.")
    }
    else{
        carrito.push(productoAgregado);
        let contadorCarrito = document.getElementById('contador-carrito');
        numCarrito = numCarrito + 1;
        contadorCarrito.innerHTML = numCarrito;
        for(product of productos){
            if(productoAgregado===product){
                product.stock = product.stock-1;
                stockDOM.innerHTML = `Stock: ${product.stock}`;
            }
        }
    }
}


// Eliminar producto del carrito: Valida si el producto esta en el carrito y si el carrito esta vacio, ajusta stock
function eliminarProductoDelCarrito(id){
    let productoEliminado = carrito.find((p) => p.id === id);
    let stockId = "stock" + id;
    let stockDOM = document.getElementById(stockId);
    let idProductoEliminado = carrito.indexOf(productoEliminado);
    let verificaProducto = false;
    verificaProducto = carrito.includes(productoEliminado);
    
    if(carrito.length<1){
        console.log("No tienes nada en el carrito como para eliminar.");
    }
    else{
        if(verificaProducto){
            carrito.splice(idProductoEliminado, 1);
            let contadorCarrito = document.getElementById('contador-carrito');
            numCarrito = numCarrito - 1;
            contadorCarrito.innerHTML = numCarrito;
            for(product of productos){
                if(productoEliminado===product){
                    product.stock = product.stock+1;
                    stockDOM.innerHTML = `Stock: ${product.stock}`;
                }
            }
        }
        else{
            console.log("No tienes el producto en el carrito.");
        }
    }
}



// Compra del carrito: Valida si esta vacio el carrito, suma el precio de los productos, vacia el carrito, vuelve a listar los productos
function comprarCarrito(){
    let contadorCarrito = document.getElementById('contador-carrito');
    let suma = 0;
    if(carrito.length<1){
        alert("No hay nada en tu carrito para comprar!");
    }else{
        for(carrit of carrito){
            suma += carrit.precio;
        }
        alert("Compraste los productos del carrito, precio final: " + suma);
        carrito.splice(0);
        alert("Compra exitosa.");
        listaCarrito.innerHTML = '';
        sumaPrecio.innerHTML = `Suma: $0`;
        numCarrito = 0;
        contadorCarrito.innerHTML = numCarrito;
        localStorage.removeItem('carrito');
    }
}


const cargarProductosAlDOM = () =>{
    let sectionProductos = document.getElementById('productos');
    let lista = document.createElement('ul');

    productos.forEach(producto => {
        let item = document.createElement('li');
        item.innerHTML = `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}
    <p class="card-text">Color: ${producto.color}</p>
    <p class="card-text">Precio: $${producto.precio}</p>
    <p id="stock${producto.id}" class="card-text">Stock: ${producto.stock}</p>
    <button class="btn btn-primary agregar-carrito" value="${producto.id}">Agregar al carrito</button>
  </div>
</div>`;
        lista.appendChild(item);
    })

    sectionProductos.appendChild(lista);
}

cargarProductosAlDOM();


let botonAgregarCarrito = document.querySelectorAll('.agregar-carrito')
botonAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', () => {
        const idProducto = parseInt(boton.value);
        agregarProductoAlCarrito(idProducto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    });
});


let botonCarrito = document.getElementById('botonCarrito');
let listaCarrito = document.getElementById('listaCarrito');
let sumaPrecio = document.getElementById("sumaPrecio");
botonCarrito.addEventListener('click', () => {
    let sumaCarrito=0;
    listaCarrito.innerHTML = '';
    carrito.forEach(producto => {
    let item = document.createElement('li');
    item.innerHTML = `producto: ${producto.nombre}, precio: $${producto.precio} <button class="eliminarProducto" value="${producto.id}">X</button>`;
    sumaCarrito = sumaCarrito + producto.precio;
    listaCarrito.appendChild(item);
})
sumaPrecio.innerHTML = `Suma: $${sumaCarrito}`;
let eliminarProducto = document.querySelectorAll('.eliminarProducto');
eliminarProducto.forEach(boton => {
    boton.addEventListener('click', () => {
        const idProducto = parseInt(boton.value);
        eliminarProductoDelCarrito(idProducto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        const cerrarCarrito = document.querySelector('#cerrarCarrito');
        cerrarCarrito.click();
    });
});
}) 


let botonComprarCarrito = document.getElementById('comprarCarrito');
botonComprarCarrito.addEventListener('click', () => {
    comprarCarrito();
}) 

const carritoAlmacenado = JSON.parse(localStorage.getItem('carrito'));
if(carritoAlmacenado!==null){
    for (let i = 0; i < carritoAlmacenado.length; i++) {
        carrito.push(carritoAlmacenado[i]);
        numCarrito = carritoAlmacenado.length;
        let contadorCarrito = document.getElementById('contador-carrito');
        contadorCarrito.innerHTML = numCarrito;
    }
}



