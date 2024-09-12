package App.DTO;

import App.Enum.FORMAPAGAMENTO;
import App.Enum.STATUS;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public record PedidoResponseFullDTO(
        String codigo,
        String cliente,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime data,
        List<ServicosResponseDTO> itens,
        String valor,
        Double parcelas,
        String valorTroco,
        STATUS statusPagamento,
        FORMAPAGAMENTO formapagamento,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataPagamento
) {
}
