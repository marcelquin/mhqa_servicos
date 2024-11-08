package App.Entity;

import App.Enum.STATUS;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Pedido")
@Builder
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;

    private String cpfCnpj;

    private String relato;

    private String telefone;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pedidoEntity_clienteEntity_id")
    private ClienteEntity Cliente;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pedidoEntity_clienteEmpresaEntity_id")
    private ClienteEmpresaEntity clienteEmpresa;

    @JoinColumn(unique = true)
    private String codigo;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataPedido;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataPagamento;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pagamentoEntity_id", referencedColumnName = "id")
    private PagamentoEntity pagamento;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ItemPedidoEntity> produtos;

    private Double valorTotal;

    private String valorTotalFront;

    @Enumerated(EnumType.STRING)
    private STATUS status;

    private String notificacao;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;
}
