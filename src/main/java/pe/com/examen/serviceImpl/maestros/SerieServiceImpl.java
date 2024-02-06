package pe.com.examen.serviceImpl.maestros;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pe.com.examen.exception.ErrorControladoException;
import pe.com.examen.model.SerieModel;
import pe.com.examen.repository.maestros.SerieMapper;
import pe.com.examen.service.maestros.SerieService;
import pe.com.examen.util.Constante;
import pe.com.examen.util.appExamenUtil;

import javax.rmi.CORBA.Util;

@Service
public class SerieServiceImpl implements SerieService {

	private static final Logger logger = LogManager.getLogger(SerieServiceImpl.class);

	@Autowired
	private SerieMapper serieMapper;
	
	@Override
	public List<SerieModel> listarSeries(String datoBuscar, String tipoDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		params.put(Constante.PARAM_SP_COD_TIPO_DOCUMENTO, tipoDocumento);
		
		logger.info("params ===> " + params);

		List<SerieModel> perfilList = serieMapper.listarSerie(params);
		
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listarSeries ===> " + perfilList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return perfilList;
	}


	@Override
	public void editar(SerieModel serie) throws Exception {

		try{
			serieMapper.editarSerie(serie);
				logger.info("Se ha editado exitosamente la serie en la base de datos");
		}catch (Exception ex)
		{
			logger.info("Error al intentar guardar la serie en la base datos"+ ex.getMessage());
			throw new Exception("Error al intentar editar la serie en la base de datos");
		}
	}

	@Override
	public SerieModel obtenerSeriePorId(String id) {

		// Log para indicar que se está intentando obtener la series
		logger.info("Intentando obtener la serie con ID:" + id);

		//Lógica para obtener la serie por su ID
		 SerieModel serie = serieMapper.obtenerSeriePorId(id);

		if(serie != null){
			logger.info("Serie encontrada: "+ serie);
		}else{
			logger.error("No se encontró ninguna serie con ID: "+ id);
		}

		return null;
	}

	@Override
	public SerieModel validarSerie(String nroSerie) {
		return null;
	}



	@Override
	public ResponseEntity<String> guardar(Map<String, String> requestMap) {

		logger.info("Iniciado crear serviceImpl {} ",requestMap);
		try {
			if(validateSaveMap(requestMap)){
				SerieModel serieModel = serieMapper.validarSerie(requestMap.get("nroSerie"));
				logger.info("Obteniendo el ID de nro serie", serieModel);
				if(Objects.isNull(serieModel)){
					serieMapper.GuardarSerie(getSerieFromMap(requestMap));
					return appExamenUtil.getResponseEntity(Constante.RESULTADO_EXITOSO, HttpStatus.OK);
				}else{
					return appExamenUtil.getResponseEntity(Constante.RESULTADO_ERROR_SERIE, HttpStatus.BAD_REQUEST);
				}
			}else{
				return appExamenUtil.getResponseEntity(Constante.INVALID_DATA,HttpStatus.BAD_REQUEST);
			}

		}catch (Exception ex){
			ex.printStackTrace();
		}
		return appExamenUtil.getResponseEntity(Constante.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
	}


	private boolean validateSaveMap(Map<String, String> requestMap){

		if(requestMap.containsKey("nroSerie"))
			return true;
			return false;
	}

	private SerieModel getSerieFromMap(Map<String,String> requestMap){
		SerieModel serieModel = new SerieModel();
		serieModel.setTipoDocumento(requestMap.get("tipoDocumento"));
		serieModel.setDesTipoDocumento(requestMap.get("desTipoDocumento"));
		serieModel.setDescripcion(requestMap.get("descripcion"));
		serieModel.setNroSerie(requestMap.get("nroSerie"));

		//Verificar que los campos correlativo y maxCorrelativo no sean nulos
		String correlativoStr = requestMap.get("correlativo");
		String maxCorrelativoStr = requestMap.get("maxcorrelativo");

		if(correlativoStr != null && maxCorrelativoStr != null){
			serieModel.setCorrelativo(Integer.valueOf(correlativoStr));
			serieModel.setMaxcorrelativo(Integer.valueOf(maxCorrelativoStr));
		}


		return serieModel;


	}




}
