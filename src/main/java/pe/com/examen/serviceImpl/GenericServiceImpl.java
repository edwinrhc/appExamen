package pe.com.examen.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.com.examen.exception.ErrorControladoException;
import pe.com.examen.model.ComboModel;
import pe.com.examen.repository.GenericMapper;
import pe.com.examen.service.GenericService;
import pe.com.examen.util.Constante;

@Service
public class GenericServiceImpl implements GenericService{

	private static final Logger logger = LogManager.getLogger(GenericServiceImpl.class);
	
	@Autowired
	private GenericMapper genericMapper;
	
	@Override
	public List<ComboModel> cargarCombo(String codMaestro) throws Exception {
		
    	logger.info("entrando cargarCombo.......");
        Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		// seteando parametros
		params.put(Constante.PARAM_SP_COD_MAESTRO, codMaestro);
        // obteniendo la lista
		comboList = genericMapper.cargarCombo(params);
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarCombo.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarCombo.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarCombo ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
 		return comboList;
	}
	
}
