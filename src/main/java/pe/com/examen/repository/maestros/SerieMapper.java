package pe.com.examen.repository.maestros;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.com.examen.model.SerieModel;

@Repository
@Transactional
public interface SerieMapper {
	
	List<SerieModel> listarSerie(Map params);

	 void GuardarSerie(SerieModel serie);

	 void editarSerie(SerieModel serie);

	 SerieModel obtenerSeriePorId(@Param("nroSerie") String nroSerie);

	 SerieModel validarSerie(String nroSerie);
}
