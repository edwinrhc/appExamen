package pe.com.examen.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerieWrapper {

    private Integer id;
    private Integer codSerie;
    private String tipoDocumento;
    private String desTipoDocumento;
    private String descripcion;
    private String nroSerie;
    private Integer correlativo;
    private Integer maxcorrelativo;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private String fechaModificacion;


}
