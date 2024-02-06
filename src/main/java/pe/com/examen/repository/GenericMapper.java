package pe.com.examen.repository;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.com.examen.model.ComboModel;

@Repository
@Transactional
public interface GenericMapper {

	public List<ComboModel> cargarCombo(Map params);
}
