//funciones--------------------------------------------------------------------------------------------------------------------------
//funcion q  carga todos los paises
const get_all_countries = async ()=>{
    try{
        //llama al api y guarda los datos
        const res = await axios.get("https://restcountries.eu/rest/v2/all" );
        const array = res.data;
        
        //borra los paises
        $(".country").html("");
        
        //guarda los paises en div
        let div = '';
        for( let i = 0; i < 30 ; i++){

            div += `<div class="country_card elements_dark_mode elements_light_mode" >
                            <a target="_blank" href="page.html">
                            <div class="cont_flag"><img class="flag" src="${array[i]['flag']}"></div>
                            <div class="country_name">${array[i]['name']}</div>
                            <div class="stats population">Population: ${array[i]['population']}</div>
                            <div class="stats reg">Region: ${array[i]['region']}</div>
                            <div class="stats capital">Capital: ${array[i]['capital']}</div>
                        </a>
                    </div>`;
        }
        //inserta los paises
        $(".country").append(div);

        //pongo a la escucha a todos los paises y guardo el selecionado
       $("a").click(function (e) { 
           $.cookie( "pais_selected", $(this).find( ".country_name" ).html() );
       });

       //arreglo bug de cambio de modo
        if( mode == "light" )
            $(".country_card").toggleClass("elements_dark_mode");
    }
    catch(err){
        alert( err.message); 
    }
}

//funcion q filtra los paises x region
function filter_region() { 

    $(".region").css( "color", "inherit" );
    //borra todos los paises
    $(".country").html("");

    const region = this.value;
    
    //si filtra 'all' ejecutamos la funcion de default
    if( region == 'all' ) return get_all_countries();

    //se ejecuta automaticamente la funcion
    (async ()=>{
        try{
            //llama al api
            const res = await axios.get("https://restcountries.eu/rest/v2/region/" + region );
            const array = res.data;

            //guarda los paises en div
            let div = '';
            for( let i = 0; i < array.length ; i++){

                div += `<div class="country_card elements_dark_mode elements_light_mode" >
                            <a target="_blank" href="page.html">
                                <div class="cont_flag"><img class="flag" src="${array[i]['flag']}"></div>
                                <div class="country_name">${array[i]['name']}</div>
                                <div class="stats population">Population: ${array[i]['population']}</div>
                                <div class="stats reg">Region: ${array[i]['region']}</div>
                                <div class="stats capital">Capital: ${array[i]['capital']}</div>
                            </a>
                        </div>`;
            }
            //inserta los paises
            $(".country").append(div);

            //pongo a la escucha a todos los paises y guardo el selecionado
            $("a").click(function (e) { 
                $.cookie( "pais_selected", $(this).find( ".country_name" ).html() );
            });

            //arreglo bug de cambio de modo
            if( mode == "light" )
                $(".country_card").toggleClass("elements_dark_mode");
        }
        catch(err){
            alert( err.message); 
        }
    })();

}


function search() { 

    //obtego el name
    const name = this.value;

    //si el 'input' esta vacio ejecutamos la funcion de default
    if( !name ) return get_all_countries();
    
    console.log(name);
    //borro todos los paises
    $(".country").html("");
   
    //ejecuto  automaticamente esta funcion
    (async ()=>{
        try{
            //llamo al api
            const res = await axios.get("https://restcountries.eu/rest/v2/name/" + name );
            const array = res.data;
            
            //guarda los paises en div
            let div = '';
            for( let i = 0; i < array.length ; i++){

                div += `<div class="country_card elements_dark_mode elements_light_mode" >
                            <a target="_blank" href="page.html">
                                <div class="cont_flag"><img class="flag" src="${array[i]['flag']}"></div>
                                <div class="country_name">${array[i]['name']}</div>
                                <div class="stats population">Population: ${array[i]['population']}</div>
                                <div class="stats reg">Region: ${array[i]['region']}</div>
                                <div class="stats capital">Capital: ${array[i]['capital']}</div>
                            </a>
                        </div>`;
            }
            //inserta los paises
            $(".country").append(div);

            //pongo a la escucha a todos los paises y guardo el selecionado
            $("a").click(function (e) { 
                $.cookie( "pais_selected", $(this).find( ".country_name" ).html() );
            });

            //arreglo bug de cambio de modo
            if( mode == "light" )
            $(".country_card").toggleClass("elements_dark_mode");
        }
        catch(err){
            alert( "Favor introducir un nombre valido" );
            //alert( err); 
        }
    })();
}


//funcion q ejecuta el cambio de modos(clases dark and light)
function change_mode() { 
    $("body").toggleClass("dark_mode");
    $(".country_card").toggleClass("elements_dark_mode");
    $(".nav").toggleClass("elements_dark_mode");
    $(".region").toggleClass("elements_dark_mode");
    $(".search_and_filter").toggleClass("dark_mode");
    $(".search").toggleClass("elements_dark_mode");
    $(".region option").toggleClass("elements_dark_mode");
    $(".moon").toggleClass("white");


    
    //cambia el modo de estilo
    if( mode == 'dark' ){
        mode = "light";
        $.cookie( "modo", "light" );
        $(".img_cont .img").attr( "src", "icons/icons8-search-50.png");
    }
        else{ 
            mode = "dark";
            $.cookie( "modo", "dark" );
            $(".img_cont .img").attr( "src", "icons/icons8-search-50 (1).png");
        }
}

//-----------------------------------------------------------------------------------------------------------------------

//almacena el modo de estilo
var mode = "dark",
    mode_change = $.cookie( "modo" );

    if(  mode_change != mode )
        change_mode( );
    
//muestra todos los paises
get_all_countries();

//cambia entre los dif modos 
$(".mode").click( change_mode );


//filtra los paises x regiones
$(".region").change( filter_region );


// //busca los paises por nombre
 $(".search").on( "input", search);
 
//arreglo bug de search para q muestre en el filter 'ALL' cuando se busca un pais
$(".search").keyup(function (e) { 
   console.log( this.value );
    if( this.value != "" ){
        $(".region").val( "all" );
    }    
});
