package App.Controller;

import App.DTO.PedidoDTO;
import App.Entity.PedidoEntity;
import App.Enum.FORMAPAGAMENTO;
import App.Service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("vendas")
@Tag(name = "vendas",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarVendas")
    public ResponseEntity<List<PedidoEntity>> ListarVendas()
    { return service.ListarVendas();}

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarVendasAbertos")
    public ResponseEntity<List<PedidoEntity>> ListarVendasAbertos()
    { return service.ListarVendasAbertos();}

    @Operation(summary = "Busca Registros da tabela por codigo", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarVendaPorId")
    public ResponseEntity<PedidoDTO> BuscarVendaPorId(@RequestParam Long id)
    { return service.BuscarVendaPorId(id);}

    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoVenda")
    public ResponseEntity<PedidoDTO> NovoVenda(Long idCliente,
                                               Long idClienteEmpresa,
                                               String clienteNome,
                                               Long prefixo,
                                               Long telefone,
                                               @RequestParam String relatoProblema)
    { return service.NovoVenda(idCliente,idClienteEmpresa,clienteNome,prefixo,telefone, relatoProblema);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/AdicionarProdutoVenda")
    public void AdicionarProdutoVenda(@RequestParam Long id,
                                       @RequestParam Long idServico)
    {service.AdicionarProdutoVenda(id, idServico);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/FinalizarVenda")
    public void FinalizarVenda(@RequestParam Long id,
                                @RequestParam FORMAPAGAMENTO formaPagamento,
                                Double parcelas)
    { service.FinalizarVenda(id, formaPagamento,parcelas);}


}
