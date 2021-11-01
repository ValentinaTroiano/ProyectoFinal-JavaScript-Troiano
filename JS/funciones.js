function productosUIjQuery(Ropa, id){
    for (const ropa of Ropa) {
       $(id).append(`<div class="card" style="width: 18rem;">
                      <img src= "${ropa.img}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${ropa.nombre}</h5>
                        <p class="card-text">$${ropa.precio}</p>                    
                        <a href="#" id='${ropa.id}' class="btn btn-primary btn-compra">Agregar al carrito</a>
                      </div>
                    </div>`);
    
    
      }
    }
    //evento click 
    function comprarProducto(event){
      //no refresca
      event.preventDefault();
     
      const idRopa   = event.target.id;
    
      const existe=carrito.find(ropa => ropa.id ==idRopa);
      
      if (existe == undefined) {
        const seleccionado = ropa.find(ropa => ropa.id == idRopa);
        carrito.push(seleccionado);    
      }else{
        existe.agregarCantidad(1);
      }
     localStorage.setItem("carrito",JSON.stringify(carrito))


      //GENERAR SALIDA PRODUCTO
      carritoUI(carrito);
    }
    //hasta aca todo ok


    //Funcion interfaz
    function carritoUI(carrito) {
        $("#carritoCantidad").html(carrito.length);//length de carrito al badge
        $("#carritoProductos").empty();//Vacio el carrito cada vez que inicio 
        for (const ropa of carrito) {//Recorro array carrito
          //Agrego un Hijo al div carritoProductos con la info del producto
          $("#carritoProductos").append(registroCarrito(ropa));
        }


        $('.btn-delete').on('click', eliminarCarrito);
      
        $("#carritoProductos").append(`<button id="btnConfirmar">Confirmar</button>` )
        $("#btnConfirmar").on("click", enviarCompra);
        }
   
    function registroCarrito(ropa){
        return `<p> ${ropa.nombre}
        <span class="badge badge-warning">
        - $ ${ropa.precio}</span> 
        -Cantidad: <span class="badge badge-warning">${ropa.cantidad}</span> 
        <span class="badge badge-success">
        -Subtotal: $ ${ropa.subtotal()}</span>
        <a id="${ropa.id}" class="btn btn-danger btn-delete">X</a>
        </p>`
      }








      function enviarCompra() {
        $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify (carrito), function (respuesta,estado) {
          console.log(estado);
          console.log(respuesta);
          alert ("MUCHAS GRACIAS POR SU COMPRA")
        })
        
      }

      function eliminarCarrito(event) {
        //Uso event.stopPropagation() para que no se cierre la interfaz de carrito cuando hago click
        event.stopPropagation();
        //Filtro todos los productos menos el precionado para "eliminarlo"
        //Para hacer esto carrito debe ser declarado con let
        carrito = carrito.filter(ropa => ropa.id != event.target.id);
        //Vuelvo a generar la interfaz de carrito actualizada
        carritoUI(carrito);
        //Almaceno en el storage el carrito actualizado
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
      }




      
