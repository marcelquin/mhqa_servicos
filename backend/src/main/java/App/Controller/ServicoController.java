package App.Controller;

import App.DTO.ServicoDTO;
import App.Entity.ServicoEntity;
import App.Service.ServicoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("servico")
@Tag(name = "servico",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class ServicoController {

    private final ServicoService service;

    public ServicoController(ServicoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarServicos")
    public ResponseEntity<List<ServicoEntity>> ListarServicos()
    { return service.ListarServicos();}

    @Operation(summary = "Busca Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarServicoPorId")
    public ResponseEntity<ServicoDTO> BuscarServicoPorId(@RequestParam Long id)
    { return service.BuscarServicoPorId(id);}

    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoServico")
    public ResponseEntity<ServicoDTO> NovoServico(@RequestParam String nome,
                                                  @RequestParam String descricao,
                                                  @RequestParam Double valor,
                                                  @RequestParam Double maoDeObra)
    {return service.NovoServico(nome, descricao, valor, maoDeObra);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/EditarServico")
    public ResponseEntity<ServicoDTO> EditarServico(@RequestParam Long id,
                                                    @RequestParam String nome,
                                                    @RequestParam String descricao,
                                                    @RequestParam Double valor,
                                                    @RequestParam Double maoDeObra)
    {return  service.EditarServico(id, nome, descricao, valor, maoDeObra);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/ReajustePreco")
    public ResponseEntity<ServicoDTO> ReajustePreco(@RequestParam Long id,
                                                    @RequestParam Double porcentagem)
    { return service.ReajustePreco(id, porcentagem);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/Desconto")
    public ResponseEntity<ServicoDTO> Desconto(@RequestParam Long id,
                                               @RequestParam Double porcentagem)
    { return service.Desconto(id, porcentagem);}

}
