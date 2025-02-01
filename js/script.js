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
        Toastify({
            text: "No hay stock del producto, lo siento.",
            style: {
                background: "linear-gradient(to right,rgb(250, 162, 162),rgb(255, 0, 0))",
                color: "white",
                fontWeight: "bold",
              }
          }).showToast();
    }
    else{
        Toastify({
            text: "Producto agregado al carrito!.",
            style: {
                background: "linear-gradient(to right,rgb(122, 250, 160),rgb(0, 255, 0))",
                color: "white",
                fontWeight: "bold",
              }
          }).showToast();
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
    if(!carrito.length<1){
        for(carrit of carrito){
            suma += carrit.precio;
        }
        carrito.splice(0);
        listaCarrito.innerHTML = '';
        sumaPrecio.innerHTML = `Suma: $0`;
        numCarrito = 0;
        contadorCarrito.innerHTML = numCarrito;
        localStorage.removeItem('carrito');
    }
}


const cargarProductosAlDOM = (arrayRecibido) =>{
    let sectionProductos = document.getElementById('productos');
    let lista = document.createElement('ul');

    arrayRecibido.forEach(producto => {
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

cargarProductosAlDOM(productos);


let botonAgregarCarrito = document.querySelectorAll('.agregar-carrito')
botonAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', () => {
        const idProducto = parseInt(boton.value);
        agregarProductoAlCarrito(idProducto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    });
});



let sumaPrecio = document.getElementById("sumaPrecio");
const cargarCarrito = () => {
    let listaCarrito = document.getElementById('listaCarrito');
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
        Swal.fire({
            title: "¿Está seguro?",
            text: "Estas eliminando un producto del carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, bórralo!",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                const idProducto = parseInt(boton.value);
                eliminarProductoDelCarrito(idProducto);
                cargarCarrito();
                localStorage.setItem('carrito', JSON.stringify(carrito));
              Swal.fire({
                title: "¡Eliminado!",
                text: "Su producto ha sido eliminado.",
                icon: "success"
              });
            }
          });
    })});
};


let botonCarrito = document.getElementById('botonCarrito');
botonCarrito.addEventListener('click', () => {
    cargarCarrito();
});



let botonComprarCarrito = document.getElementById('comprarCarrito');
botonComprarCarrito.addEventListener('click', () => {
    if(carrito.length<1){
        Toastify({
            text: "No hay nada en tu carrito para comprar!",
            style: {
                background: "linear-gradient(to right,rgb(250, 162, 162),rgb(255, 0, 0))",
                color: "white",
                fontWeight: "bold",
              }
          }).showToast();
        }else{
            Swal.fire({
                title: "¿Está seguro?",
                text: "Estas a punto de realizar la compra de tu carrito",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Sí, comprar!",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                    comprarCarrito();
                  Swal.fire({
                    title: "¡Comprado!",
                    text: "Su compra a finalizado con exito!.",
                    icon: "success"
                  });
                }
              });
        }
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



const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_r57vt16';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      Toastify({
        text: "Se envio un correo exitosamente!.",
        style: {
            background: "linear-gradient(to right,rgb(122, 250, 160),rgb(0, 255, 0))",
            color: "white",
            fontWeight: "bold",
          }
      }).showToast();
    }, () => {
      btn.value = 'Enviar';
      let msj= "No se pudo enviar el correo, intente nuevamente mas tarde!."
      Toastify({
        text: msj,
        style: {
            background: "linear-gradient(to right,rgb(250, 162, 162),rgb(255, 0, 0))",
            color: "white",
            fontWeight: "bold",
          }
      }).showToast();
    });
});