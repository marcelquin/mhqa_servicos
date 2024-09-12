package App.Controller;

import App.Enum.FORMAPAGAMENTO;
import App.Exceptions.EntityNotFoundException;
import App.Financeiro.DTO.BoletosDTO;
import App.Financeiro.DTO.RelatorioAnualDTO;
import App.Financeiro.DTO.RelatorioDiarioDTO;
import App.Financeiro.DTO.RelatorioMensalDTO;
import App.Financeiro.Entity.BoletoEntity;
import App.Financeiro.Entity.RelatorioMensalEntity;

import App.Financeiro.Service.RelatorioMensalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.util.List;

@RestController
@RequestMapping("relatorios")
@Tag(name = "relatorios",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class relatoriosController {

    private final RelatorioMensalService service;


    public relatoriosController(RelatorioMensalService service) {
        this.service = service;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarRelatorios")
    public ResponseEntity<List<RelatorioMensalEntity>> ListarRelatorios()
    { return service.ListarRelatorios();}

    @Operation(summary = "Lista Registros da tabela Por dia Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioDiario")
    public ResponseEntity<List<RelatorioDiarioDTO>> BuscarRelatorioDiario()
    { return service.BuscarRelatorioDiario();}

    @Operation(summary = "Lista Registros da tabela Por mês Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioMensal")
    public ResponseEntity<List<RelatorioMensalDTO>> BuscarRelatorioMensal()
    { return service.BuscarRelatorioMensal();}

    @Operation(summary = "Lista Registros da tabela Por ano Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioAnual")
    public ResponseEntity<List<RelatorioAnualDTO>> BuscarRelatorioAnual()
    {return service.BuscarRelatorioAnual();}

    @Operation(summary = "Salva novo Registros da tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoLancamentoDebito")
    public void NovoLancamentoDebito(String empresa,
                                     String cnpj,
                                     Double valorBoleto,
                                     Double parcelas,
                                     int diaVencimento,
                                     Double carenciaPagamento)
    { service.NovoLancamentoDebito(empresa, cnpj, valorBoleto, parcelas, diaVencimento, carenciaPagamento);}

    @Operation(summary = "Salva novo Registros da tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoPagamento")
    public void NovoPagamento(Long idBoleto,
                              FORMAPAGAMENTO formapagamento,
                              Double parcelas)
    { service.NovoPagamento(idBoleto, formapagamento, parcelas);}

    @Operation(summary = "Salva novo Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarBoletoPorId")
    public ResponseEntity<BoletosDTO> BuscarBoletoPorId(Long idBoleto)
    {return service.BuscarBoletoPorId(idBoleto);}



}
