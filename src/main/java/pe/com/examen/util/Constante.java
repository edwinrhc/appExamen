package pe.com.examen.util;

public class Constante {
	
	public static final String USUARIO = "EXAMEN";
	
	/* VALORES PARA LA TABLA DE CATALOGOS */
	public static final String CATALOGO_TIPO_DOC_SUNAT 		= "28";
	
	
	/*** VALORES PARA LAS P�GINAS HTML ***/
	/* GENERAL */
	public static final String PAGINA_ERROR 				= "paginas/error/error";
	/* MAESTROS */
	public static final String PAGINA_MANTENIMIENTO_SERIE 	= "paginas/maestros/mantenimiento-serie";
		
	
	/*** VALORES PARA CONTROL DE FLUJO DENTRO DE LOS CONTROLLERS ***/
	/* RESULTADOS */
	public static final String RESULTADO_EXITOSO 		= "1";
	public static final String RESULTADO_ALTERNATIVO 	= "2";

	public static final String RESULTADO_ERROR_SERIE		= "3";
	
	
	/* PARAMETROS PARA INVOCAR A LOS SP */
	public static final String PARAM_SP_DATO_BUSCAR			= "DATO_BUSCAR";
	public static final String PARAM_SP_COD_TIPO_DOCUMENTO	= "COD_TIPO_DOCUMENTO";
	public static final String PARAM_SP_COD_MAESTRO 		= "COD_MAESTRO";
	
	
	/* PARAMETROS DE RETORNO DE LOS SP */
	public static final String PARAM_FLAG_RESULTADO 	= "FLAG_RESULTADO";
	public static final String PARAM_MENSAJE_RESULTADO 	= "MENSAJE_RESULTADO";
	
	
	/* PARAMETROS DE ENTRADA PARA LOS METODOS DE LOS CONTROLLER */	
	public static final String PARAM_DATO_BUSCAR = "datoBuscar";	
	public static final String PARAM_TIPO_DOCUMENTO = "tipoDoc";


	public static final String INVALID_DATA = "Invalid Data.";
	public static final String SOMETHING_WENT_WRONG = "Something Went Wrong.";



}