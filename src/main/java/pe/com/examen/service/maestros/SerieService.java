package pe.com.examen.service.maestros;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import pe.com.examen.model.SerieModel;

public interface SerieService {
	
	List<SerieModel> listarSeries(String datoBuscar, String tipoDocumento) throws Exception;

//	void guardar(SerieModel serie) throws Exception;

	ResponseEntity<String> guardar(Map<String,String> requestMap);

	void editar(SerieModel serie) throws Exception;

	SerieModel obtenerSeriePorId(String id);

	SerieModel validarSerie(String nroSerie);

}
