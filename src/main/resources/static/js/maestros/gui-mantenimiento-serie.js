// campos de formulario principal
var formSerie;
var campoBuscar;
var tipoDocumento;
// botones
var btnLimpiar;
var btnNuevo;
// tablas
var tablaSerie;
var dataTableSerie;


// campos de formulario Nuevo Registro
let tipoDocumentoSunat;
let descripcion;
let nroSerie;
let correlativo;
let maxCorrelativo;


/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/
$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables(){
	formSerie = $('#formSerie');
	campoBuscar = $('#campoBuscar');
	tipoDocumento = $('#tipoDocumento');
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	tablaSerie = $('#tablaSerie');
}

function inicializarComponentes(){
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla(){	
	campoBuscar.focus();
}

function inicializarEventos(){
	campoBuscar.on('keyup', function (e) {
		buscar();
	});
			
	tipoDocumento.on('click', function (e) {
		buscar();
	});
}


function inicializarTabla(){
	
	dataTableSerie = tablaSerie.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 	= campoBuscar.val().trim();
				d.tipoDoc		= (tipoDocumento.val() == CADENA_VACIA) ? 0 : tipoDocumento.val();
		    },
            url: '/appExamen/listarSeries/',
                dataSrc: function (json) {
				console.log("listarSeries...success");
            	return json;
            },
            error: function (xhr, error, code){
				
            }
        },
            "responsive"	: false,
	        "scrollCollapse": false,
			"ordering"      : true,
	        "dom"			: '<ip<rt>lp>',
        	"lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
	        "deferRender"   : true,
	        "autoWidth"		: false,
	        "sortClasses"	: false,
		    "columnDefs"    : [
                {
                    "width": "3px",
                    "targets": 0,
                    "data": "id"
                },
                {
                    "width": "25px",
                    "targets": [1],
                    "data": "codSerie"
                },				
				{
                    "width": "35px",
                    "targets": [2],
                    "data": "desTipoDocumento"                    
                },
                {
                    "width": "35px",
                    "targets": [3],
                    "data": "nroSerie"
                },
                {
                    "width": "35px",
                    "targets": [4],
                    "data": "correlativo"
                },
				{
                    "width": "35px",
                    "targets": [5],
                    "data": "maxcorrelativo"
                },				
				{
                    "width": "3px",
                    "targets": [6],
                    "data": "activo",
                    className: "dt-body-center text-center"
            	},
                {
                    "width": "20px",
                    "targets": [7],
                    "className": "dt-body-center",
                    "orderable": false,
					"render":
                    function (data, type, row ) {
                    	return  "<div style='display:flex;justify-content:space-around;'>" +
                        			"<button title='Ver' class='btn-view btn btn-info btn-xs'>" +
							                    "<span><i class=\"fas fa-eye\"></i></span>" +
							                "</button>" +											
							                "<button title='Modificar' class='btn-edit btn btn-primary btn-xs'>" +
                                                "<span><i class=\"fas fa-edit\"></i></span>" +
                                            "</button>" +
				                "</div>";
                    }
                }
             ],
             "fnRowCallback":
                 function(row, aData, iDisplayIndex, iDisplayIndexFull){
                    var index = iDisplayIndexFull + 1;
                    $('td:eq(0)', row).html(index);
									
					// modificando el tamaño de los caracteres del listado
					$(row).addClass("listado-tam-caracteres");
                    return row;
                 },
             "language"  : {
                "url": "/appExamen/language/Spanish.json"
            }
    });
	
}



/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function buscar(){
	var form1 = formSerie;

	if ( $.fn.dataTable.isDataTable(tablaSerie)) {
		dataTableSerie.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableSerie.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function manejarModal() {
    // Abrir el modal al hacer clic en el botón
    $("#btnAbrirModal").click(function() {
        $("#nuevoModal").show();
    });
    // Cerrar el modal al hacer clic en el botón de cerrar
    $(".close").click(function() {
        $("#nuevoModal").hide();
    });
    // Cerrar el modal al hacer clic fuera de él
    $(window).click(function(event) {
        if (event.target == $("#nuevoModal")[0]) {
            $("#nuevoModal").hide();
        }
    });
}

function guardarSerie(){
    console.log("Iniciando el formulario modal")
    //Obtener los valores de los campos del formulario
    tipoDocumentoSunat = $("#tipoDocumentoSunat option:selected").val();
    descripcion = $("#descripcion").val();
    nroSerie = $("#nroSerie").val();
    correlativo = parseInt($("#correlativo").val());
    maxCorrelativo = parseInt($("#maxcorrelativo").val());
    //Creamos un objeto con los datos a enviar al servidor
    var datos = {
        tipoDocumento:tipoDocumentoSunat,
        descripcion: descripcion,
        nroSerie: nroSerie,
        correlativo:correlativo,
        maxcorrelativo:maxCorrelativo
    };
    console.log("Datos a enviar al servidor: ",datos);
    var settings =  {
        "url": "http://localhost:8085/appExamen/crear/",
        "method": "POST",
        "timeout": 0,
        "headers": {
             "Content-Type": "application/json"
        },
         "data":JSON.stringify(datos),
        "success": function(response){
            // Verificar el resultado del servidor
            if (response) {
                // Mostrar SweetAlert para un registro exitos
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    showConfirmButton: false,
                    text: response.message,
                    timer: 1500
                }).then(function() {
                    // Ocultar el modal después del registro exitoso
                    $("#nuevoModal").modal("hide");
                    // Recargar la página para mostrar los cambios
                    // window.location.reload();
                });
            } else {
                // Mostrar SweetAlert para un error
                console.log("Que dice en response ERROR" , response);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    text: response.message
                });
            }
        },
        "error": function (xhr,status,error){
            var errorMessage = xhr.responseText;
            alert(errorMessage);
        }
    };
    $.ajax(settings)
        .done(function(response, textStatus, xhr) {
            // Acceder al código de estado HTTP
            var statusCode = xhr.status;
            if (statusCode === 200) {
                // La solicitud fue exitosa, manejarla aquí
                console.log("La solicitud fue exitosa");
            } else {
                // La solicitud tuvo un error, manejarlo aquí
                console.error("La solicitud tuvo un error: " + statusCode);
            }
        })
        .fail(function(xhr, textStatus, errorThrown) {
            // Si la solicitud AJAX falla por completo
            console.error("Error en la solicitud AJAX: " + errorThrown);
        });


}


