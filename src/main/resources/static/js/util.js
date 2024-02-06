const CADENA_VACIA = "";
const UNDEFINED = undefined;
const CANT_CERO_CORRELATIVO = 7;

var mousePoint = {
		clientX:0,
		clientY:0
	};

var HttpStatus = {
		/* SUCCESS*/
		OK  				: 200,
		Accepted  			: 202,
		/* CLIENT ERRORS */
	    BadRequest			: 400,
	    Forbidden			: 403,
	    NotFound 			: 404,
	    /* SERVER ERRORS */
	    InternalServerError	: 500
	};

var CodigoMaestro = {
		TIPO_DOC_SUNAT		: "28"
};

var DescripcionCatalogo = {
		DES_TIPO_DOC_SUNAT		: "Tipo de Documento Sunat"
};

var Boton = {
		PRIMARY	: "btn-primary",
		WARNING	: "btn-warning",
		INFO	: "btn-info",
		SUCCESS	: "btn-success",
		DANGER	: "btn-danger"
}

var Opcion = {
		NUEVO		: 0,
		VER			: 1,
		DUPLICAR	: 2,
		MODIFICAR	: 3
};

var DescripcionOpcion = {
		DES_NUEVA		: "Nueva",
		DES_NUEVO		: "Nuevo",
		DES_MODIFICAR	: "Modificar",
		DES_VER			: "Ver"
};

var FlagActivo = {
		ACTIVO		: 1,
		INACTIVO	: 0
};

var Respuesta = {
		SI	: 1,
		NO	: 0
};

var TipoOperacion = {
		GRABAR	: "01",
		AGREGAR	: "02"
};

function is_chrome(){
	return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}

function movimientomouse(event){
	var evento = (window.event) ? window.event : event;
	mousePoint.clientX = evento.clientX;
	mousePoint.clientY = evento.clientY
}

function mousefuera(){
	mousePoint.clientX = 0;
	mousePoint.clientY = 0;
}

function soloEnteros(e){
    var key = e.charCode;
    console.log("key en soloEnteros-->" + key);
    return key >= 48 && key <= 57;
}

function loadding(onOf) {
    if (onOf) {
        var div="<div id='loadding' class='box'><div class='image'><img align='absmiddle' src='/appExamen/images/loading.gif'></div><div class='line1'>PROCESANDO</div><div class='line2'>Ejecutando petición, por favor espere...</div></div>";
        jQuery.blockUI({
            message: div,
            css: {
                border: 'none',
                padding: '0px',
                backgroundColor: ''
            },
            overlayCSS: {
                backgroundColor: 'black',
                opacity: 0.10
            }
        });        
    }
    else {
        jQuery.unblockUI();
    }
}

function habilitarAnimacionAcordion() {
	$(".collapse").on('show.bs.collapse', function(){
		$(this).prev(".card-header").find('.btn-link svg').attr('data-icon', 'angle-up');
    }).on('hide.bs.collapse', function(){
    	$(this).prev(".card-header").find('.btn-link svg').attr('data-icon', 'angle-down');
    });
}

function mostrarDialogoInformacion(mensaje, boton, controlFoco1, controlFoco2){
	var box = bootbox.dialog({
				message: "<p>" + mensaje + "</p>",
			    size: 'medium',
			    centerVertical: true,
			    buttons: {
			        cancel: {
			            label: "Aceptar",
			            className: boton
			        }
			    }
			  });
	
	box.on('hidden.bs.modal',function(){
        if(controlFoco1 == null){
			$(controlFoco2).focus();
			$(controlFoco2).select();
		}else{
			controlFoco1.focus();
			controlFoco1.select();	
		}		
    });
}

if(is_chrome()){
	document.onmouseout		=	mousefuera;
	document.onmousemove	=	movimientomouse;
}