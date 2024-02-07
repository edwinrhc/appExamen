package pe.com.examen.controlador.restImpl.maestros;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.com.examen.model.SerieModel;
import pe.com.examen.wrapper.SerieWrapper;

import java.util.Map;

@RequestMapping
public interface SerieRestImpl{

    @PostMapping(path = "/crear/")
    public ResponseEntity<String> guardar(@RequestBody(required = true)Map<String,String> requestMap);

    @PostMapping(path="/editar/")
    public ResponseEntity<String> editar(@RequestBody(required = true)Map<String,String> requestMap);

    @GetMapping(path="/verDetalle/{codSerie}")
    public ResponseEntity<SerieModel> detalle(@PathVariable Integer codSerie);


}
