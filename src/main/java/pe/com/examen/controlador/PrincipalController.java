
package pe.com.examen.controlador;

import java.util.List;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import pe.com.examen.model.ComboModel;
import pe.com.examen.service.GenericService;
import pe.com.examen.util.Constante;

@Controller
public class PrincipalController {
	
	private static final Logger logger = LogManager.getLogger(PrincipalController.class);
		
	@Autowired
	private GenericService genericService;
	
	@Autowired
    HttpSession session;
	
	@GetMapping({"/", "/index", "/login", "/principal"})
    public String principal(Model model) {
		String retorno;
		try {
			logger.info("entrando al método principal");
			List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_SUNAT);
			model.addAttribute("listaTipoDocumentoModal", listaTipoDocumento);
			model.addAttribute("listaTipoDocumento", listaTipoDocumento);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_SERIE;
			logger.info("saliendo del método principal");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }

}
