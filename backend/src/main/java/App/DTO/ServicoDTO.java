package App.DTO;

public record ServicoDTO(
        String nome,
        String descricao,
        String codigo,
        Double valor,
        Double maoDeObra
) {
}
