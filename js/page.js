// const { default: axios } = require("axios");

//funcion q ejecuta el cambio de modos(clases dark and light)
function change_mode() { 
    $("body").toggleClass("dark_mode");
    $(".country_card").toggleClass("elements_dark_mode");
    $(".nav").toggleClass("elements_dark_mode");
    $(".region").toggleClass("elements_dark_mode");
    $(".search_and_filter").toggleClass("dark_mode");
    $(".search").toggleClass("elements_dark_mode");
    $(".region option").toggleClass("elements_dark_mode");
    $(".btn").toggleClass("elements_dark_mode");
    $(".border_stats span a").toggleClass("elements_dark_mode text");
    $(".stats_details span").toggleClass("text");
    $(".moon").toggleClass("white");

    
    //cambia el modo de estilo
    if( mode == 'dark' ){
        mode = "light";
        $.cookie( "modo", "light" );
    }
        else{ 
            mode = "dark";
            $.cookie( "modo", "dark" );
        }
}


//coloco los datos stats  del pais seleccionado (arrays)
const pon_datos_stats = ( datos, direccion)=>{
    for( let i = 0; i< datos.length; i++ )
        if( datos[i]['name'] == undefined ){
            $(direccion).append( ' ' + datos[i] );
            if( i+1 < datos.length )
                $(direccion).append( ',' );
        }
        else{
            $(direccion).append( ' ' + datos[i]['name'] );
            if( i+1 < datos.length )
                $(direccion).append( ',' );
        }
};

//coloco los datos border del pais seleccionado (arrays) y llamo a la api para poner el nombre completo porque me lo dan en codigo(ej 'FRA' )
const pon_datos_border = async ( data, direccion )=>{
    
    for( let i=0; i< data.length; i++ ){
        const country_name = await axios.get( "https://restcountries.com/v2/alpha/" + data[i] );
        if( mode == "light" )
        $( direccion ).append( `<a href= "page.html" target="_self" class=" text elements_light_mode">` + country_name.data.name  + '</a>');
            else
            $( direccion ).append( `<a href= "page.html" target="_self" class="elements_dark_mode elements_light_mode">` + country_name.data.name  + '</a>');
        console.log(country_name.data.name );
        
    }
    $(".border_stats a").click(function (e) { 
        $.cookie( "pais_selected", $(this).html() );    
    });
}

//almacena el modo de estilo
var mode = "dark",
    mode_change = $.cookie( "modo" );

    if(  mode_change != mode )
        change_mode( );

//cambia entre los dif modos 
$(".mode").click( change_mode );

//accedemos a la cookie guardada
var pais_selected = $.cookie( "pais_selected" );
console.log(pais_selected );
/* alert(pais_selected); */
//llamada a el pais seleccionado
axios.get( "https://restcountries.com/v2/name/" + pais_selected )
.then( (res)=>{
    var array = res.data[0];
    console.log( array );
    console.log(array );


    //coloco los datos del pais seleccionado
    $(".img_preview").attr("src", array["flags"].png);
    $(".country_name_details").html(array['name']);
    $(".native_stats span").html(  array['nativeName']);
    $(".population_stats span").html(  array['population']);
    $(".region_stats span").html(  array['region']);
    $(".capital span").html(  array['capital']);    
    $(".sub_stats span").html( array['subregion']);

    //pongo los datos q tienen arrays
    pon_datos_stats( array['languages'], ".languages span" );
    pon_datos_stats( array.currencies, ".currencies_stats span" ); 
    pon_datos_stats( array['topLevelDomain'], ".top_stats span" );
    
    //pongo los datos de los paises border
    pon_datos_border( array.borders, ".border_stats span"); 

});

