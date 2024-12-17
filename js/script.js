console.log("Bienvenido al Ecommerce");
console.log("A continuacion le muestro los productos con los que contamos");
// clase de producto
class producto{
    constructor(id, nombre, color, precio, stock,){
        this.id = id;
        this.nombre = nombre;
        this.color = color;
        this.precio = precio;
        this.stock = stock;
    }

    descripcion() {
        console.log(`ID: ${this.id} / Producto: ${this.nombre} / color: ${this.color} / precio: $${this.precio} // Cantidad disponibles: ${this.stock}`);
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


// Muestra todos los productos con su descripcion
function listarProductos(){
    for(product of productos){
        product.descripcion();
    }
}

listarProductos();

const carrito = [];


// Agrega al carrito y validacion de stock
function agregarProductoAlCarrito(id){
    let productoAgregado = productos.find((p) => p.id === id);
    if(productoAgregado.stock<1){
        console.log("No hay stock del producto, lo siento.")
    }
    else{
        carrito.push(productoAgregado);
        alert("Producto agregado al carrito.")
        for(product of productos){
            if(productoAgregado===product){
                product.stock = product.stock-1;
            }
        }
    }
}

// Eliminar producto del carrito: Valida si el producto esta en el carrito y si el carrito esta vacio, ajusta stock
function eliminarProductoDelCarrito(id){
    let productoEliminado = carrito.find((p) => p.id === id);
    let idProductoEliminado = carrito.indexOf(productoEliminado);
    let verificaProducto = false;
    verificaProducto = carrito.includes(productoEliminado);
    
    if(carrito.length<1){
        console.log("No tienes nada en el carrito como para eliminar.");
    }
    else{
        if(verificaProducto){
            carrito.splice(idProductoEliminado, 1);
            alert("Producto eliminado.");
            for(product of productos){
                if(productoEliminado===product){
                    product.stock = product.stock+1;
                }
            }
        }
        else{
            console.log("No tienes el producto en el carrito.");
        }
    }
}




    
// Ver productos en el carrito y valida si esta vacio
function verCarrito(){
    if(carrito.length<1){
        console.log("Carrito vacio!");
    }
    else{
        console.log("Productos en el carrito:")
        for(carrit of carrito){
            console.log(carrit);
        }
    }
}

// Compra del carrito: Valida si esta vacio el carrito, suma el precio de los productos, vacia el carrito, vuelve a listar los productos
function comprarCarrito(){
    let suma = 0;
    if(carrito.length<1){
        console.log("No hay nada en tu carrito para comprar!");
    }else{
        for(carrit of carrito){
            suma += carrit.precio;
        }
        console.log("Compraste los productos del carrito, precio final: " + suma);
        console.log("productos comprados:");
        verCarrito();
        carrito.splice(0);
        alert("Compra exitosa.");

        console.log("A continuacion le muestro los productos con los que contamos.");
        listarProductos();
    }
}


// menu
let opcion = parseInt(prompt("Seleccione una opcion:\n 1)Agregar productos al carrito\n 2)Eliminar productos del carrito\n 3)Ver carrito\n 4)Comprar carrito\n *Cualquier otro numero para finalizar"));

while(isNaN(opcion) || opcion == ""){
    console.error("No ha ingresado un numero valido.");
    opcion = parseInt(prompt("Seleccione una opcion:\n 1)Agregar productos al carrito\n 2)Eliminar productos del carrito\n 3)Ver carrito\n 4)Comprar carrito\n *Cualquier otro numero para finalizar"));
}

while(opcion>0 && opcion<5){
    let id;

    switch(opcion){
        case 1:
            id = parseInt(prompt("Dime el id del producto a agregar al carrito"));
            while(isNaN(id) || id == ""){
                id = parseInt(prompt("ID INVALIDO!. Dime el id del producto a agregar al carrito"));
            }
            agregarProductoAlCarrito(id);
            break;
        case 2:
            id = parseInt(prompt("Dime el id del producto a eliminar del carrito"));
            while(isNaN(id) || id == ""){
                id = parseInt(prompt("ID INVALIDO!. Dime el id del producto a agregar al carrito"));
            }
            eliminarProductoDelCarrito(id);
            break;
        case 3:
            verCarrito();
            break;
        case 4:
            comprarCarrito()
            break;
    }

    opcion = parseInt(prompt("Seleccione una opcion:\n 1)Agregar productos al carrito\n 2)Eliminar productos del carrito\n 3)Ver carrito\n 4)Comprar carrito\n *Cualquier otro numero para finalizar"));
    while(isNaN(opcion) || opcion == ""){
        console.error("No ha ingresado un numero valido.");
        opcion = parseInt(prompt("Seleccione una opcion:\n 1)Agregar productos al carrito\n 2)Eliminar productos del carrito\n 3)Ver carrito\n 4)Comprar carrito\n *Cualquier otro numero para finalizar"));
    }
}



