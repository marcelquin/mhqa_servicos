package App.Financeiro.repository;





import App.Financeiro.Entity.VendasRealizdasEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendasRealizadaRepository extends JpaRepository<VendasRealizdasEntity,Long> {

    Optional<VendasRealizdasEntity> findBycodigo(String codigo);
}
