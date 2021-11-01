
/*
ropa.push(new Ropa(1, "Remeras", 280, "imagenes/remeras.jpg"));
ropa.push(new Ropa(2, "Pantalones", 450, "imagenes/pantalones.jpg"));
ropa.push(new Ropa(3, "Gorras", 150, "imagenes/gorras.jpg"));
ropa.push(new Ropa(4, "Camperas", 1000, "imagenes/camp.jpg"));
ropa.push(new Ropa(5, "Zapatos", 750, "imagenes/zapatos.jpg"));
ropa.push(new Ropa(6,"Shorts", 500,"imagenes/shorts.jfif"))

console.log(ropa);
*/




$("productosContenedor").hide();


//$.get("data/productos.json", function (datos,estado) {
    //console.log(estado);
    //console.log(respuesta);
   // if(estado="succses") { 
        
        //for (const objeto of datos) {
        //console.log(objeto);
        //ropa.push(new Ropa(objeto.id, objeto.nombre, objeto.precio, objeto.img));
        //console.dir(ropa[0])
        
   // }
    //productosUIjQuery(ropa, '#productosContenedor');
    //} else{
       // console.log("no se cargaron los datos");
    //}

    
   
//})





productosUIjQuery(ropa, '#productosContenedor');


$(document).ready( function () {
    console.log("HTML LISTO")
    //alert("BIenvenido \n LISTO PARA NAVEGAR")

    /*let botones= $(".btn-compra");
    //console.log(botones);

     for (const boton of botones) {
          boton.onclick= comprarProducto;*/

          $(".btn-compra").on("click",comprarProducto );
    
}
    
);


//otra forma de escribir el ready
//$(() => (
    //console.log("HTML LISTO")
//));

window.addEventListener('load', function () {
    console.log("READY PICS");
    //para remover el spinner
    $("#cargando").remove();
    $("productosContenedor").fadeIn();
    
})
$(window).on("load", function (){
    $("#cargando").remove();
})





//$("#ejemplo").fadeIn(2000);
//$("#ejemplo").fadeOut(4000, function () { 
    //console.log("probando");
    
//});

$("#anuncio").slideDown(3000);


//dentro de los botones contacto y nosotros puse infrormacion que se despliega y vuelve
$("#nosotros").on("click", function () {
    $("#infoNosotros").slideToggle(1000);
    
})
$("#contacto").on("click", function () {
    $("#infoContacto").slideToggle(1000);
    
})
//$("#home").animate(
   // {fontSize:"35px"} //probando modificar css desde el js
//)

//metodo readypara que no se refresque el carrito y quede guardado
$.get("data/productos.json",function (datos, estado) {
    console.log(datos);
    console.log(estado);
    //Usamos un if para preguntar si la llama fue exitosa
    if (estado == "success") {    
        //Transformamos los objetos de tipo "objeto" a tipo "producto"    
        for (const literal of datos) {
            ropa.push(new Ropa(literal.id, literal.nombre, literal.precio, literal.img, literal.cantidad));
                        
        }
        //GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
        productosUIjQuery(ropa, '#productosContenedor');
        
    }else{
        console.log('No cargaron los datos');
    }
    
});
$(document).ready(function () {
    //1° Pregunto si existe la clave "carrito" en el local storage
    if("carrito" in localStorage){
        //2° si existe obtengo esos datos en un array y los paso a objetos con JSON.parse()
        const datos= JSON.parse(localStorage.getItem('carrito'));
        //3° Transformamos los objetos de tipo "objeto" a tipo "producto" 
        for (const literal of datos) {
            carrito.push(new Ropa(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.img));
        }
        //4° Volvemos a generar la interfaz carrito
        carritoUI(carrito);
    }    
});
