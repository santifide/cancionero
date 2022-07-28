function subirMedioTono(){

}

function bajarMedioTono (){

}

function subirTono (){

}

function bajarTono (){

}

function cargarCancion(contador){
    console.log(contador);
    var idBtnActual =  '#btn-cancion-'+contador;
    var tituloCancion = $(idBtnActual).text();
    var cancion = cancioneroAleluya[tituloCancion];
    $('#containerCancion').html(cancioneroAleluya[tituloCancion]);
}

function generarBotones (){
    console.log('entró');
    var contador = 0
    for (const tituloCancion in cancioneroAleluya) {
        contador += 1;
        var btnActual = '<button id="btn-cancion-'+contador+'" onclick="cargarCancion('+contador+')">'+tituloCancion+'</button>';
        $('#listadoDeCanciones').append(btnActual);
    }
}

function scrollToTop (){

}

function toggleAcordes (){

}

function modoNocturno (){

}