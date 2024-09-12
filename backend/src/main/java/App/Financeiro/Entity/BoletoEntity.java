package App.Financeiro.Entity;

import App.Entity.PagamentoEntity;
import App.Enum.STATUS;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Boleto")
@Builder
public class BoletoEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empresa;

    private String cnpj;

    @Enumerated(EnumType.STRING)
    private STATUS statusPagamento;

    private double parcelas;

    private double parcelaAtual;

    private double valorTotal;

    private double valorParcela;

    @Future
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataVencimento;

    @OneToOne
    @JoinColumn(name = "pagamentoEntity_id", referencedColumnName = "id")
    private PagamentoEntity pagamento;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;
}
