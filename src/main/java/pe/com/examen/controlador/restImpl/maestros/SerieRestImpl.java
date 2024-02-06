package pe.com.examen.controlador.restImpl.maestros;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping
public interface SerieRestImpl{

    @PostMapping(path = "/crear/")
    public ResponseEntity<String> guardar(@RequestBody(required = true)Map<String,String> requestMap);
}