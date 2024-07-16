package App.Repository;

import App.Entity.ServicoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServicoRepository extends JpaRepository<ServicoEntity,Long> {

    Optional<ServicoEntity> findBycodigo(String codigo);

    Optional<ServicoEntity> findBynome(String nome);
}
