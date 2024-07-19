package App.Service;

import App.DTO.PedidoDTO;
import App.Entity.*;
import App.Enum.FORMAPAGAMENTO;
import App.Enum.STATUS;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class PedidoService {

    private final ClienteRepository clienteRepository;
    private final ServicoRepository servicoRepository;
    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final PagamentoRepository pagamentoRepository;
    private final ClienteEmpresaRepository clienteEmpresaRepository;
    Locale localBrasil = new Locale("pt", "BR");
    public PedidoService(ClienteRepository clienteRepository, ServicoRepository servicoRepository, PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository, PagamentoRepository pagamentoRepository,ClienteEmpresaRepository clienteEmpresaRepository) {
        this.clienteRepository = clienteRepository;
        this.servicoRepository = servicoRepository;
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.clienteEmpresaRepository = clienteEmpresaRepository;
    }

    public ResponseEntity<List<PedidoEntity>> ListarVendas()
    {
        try
        {
            return new ResponseEntity<>(pedidoRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<PedidoEntity>> ListarVendasAbertos()
    {
        try
        {
            List<PedidoEntity> lista = new ArrayList<>();
            lista = pedidoRepository.findAll();
            List<PedidoEntity> response = new ArrayList<>();
            for(PedidoEntity entity : lista)
            {
                if(entity.getStatus() == STATUS.AGUARDANDO)
                {
                    response.add(entity);
                }
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<PedidoDTO> BuscarVendaPorId(Long id)
    {
        try
        {
            PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
            List<String> itens = new ArrayList<>();
            for(ItemPedidoEntity item: entity.getProdutos())
            {
                itens.add(item.getServico().getNome()+" "+item.getServico().getCodigo());
            }
            PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),itens, entity.getValorTotalFront(),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());
            return new ResponseEntity<>(response,HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }


    public ResponseEntity<PedidoDTO> NovoVenda(Long idCliente,
                                               Long idClienteEmpresa,
                                               String clienteNome,
                                               Long prefixo,
                                               Long telefone,
                                               String relatoProblema)
    {
        try
        {
            if(relatoProblema == null){throw  new NullargumentsException();}
            if(idCliente == null && idClienteEmpresa == null && clienteNome == null){throw new NullargumentsException();}
            PedidoEntity entity = new PedidoEntity();
            if(idCliente != null)
            {
                ClienteEntity cliente = clienteRepository.findById(idCliente).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                entity.setCliente(cliente);
                entity.setNomeCliente(cliente.getNome()+" "+cliente.getSobrenome());
                entity.setCpfCnpj(cliente.getCpf());
                entity.setRelato(relatoProblema);
                entity.setTelefone("("+cliente.getContato().getPrefixo()+") "+cliente.getContato().getTelefone());
                int dig = (int) (1111 + Math.random() * 9999);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setDataPedido(LocalDateTime.now());
                entity.setValorTotal(0.0);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setCodigo("Pd_"+dig);
                entity.setStatus(STATUS.AGUARDANDO);
                pedidoRepository.save(entity);
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),null,entity.getValorTotalFront(),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());
                return new ResponseEntity<>(response,HttpStatus.CREATED);
            }
            if(idClienteEmpresa != null)
            {
                ClienteEmpresaEntity clienteEmpresa = clienteEmpresaRepository.findById(idClienteEmpresa).orElseThrow(
                        ()-> new EntityNotFoundException()
                        );
                entity.setClienteEmpresa(clienteEmpresa);
                entity.setNomeCliente(clienteEmpresa.getRazaoSocial());
                entity.setCpfCnpj(clienteEmpresa.getCnpj());
                entity.setRelato(relatoProblema);
                entity.setTelefone("("+clienteEmpresa.getContato().getPrefixo()+") "+clienteEmpresa.getContato().getTelefone());
                int dig = (int) (1111 + Math.random() * 9999);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setDataPedido(LocalDateTime.now());
                entity.setValorTotal(0.0);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setCodigo("Pd_"+dig);
                entity.setStatus(STATUS.AGUARDANDO);
                pedidoRepository.save(entity);
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),null,entity.getValorTotalFront(),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());
                return new ResponseEntity<>(response,HttpStatus.CREATED);
            }
            if(clienteNome != null)
            {
                int dig = (int) (1111 + Math.random() * 9999);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setNomeCliente(clienteNome);
                entity.setTelefone("("+prefixo+") "+telefone);
                entity.setDataPedido(LocalDateTime.now());
                entity.setValorTotal(0.0);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setCodigo("Pd_"+dig);
                entity.setStatus(STATUS.AGUARDANDO);
                pedidoRepository.save(entity);
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),null,entity.getValorTotalFront(),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());
                return new ResponseEntity<>(response,HttpStatus.CREATED);
            }
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public void AdicionarProdutoVenda(Long id,
                                      Long idServico)
    {
        try
        {
            if(id != null &&
               idServico != null)
            {
                PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                ServicoEntity servico = servicoRepository.findById(idServico).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                ItemPedidoEntity itemPedido = new ItemPedidoEntity();
                itemPedido.setServico(servico);
                itemPedido.setNome(servico.getNome());
                itemPedido.setValorItem(servico.getValor());
                itemPedido.setTimeStamp(LocalDateTime.now());
                itemPedidoRepository.save(itemPedido);
                Double valorItem = itemPedido.getValorItem();
                entity.getProdutos().add(itemPedido);
                entity.setValorTotal(entity.getValorTotal()+valorItem);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setTimeStamp(LocalDateTime.now());
                pedidoRepository.save(entity);
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void FinalizarVenda(Long id,
                                FORMAPAGAMENTO formaPagamento,
                                Double parcelas)
    {
        try
        {
            if(id != null &&
               formaPagamento != null)
            {
                if(parcelas < 0){throw new IllegalActionException("O campo não pode ser negativo");}
                if(formaPagamento != FORMAPAGAMENTO.CREDITO && parcelas > 1)
                {throw new IllegalActionException("Somente compras no crédito podem ser parceladas");}
                PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                PagamentoEntity pagamento = new PagamentoEntity();
                pagamento.setFormaPagamento(formaPagamento);
                pagamento.setParcelas(parcelas);
                pagamento.setValor(entity.getValorTotal());
                pagamento.setDataPagamento(LocalDateTime.now());
                pagamento.setTimeStamp(LocalDateTime.now());
                pagamentoRepository.save(pagamento);
                entity.setStatus(STATUS.PAGO);
                entity.setDataPagamento(LocalDateTime.now());
                entity.setPagamento(pagamento);
                pedidoRepository.save(entity);
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }


}
