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
let codSerie;
let tipoDocumentoSunat;
let activo;
let desTipoDocumento;
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

$(document).on('click', '#btn-view', function() {
     var serieId = $(this).data('id');
    verDetalle(serieId, 'detalle');
    //verDetalle();
});
$(document).on('click', '#btn-edit', function() {
    var serieId = $(this).data('id');
    verDetalle(serieId, 'editar');

});


$(document).ready(function() {
    // Agregar evento change al checkbox
    $("#miCheckbox").change(function() {
        // Verificar si el checkbox está marcado
        if ($(this).is(":checked")) {
            // Agregar la clase de estilo a la celda
            $(this).closest("tr").find(".text-danger").addClass("text-danger-custom");
        } else {
            // Remover la clase de estilo de la celda
            $(this).closest("tr").find(".text-danger").removeClass("text-danger-custom");
        }
    });
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
                    className: "dt-body-center text-center",
                    "render": function (data, type, row){
                        if(type === 'display'){
                            if(data == 1){
                                return '<div class="form-check dt-body-center"><input class="form-check-input checkbox-activo" type="checkbox" checked><label class="form-check-label"></label></div>';
                            }else{
                                return '<div class="form-check dt-body-center"><input class="form-check-input checkbox-activo" type="checkbox"><label class="form-check-label"></label></div>';
                            }

                        }else{
                            return data;
                        }
                    }
            	},
                {
                    "width": "20px",
                    "targets": [7],
                    "className": "dt-body-center",
                    "orderable": false,
					"render":
                    function (data, type, row ) {
                    	return  "<div style='display:flex;justify-content:space-around;'>" +
                        			"<button id='btn-view' title='Ver' class='btn-view btn btn-info btn-xs' data-id='"+ row.codSerie +"'>" +
							                    "<span><i class=\"fas fa-eye\"></i></span>" +
							                "</button>" +
							                "<button id='btn-edit' title='Modificar' class='btn-edit btn btn-primary btn-xs' data-id='"+ row.codSerie +"'>" +
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
            },
            "createdRow": function (row, data, dataIndex) {
                var checkbox = $(row).find('.checkbox-activo');
                if (data.activo === 0) {
                    checkbox.prop('checked', false);
                    $(row).css('background-color', 'orange').css('color', 'red').css('font-weight', 'bold');
                } else {
                    checkbox.prop('checked', true);
                    $(row).css('background-color', '').css('color', '');
                }
            }
    });

    // Agregar evento de cambio para el checkbox
    tablaSerie.on('change', '.checkbox-activo', function() {
        var fila = $(this).closest('tr'); // Obtener la fila actual
        if (!this.checked) {
            fila.css('background-color', 'orange').css('color', 'red').css('font-weight', 'bold');
        } else {
            fila.css('background-color', '').css('color', '');
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
    limpiarErrores();

    tipoDocumentoSunat = $("#tipoDocumentoSunat option:selected").val();
    descripcion = $("#descripcion").val().toUpperCase();
    nroSerie = $("#nroSerie").val().toUpperCase();
    correlativo = parseInt($("#correlativo").val());
    maxCorrelativo = parseInt($("#maxcorrelativo").val());

    // Realiza todas las validaciones
    var errores = [];

    // Valida cada campo usando el switch
    errores.push({ selector: "#tipoDocumentoSunat", mensaje: validarCampo("#tipoDocumentoSunat", tipoDocumentoSunat) });
    errores.push({ selector: "#descripcion", mensaje: validarCampo("#descripcion", descripcion) });
    errores.push({ selector: "#nroSerie", mensaje: validarCampo("#nroSerie", nroSerie) });
    errores.push({ selector: "#correlativo", mensaje: validarCampo("#correlativo", correlativo) });
    errores.push({ selector: "#maxcorrelativo", mensaje: validarCampo("#maxcorrelativo", maxCorrelativo) });

    // Filtra los errores no nulos
    errores = errores.filter(function(error) {
        return error.mensaje !== null;
    });
    // Si hay errores, muestra los mensajes y detén el proceso
    if (errores.length > 0) {
        errores.forEach(function(error) {
            mostrarError(error.selector, error.mensaje);
        });
        return;
    }

    //Creamos un objeto con los datos a enviar al servidor
    var datos = {
        tipoDocumento:tipoDocumentoSunat,
        descripcion: descripcion,
        nroSerie: nroSerie,
        correlativo:correlativo,
        maxcorrelativo:maxCorrelativo
    };
    var settings = {
        "url": "/appExamen/crear/",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(datos),
        "success": function (response) {
            // Verificar el resultado del servidor
            if (response) {
        //        Mostrar SweetAlert para un registro exitos
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    showConfirmButton: false,
                    text: "Se registro correctamente",
                    timer: 1500
                }).then(function () {
                    // Ocultar el modal después del registro exitoso
                    $("#nuevoModal").modal("hide");
                    // Recargar la página para mostrar los cambios
                    window.location.reload();
                });
            }
        },
        "error": function (xhr, status, error) {
            var errorMessage = xhr.responseText;
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    text: "Esta serie ya fue registrada"
                });

            }
        }
    };
    $.ajax(settings)
}

