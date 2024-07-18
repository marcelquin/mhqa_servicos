package App.Service;

import App.DTO.ServicoDTO;
import App.Entity.ServicoEntity;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.ServicoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class ServicoService {
    private final ServicoRepository servicoRepository;

    Locale localBrasil = new Locale("pt", "BR");

    public ServicoService(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    public ResponseEntity<List<ServicoEntity>> ListarServicos()
    {
        try
        {
            return new ResponseEntity<>(servicoRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ServicoDTO> BuscarServicoPorId(Long id)
    {
        try
        {
            if(id != null)
            {
                ServicoEntity entity = servicoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                ServicoDTO response = new ServicoDTO(entity.getNome(), entity.getDescricao(), entity.getCodigo(),entity.getValor(),entity.getMaoDeObra());
                return  new ResponseEntity<>(response,HttpStatus.OK);
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ServicoDTO> NovoServico(String nome,
                                                  String descricao,
                                                  Double valor,
                                                  Double maoDeObra)
    {
        try
        {
            if(nome != null &&
               descricao != null &&
               valor != null)
            {
                ServicoEntity entity = new ServicoEntity();
                entity.setNome(nome);
                if(maoDeObra == null)
                {
                    entity.setMaoDeObra(0.0);
                    entity.setValor(valor);
                }
                else
                {
                    Double valorProduto = valor + maoDeObra;
                    entity.setMaoDeObra(maoDeObra);
                    entity.setValor(valorProduto);
                }
                int digito = (int) (10000001 + Math.random() * 89999999);
                entity.setDescricao(descricao);
                entity.setCodigo("svc_"+digito);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                entity.setTimeStamp(LocalDateTime.now());
                servicoRepository.save(entity);
                ServicoDTO response = new ServicoDTO(entity.getNome(), entity.getDescricao(), entity.getCodigo(),entity.getValor(),entity.getMaoDeObra());
                return  new ResponseEntity<>(response,HttpStatus.CREATED);
                }
                else
                { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ServicoDTO> EditarServico(Long id,
                                                    String nome,
                                                    String descricao,
                                                    Double valor,
                                                    Double maoDeObra)
    {
        try
        {
            if(id != null &&
               nome != null &&
               descricao != null &&
               valor != null)
            {
                ServicoEntity entity = servicoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                entity.setNome(nome);
                if(maoDeObra == null)
                {
                    entity.setMaoDeObra(0.0);
                    entity.setValor(valor);
                }
                else
                {
                    Double valorProduto = (valor + maoDeObra)+ valor;
                    entity.setMaoDeObra(maoDeObra);
                    entity.setValor(valorProduto);
                }
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                entity.setTimeStamp(LocalDateTime.now());
                servicoRepository.save(entity);

                ServicoDTO response = new ServicoDTO(entity.getNome(), entity.getDescricao(), entity.getCodigo(),entity.getValor(),entity.getMaoDeObra());
                return  new ResponseEntity<>(response,HttpStatus.OK);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ServicoDTO> ReajustePreco(Long id,
                                                    Double porcentagem)
    {
        try
        {
            if(id != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ServicoEntity entity = servicoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = (entity.getValor()*porcentagemCalculo) + entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                entity.setValor(novoPreco);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                ServicoDTO response = new ServicoDTO(entity.getNome(), entity.getDescricao(), entity.getCodigo(),entity.getValor(),entity.getMaoDeObra());
                return  new ResponseEntity<>(response,HttpStatus.OK);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ServicoDTO> Desconto(Long id,
                                               Double porcentagem)
    {
        try
        {
            if(id != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ServicoEntity entity = servicoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = (entity.getValor()*porcentagemCalculo) - entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                entity.setValor(novoPreco);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                ServicoDTO response = new ServicoDTO(entity.getNome(), entity.getDescricao(), entity.getCodigo(),entity.getValor(),entity.getMaoDeObra());
                return  new ResponseEntity<>(response,HttpStatus.OK);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

}
