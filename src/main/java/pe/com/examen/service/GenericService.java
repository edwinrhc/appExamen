package pe.com.examen.service;

import java.util.List;
import pe.com.examen.model.ComboModel;

public interface GenericService {
	
	public List<ComboModel> cargarCombo(String codMaestro) throws Exception;
	
}