function editarSerie(){


    codSerie = $("#codSerieEdit").val();
    tipoDocumentoEdit = $("#tipoDocumentoEdit").val();
    activo = $("#activoEdit").prop('checked') ? 1:0;
    descripcion = $("#desTipoDocumentoEdit").val().toUpperCase();
    nroSerie = $("#nroSerieEdit").val().toUpperCase();
    correlativo = $("#correlativoEdit").val();
    maxCorrelativo = $("#maxcorrelativoEdit").val();

    //Creamos un objeto con los datos a enviar al servidor
    var datos = {
        codSerie: codSerie,
        tipoDocumento: tipoDocumentoEdit,
        activo: activo,
        descripcion: descripcion,
        nroSerie: nroSerie,
        correlativo: correlativo,
        maxcorrelativo: maxCorrelativo
    };


    $.ajax({
        url: '/appExamen/editar/',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(datos),

        success: function (response) {

           // console("Datos ==>", datos);
            console.log("Respuesta del servidor aqi: =>", response); // Agrega esta línea para verificar la respuesta del servidor

            // Verificar el resultado del servidor
            if (response) {
                //        Mostrar SweetAlert para un registro exitos
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualización!',
                    showConfirmButton: false,
                    text: "Se actualizó correctamente",
                    timer: 1500
                }).then(function () {
                    // Ocultar el modal después del registro exitoso
                    $("#editarSerieModal").modal("hide");
                    // Recargar la página para mostrar los cambios
                    window.location.reload();
                });
            }
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.responseText;
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    text: "Esta serie ya fue registrada"
                });

            }
        }

    })

}

function verDetalle(serieId, modalType){
    // Abrir el modal al hacer clic en el botón
    console.log("ID de serie a buscar" + serieId);

    $.ajax({
        url: '/appExamen/verDetalle/' + serieId,
        method: 'GET',
        success: function (response){

            // Determina qué modal abrir
            if(modalType === 'detalle'){
                console.log("Response detalle: => ", response);
                // Llena el modal con los detalles de la serie
                $('#codSerie').val(response.codSerie);
                $('#tipoDocumentoVer').val(response.tipoDocumento);
                $('#desTipoDocumentoVer').val(response.desTipoDocumento);
                $('#activoVer').prop('checked',response.activo);
                $('#nroSerieVer').val(response.nroSerie);
                $('#correlativoVer').val(response.correlativo);
                $('#maxcorrelativoVer').val(response.maxcorrelativo);
                $('#detalleModal').modal('show');

            } else if (modalType === 'editar'){
                console.log("Response editar: => ", response);
                $('#codSerieEdit').val(response.codSerie);
                $('#tipoDocumentoEdit').val(response.tipoDocumento);
                $('#activoEdit').prop('checked',response.activo);
                $('#desTipoDocumentoEdit').val(response.desTipoDocumento);
                $('#nroSerieEdit').val(response.nroSerie);
                $('#correlativoEdit').val(response.correlativo);
                $('#maxcorrelativoEdit').val(response.maxcorrelativo);

                $('#editarSerieModal').modal('show');
            }
        },
        "error": function (xhr, status, error) {
            var errorMessage = xhr.responseText;
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    text: "Esta serie ya fue registrada"
                });

            }
        }
    });

}


function validarCampo(selector, valor) {
    switch (selector) {
        case "#tipoDocumentoSunat":
            return valor ? null : "Debe ingresar un Tipo de documento.";
        case "#descripcion":
            return valor ? null : "Debe ingresar una descripción.";
        case "#nroSerie":
            // Agrega tu lógica de validación para el campo nroSerie aquí
            return valor ? null : "Debe ingresar el nro de serie."; // Retorna null si la validación es exitosa
        case "#correlativo":
            // Agrega tu lógica de validación para el campo correlativo aquí
            return valor? null :"Debe ingresar el correlativo."; // Retorna null si la validación es exitosa
        case "#maxcorrelativo":
            // Agrega tu lógica de validación para el campo maxcorrelativo aquí
            return valor? null : "Debe de ingresar el maxCorrelativo."; // Retorna null si la validación es exitosa
        default:
            return "Campo no reconocido.";
    }
}


function mostrarError(selector, mensaje) {
    // Elimina cualquier mensaje de error anterior
    $(selector).next(".error-message").remove();
    // Agrega el mensaje de error debajo del campo
    $(selector).after("<div class='error-message text-danger'>" + mensaje + "</div>");
    $(selector).addClass("border border-danger");
}

function limpiarErrores() {
    $(".error-message").remove();
    $(".border-danger").removeClass("border-danger");
}

