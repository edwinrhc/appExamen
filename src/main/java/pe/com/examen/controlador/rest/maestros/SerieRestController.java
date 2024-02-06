package pe.com.examen.controlador.rest.maestros;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pe.com.examen.controlador.restImpl.maestros.SerieRestImpl;
import pe.com.examen.model.SerieModel;
import pe.com.examen.service.maestros.SerieService;
import pe.com.examen.util.Constante;
import pe.com.examen.util.appExamenUtil;

@RestController
public class SerieRestController implements SerieRestImpl {

	private static final Logger logger = LogManager.getLogger(SerieRestController.class);
	
	@Autowired
	SerieService serieService;
	@Autowired
    HttpSession session;
	
	@GetMapping ("/listarSeries/")
    public ResponseEntity<List<SerieModel>> listarSeries(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
    													 @RequestParam(Constante.PARAM_TIPO_DOCUMENTO) String tipoDoc) throws Exception {
        
        	logger.info("Inicio listarSeries.......");
            List<SerieModel> serieList = serieService.listarSeries(datoBuscar, tipoDoc);
            logger.info("Fin listarSeries.......");
            return new ResponseEntity<List<SerieModel>>(serieList, HttpStatus.OK);   
    }


	public ResponseEntity<String> guardar(Map<String, String> requestMap){
		try {
			logger.info("Iniciando desde SerieResController");
			return serieService.guardar(requestMap);
		}catch (Exception ex)
		{
			ex.printStackTrace();
		}
		return appExamenUtil.getResponseEntity(Constante.RESULTADO_EXITOSO,HttpStatus.INTERNAL_SERVER_ERROR);
	}




//	private boolean validarCampos(Map<String,String>requestMap){
//		if (requestMap.containsKey("nroSerie"))
//		return true;
//		// si es false
//		return false;
//	}
}
