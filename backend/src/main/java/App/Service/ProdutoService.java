package App.Service;

import App.DTO.ProdutoDTO;
import App.DTO.ProdutoEdtDTO;
import App.Entity.EstoqueEntity;
import App.Entity.FornecedorEntity;
import App.Entity.ProdutoEntity;
import App.Enum.MEDIDA;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.EstoqueRepository;
import App.Repository.FornecedorRepository;
import App.Repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final EstoqueRepository estoqueRepository;
    private final FornecedorRepository fornecedorRepository;
    public ProdutoService(ProdutoRepository produtoRepository, EstoqueRepository estoqueRepository, FornecedorRepository fornecedorRepository) {
        this.produtoRepository = produtoRepository;
        this.estoqueRepository = estoqueRepository;
        this.fornecedorRepository = fornecedorRepository;
    }


    DecimalFormat df= new DecimalFormat("#,####.##");

    Locale localBrasil = new Locale("pt", "BR");
    public ResponseEntity<List<ProdutoEntity>> ListarProdutos()
    {
        try
        {
            return new ResponseEntity<>(produtoRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ProdutoDTO> BuscarProdutoPorId(Long id)
    {
        try
        {
            if(id != null)
            {
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                ProdutoDTO response = new ProdutoDTO(entity.getNome(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(), entity.getDataEntrada(),entity.getFabricante(), entity.getCfop(), entity.getNcmsh(), entity.getEstoque().getQuantidade());
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

    public ResponseEntity<ProdutoDTO> NovoProduto(String nome,
                                                  String descricao,
                                                  int quantidade,
                                                  MEDIDA medida,
                                                  Double estoque,
                                                  Long fornecedorId,
                                                  String fabricante,
                                                  Long cfop,
                                                  Long ncmsh,
                                                  Double valor,
                                                  Double porcentagemLucro)
    {
        try
        {
            if(
               nome != null &&
               descricao != null &&
               quantidade > 0 &&
               medida != null &&
               estoque != null &&
               valor != null &&
               ncmsh != null &&
               cfop != null &&
               porcentagemLucro != null )
                {
                    if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valor < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(porcentagemLucro < 0) {throw new IllegalActionException("O campo não pode ser negativo");}

                        int dig = (int) (1111 + Math.random() * 9999);
                        int digestoque1 = (int) (1111 + Math.random() * 9999);
                        int digestoque2 = (int) (111 + Math.random() * 999);
                        String codigo = "P_"+dig;
                        Double porcentagem = porcentagemLucro /100;
                        ProdutoEntity entity = new ProdutoEntity();
                        if(fornecedorId != null)
                        {
                            FornecedorEntity fornecedor = fornecedorRepository.findById(fornecedorId).orElseThrow(
                                    () -> new EntityNotFoundException()
                            );
                            entity.setFornecedor(fornecedor);
                            entity.setFabricante(fornecedor.getRazaoSocial());
                        }
                        if(fabricante != null)
                        {
                            entity.setFabricante(fabricante);
                        }
                        entity.setCfop(cfop);
                        entity.setNcmsh(ncmsh);
                        entity.setNome(nome);
                        entity.setDescricao(descricao);
                        entity.setMedida(medida);
                        entity.setCodigo(codigo);
                        entity.setQuantidade(quantidade);
                        Double valorProduto = (valor * porcentagem)+ valor;
                        entity.setValor(valorProduto);
                        entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                        entity.setDataEntrada(LocalDate.now());
                        entity.setTimeStamp(LocalDateTime.now());
                        EstoqueEntity estoqueEntity = new EstoqueEntity();
                        estoqueEntity.setNome(entity.getNome());
                        estoqueEntity.setDescricao(entity.getDescricao());
                        estoqueEntity.setCodigo(digestoque1+"."+digestoque2);
                        estoqueEntity.setQuantidade(estoque);
                        estoqueEntity.setValor(entity.getValor());
                        estoqueEntity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValor()));
                        estoqueEntity.setValorTotalEstoque(entity.getValor()*estoque);
                        estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                        estoqueEntity.setTimeStamp(LocalDateTime.now());
                        estoqueRepository.save(estoqueEntity);
                        entity.setEstoque(estoqueEntity);
                        produtoRepository.save(entity);
                    ProdutoDTO response = new ProdutoDTO(entity.getNome(),
                            entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),entity.getFabricante(), entity.getCfop(), entity.getNcmsh(), entity.getEstoque().getQuantidade());
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

    public ResponseEntity<ProdutoDTO> EditarProduto(Long id,
                                                    String nome,
                                                    String descricao,
                                                    int quantidade,
                                                    MEDIDA medida,
                                                    Double estoque,
                                                    Long fornecedorId,
                                                    String fabricante,
                                                    Long cfop,
                                                    Long ncmsh,
                                                    Double valor,
                                                    Double porcentagemLucro)
    {
        try
        {
            if(id != null &&
               nome != null && descricao != null &&
               quantidade > 0 &&
               medida != null &&
               estoque != null &&
               cfop != null &&
               ncmsh != null &&
               valor != null &&
               porcentagemLucro != null )
            {
                System.out.println("variavel nome: "+ nome);
                System.out.println("variavel descrição: "+ descricao);
                System.out.println("variavel fabriante: "+ fabricante);
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                Double porcentagem = porcentagemLucro /100;
                entity.setDescricao(descricao);
                entity.setQuantidade(quantidade);
                entity.setMedida(medida);
                entity.setNome(nome);
                if(fornecedorId != null)
                {
                    if(fornecedorRepository.existsById(fornecedorId))
                    {
                        FornecedorEntity fornecedor = fornecedorRepository.findById(fornecedorId).get();

                        entity.setFornecedor(fornecedor);
                        entity.setFabricante(fornecedor.getRazaoSocial());
                    }
                    else
                    {
                        if(fabricante != null)
                        {
                            entity.setFabricante(fabricante);
                        }
                    }

                }
                entity.setCfop(cfop);
                entity.setNcmsh(ncmsh);
                Double valorProduto = (valor * porcentagem)+ valor;
                entity.setValor(valorProduto);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                entity.setTimeStamp(LocalDateTime.now());
                produtoRepository.save(entity);
                EstoqueEntity estoqueEntity = estoqueRepository.findById(entity.getEstoque().getId()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                estoqueEntity.setNome(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida());
                estoqueEntity.setDescricao(entity.getDescricao());
                estoqueEntity.setQuantidade(estoque);
                estoqueEntity.setValor(entity.getValor());
                estoqueEntity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValor()));
                estoqueEntity.setValorTotalEstoque(entity.getValor()*estoque);
                estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                estoqueEntity.setTimeStamp(LocalDateTime.now());
                estoqueRepository.save(estoqueEntity);

                ProdutoDTO response = new ProdutoDTO(entity.getNome(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),entity.getFabricante(), entity.getCfop(), entity.getNcmsh(), entity.getEstoque().getQuantidade());
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

    public ResponseEntity<ProdutoDTO> AdicionarEstoqueProduto(Long id,
                                                              Double valor,
                                                              Double estoque )
    {
        try
        {
            if(id != null &&
               valor != null &&
               estoque != null)
            {
               if(valor < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EstoqueEntity estoqueEntity = estoqueRepository.findById(entity.getEstoque().getId()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );

                if(entity.getValor() < valor)
                {
                    entity.setValor(valor);
                    entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                    estoqueEntity.setValor(entity.getValor());
                    estoqueEntity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValor()));
                }
                estoqueEntity.setQuantidade(estoqueEntity.getQuantidade() + estoque);
                estoqueEntity.setValorTotalEstoque(estoqueEntity.getValor() * estoqueEntity.getQuantidade());
                estoqueEntity.setTimeStamp(LocalDateTime.now());
                estoqueRepository.save(estoqueEntity);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setDataEntrada(LocalDate.now());
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),entity.getFabricante(), entity.getCfop(), entity.getNcmsh(), entity.getEstoque().getQuantidade());
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

    public ResponseEntity<ProdutoDTO> ReajustePreco(Long id,
                                                    Double porcentagem)
    {
        try
        {
            if(id != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = (entity.getValor()*porcentagemCalculo) + entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                entity.setValor(novoPreco);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                EstoqueEntity estoqueEntity = estoqueRepository.findById(entity.getEstoque().getId()).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                estoqueEntity.setValor(entity.getValor());
                estoqueEntity.setValorTotalEstoque(estoqueEntity.getValor() * estoqueEntity.getQuantidade());
                estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),entity.getFabricante(), entity.getCfop(), entity.getNcmsh(), entity.getEstoque().getQuantidade());
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

    public ResponseEntity<ProdutoDTO> QueimaEstoque(Long id,
                                                    Double porcentagem)
    {
        try
        {
            if(id != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = (entity.getValor()*porcentagemCalculo) - entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                entity.setValor(novoPreco);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                EstoqueEntity estoqueEntity = estoqueRepository.findById(entity.getEstoque().getId()).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                estoqueEntity.setValor(entity.getValor());
                estoqueEntity.setValorTotalEstoque(estoqueEntity.getValor() * estoqueEntity.getQuantidade());
                estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),entity.getFabricante(), entity.getCfop(), entity.getNcmsh(), entity.getEstoque().getQuantidade());
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

    /*
    public ResponseEntity<ProdutoDTO> AdicionarEstoqueProduto(String codigo,
                                                              Double valorProduto,
                                                               Double estoque)
    {
        try
        {
            if(codigo != null &&
               valorProduto != null &&
               estoque != null)
            {
                if(valorProduto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}

                ProdutoEntity entity = produtoRepository.findBycodigo(codigo).orElseThrow(
                        ()-> new EntityNotFoundException()
                );

                if(entity.getValor() < valorProduto)
                {
                   entity.setEstoque(entity.getEstoque() + estoque);
                   entity.setValor(valorProduto);
                   entity.setValorTotalEstoque(valorProduto * entity.getEstoque());
                }
                else
                {
                    entity.setEstoque(entity.getEstoque() + estoque);
                    entity.setValorTotalEstoque(entity.getValor() * entity.getEstoque());
                }
                entity.setTimeStamp(LocalDateTime.now());
                entity.setDataEntrada(LocalDate.now());
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(), entity.getCodigo(), entity.getEstoque(), df.format(entity.getValor()),entity.getDataEntrada());
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

    public ResponseEntity<ProdutoDTO> DeletarProduto(Long id)
    {
        try
        {
            if(id != null && id >0)
            {
                if(produtoRepository.existsById(id))
                {
                    produtoRepository.deleteById(id);

                    return new ResponseEntity<>(HttpStatus.OK);
                }
                else
                { throw new EntityNotFoundException();}
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


    public ResponseEntity<ProdutoDTO> ReajustePreco(String codigoProduto,
                                                    Double porcentagem)
    {
        try
        {
            if(codigoProduto != null &&
               porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findBycodigo(codigoProduto).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = entity.getValor()*porcentagemCalculo + entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                Double novoValorEstoque = novoPreco * entity.getEstoque();
                entity.setValor(novoPreco);
                entity.setValorTotalEstoque(novoValorEstoque);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoValorEstoque));
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(), entity.getCodigo(), entity.getEstoque(), df.format(entity.getValor()),entity.getDataEntrada());
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

    public ResponseEntity<ProdutoDTO> QueimaEstoque(String codigoProduto,
                                                    Double porcentagem)
    {
        try
        {
            if(codigoProduto != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findBycodigo(codigoProduto).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = entity.getValor()*porcentagemCalculo - entity.getValor();
                Double novoValorEstoque = novoPreco * entity.getEstoque();
                entity.setValor(novoPreco);
                entity.setValorTotalEstoque(novoValorEstoque);
                entity.setValor(novoPreco);
                entity.setValorTotalEstoque(novoValorEstoque);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotalEstoque()));
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(), entity.getCodigo(), entity.getEstoque(), df.format(entity.getValor()),entity.getDataEntrada());
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
    */
}
