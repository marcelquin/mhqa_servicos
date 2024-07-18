package App.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "servico")
@Builder
public class ServicoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @JoinColumn(unique = true)
    private String codigo;

    private Double valor;

    private Double maoDeObra;

    private String valorFront;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;
}
