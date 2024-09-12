import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../PageGlobal.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import NovaOrdem from '../OrdemServiço/NovaOrdem';
import AdicionarServico from '../OrdemServiço/AdicionarServico';
import FinalizarPedido from '../Caixa/Caixa'
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
  const [seletorOpcao, setseletorOpcao] = useState('')
  const [idItem, setidItem] = useState('')
  const[APIDataCliente, setAPIDataCliente]= useState([]);
  const[APIDataClienteEmpresa, setAPIDataClienteEmpresa]= useState([]);
  const[APIDataServicos, setAPIDataServicos]= useState([]);
  const[APIDataOrdemServico, setAPIAPIDataOrdemServico]= useState([]);
  const[PostData, setPostData] = useState({
    codigo: '',
    cliente: '',
    data: '',
    itens: [],
    valor: '',
    statusPagamento: ''
  })
  const [idCLiente, setidCLiente] = useState('')
  const [idClienteEmpresa, setidClienteEmpresa] = useState('')
  const [idServico, setidServico] = useState('')
  const [idOrdemServico, setidOrdemServico] = useState('')
  const [nomeCLiente, setnomeCLiente] = useState('')
  const [relatoProblema, setrelatoProblema] = useState('')
  const [prefixo, setprefixo] = useState('')
  const [telefone, settelefone] = useState('')
  const[dadoPesquisaServico, setdadoPesquisaServico] = useState('')
  const[dadoPesquisaOrdemServico, setdadoPesquisaOrdemServico] = useState('')
  const[dadoPesquisaCpf, setdadoPesquisaCpf] = useState('')
  const[dadoPesquisaCnpj, setdadoPesquisaCnpj] = useState('')
  const pesquisaOs = dadoPesquisaCpf.length > 0 ?
  APIDataOrdemServico.filter(dados => dados.codigo.includes(dadoPesquisaOrdemServico)) :
    [];
  const pesquisacpf = dadoPesquisaCpf.length > 0 ?
  APIDataCliente.filter(dados => dados.nome.includes(dadoPesquisaCpf)) :
    [];
  const pesquisacnpj = dadoPesquisaCnpj.length > 0 ?
  APIDataClienteEmpresa.filter(dados => dados.razaoSocial.includes(dadoPesquisaCnpj)) :
    [];
  const pesquisaServico = dadoPesquisaServico.length > 0 ?
  APIDataServicos.filter(dados => dados.nome.includes(dadoPesquisaServico)) :
    [];

const [caixa, setCaixa] = useState({
        formaPagamento: "",
        parcelas: 1,
        valorPago: 0
    });

const handleChanageFinalizarOS = (e) => {
        setCaixa(prev=>({...prev,[e.target.name]:e.target.value}));
      }  

      async function FinalizarOs(e){
        try{
          fetch(`${baseUrl}/vendas/FinalizarVenda`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': idOrdemServico,
                'formaPagamento': caixa.formaPagamento,
                'valorPago': caixa.valorPago,
                'parcelas': caixa.parcelas,
        })})
        .then(window.location.reload())
        setCaixa({
          formaPagamento: "",
          valorPago: 0,
          parcelas: 1
      })
      setidOrdemServico('');
        }catch (err){
          console.log("erro")
        }
      }      

  useEffect(() => {
    Axios
      .get(`${baseUrl}/vendas/ListarVendasAbertos`)
      .then((response) => { setAPIAPIDataOrdemServico(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  useEffect(() => {
    Axios
      .get(`${baseUrl}/servico/ListarServicos`)
      .then((response) => { setAPIDataServicos(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  useEffect(() => {
    Axios
      .get(`${baseUrl}/cliente/ListarClientes`)
      .then((response) => { setAPIDataCliente(response.data)})
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  useEffect(() => {
    Axios               
      .get(`${baseUrl}/clienteempresa/ListarClienteEmpresa`)
      .then((response) => { setAPIDataClienteEmpresa(response.data)})
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  useEffect(()=>{
    fetch(`${baseUrl}/vendas/BuscarVendaPorId?id=${idOrdemServico}`,
        {
            method:'GET',
            headers:{
                'content-type': 'application/json',
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setPostData(data)
        })
        .catch(err => console.log(err))
}, [idOrdemServico])

async function NovaOrdemServico(id){
    try{
     await fetch(`${baseUrl}/vendas/NovoVenda`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'idCliente': idCLiente,
            'idClienteEmpresa': idClienteEmpresa,
            'clienteNome':nomeCLiente,
            'prefixo': prefixo,
            'telefone': telefone,
            'relatoProblema': relatoProblema
    })})
    .then(navigate("/"))  
    setidCLiente('');
    setidClienteEmpresa('')
    setdadoPesquisaCpf('')
    setdadoPesquisaCnpj('')
    setnomeCLiente('')
    setrelatoProblema('')
    settelefone('')
    setprefixo('')   
    }catch (err){
      console.log("erro")
    }
  }

  const AdicionarServicoOS=async (e)=>{
    try{
      fetch(`${baseUrl}/vendas/AdicionarProdutoVenda`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'id': idOrdemServico,
            'idServico': idServico,
    })})
    .then(navigate("/"))  
    }catch (err){
      console.log("erro")
    }
  }  


    return(<>

        <div className='ndbodyFlex'>

            <div className='ndBodyRetornoTabela'>

                <div className='blocoAdicional'>
                    <button type="button" class="btn btn-primary" onClick={(e)=>{setseletorOpcao("novaOs")}}>Nova OS</button>
                </div>
                <div className='blocoAdicional'>

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Código</span>
                        <input type="text" class="form-control" name='dadoPesquisaOrdemServico' onChange={(e)=>{setdadoPesquisaOrdemServico(e.target.value)}} placeholder="Código Os Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                </div>
                <div className='homeRetornoTabela'>
                
                    <table class="table-light">
                        <tr>
                            <td class="table-light">Cliente</td>
                            <td class="table-light">Código</td>
                            <td class="table-light">Valor Atual</td>
                            <td class="table-light">Data De Abertura</td>
                        </tr>
                        {dadoPesquisaOrdemServico.length>0?(<>
                            
                            {pesquisaOs.map((data, i)=>{
                        return(<>

                          <tr key={i}>                         
                            <td class="table-light">{data.nomeCliente}</td>
                            <td class="table-light">{data.codigo}</td>
                            <td class="table-light">{data.valorTotalFront}</td>
                            <td class="table-light">{data.dataPedido}</td>
                          </tr>
                          <tr>
                            <td>
                                <button onClick={(e)=>{setseletorOpcao("info"); setidOrdemServico(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                            </td>
                            <td>
                                <button onClick={(e)=>{setseletorOpcao("addservico"); setidOrdemServico(data.id)}} type="button" class="btn btn-outline-success">Adicionar Serviço</button>
                            </td>
                            <td>    
                                <button onClick={(e)=>{setseletorOpcao("finalizarOs"); setidOrdemServico(data.id)}} type="button" class="btn btn-outline-success">Finalizar OS</button>
                            </td>
                          </tr>          

                        </>)
                        })}
                        
                        </>):(<>
                        
                            {APIDataOrdemServico.map((data, i)=>{
                        return(<>

                          <tr key={i}>                         
                            <td class="table-light">{data.nomeCliente}</td>
                            <td class="table-light">{data.codigo}</td>
                            <td class="table-light">{data.valorTotalFront}</td>
                            <td class="table-light">{data.dataPedido}</td>
                          </tr>
                          <tr>
                            <td>
                                <button onClick={(e)=>{setseletorOpcao("info"); setidOrdemServico(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                            </td>
                            <td>
                                <button onClick={(e)=>{setseletorOpcao("addservico"); setidOrdemServico(data.id)}} type="button" class="btn btn-outline-success">Adicionar Serviço</button>
                            </td>
                            <td>    
                                <button onClick={(e)=>{setseletorOpcao("finalizarOs"); setidOrdemServico(data.id)}} type="button" class="btn btn-outline-success">Finalizar OS</button>
                            </td>
                          </tr>          

                        </>)
                        })}
                        </>)}
                        
                    </table>

                </div>
                

            </div>

            <div className='ndBodyRetornoInformacao'>

                <div className='homeRetornoInfo'>
            
                        {seletorOpcao.length === 4?(<>
                            <div className='blocoRetornoInfo'>
                                <h2>Cliente: {PostData.cliente}</h2><br/>
                                <span>Código: {PostData.codigo}</span><br/>
                                <span>Data: {PostData.data}</span><br/>
                                <table>
                                        <tr>
                                            <td>Serviço</td>
                                            <td>Código</td>
                                            <td>Valor</td>
                                        </tr>
                                {PostData.itens?(<>
                                    {PostData.itens.map((data,i)=>{return(<>  
                                    
                                        
                                        <tr key={i}>
                                            <td>{data.servico}</td>
                                            <td>{data.codigo}</td>
                                            <td>{data.valor}</td>
                                        </tr>
                                        
                                        </>)})}
                                
                                </>):(<>
                                </>)}
                                </table>
                                <span>Valor Atual: {PostData.valor}</span><br/>
                                <span>Status Atual: {PostData.statusPagamento}</span>
                            </div>
                        </>):(<></>)}
                        {seletorOpcao.length === 6?(<>
                            <NovaOrdem></NovaOrdem>
                        </>):(<></>)}
                        {seletorOpcao.length === 10?(<>
                            
                            <div className='blocoRetornoInfo'>

                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Serviço</span>
                                    <input type="text" class="form-control" name='dadoPesquisaServico' onChange={(e)=>{setdadoPesquisaServico(e.target.value)}} placeholder="Serviço Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
                                </div>

                            </div>

                            <div className='blocoRetornoInfo'>

                                <h3>Cliente: {PostData.cliente}</h3>
                                <span>Código: {PostData.codigo}</span><br/>
                                <span>Data: {PostData.data}</span><br/>
                                <table>
                                        <tr>
                                            <td>Serviço</td>
                                            <td>Código</td>
                                            <td>Valor</td>
                                        </tr>
                                {PostData.itens?(<>
                                    {PostData.itens.map((data,i)=>{return(<>                         
                                        <tr key={i}>
                                            <td>{data.servico}</td>
                                            <td>{data.codigo}</td>
                                            <td>{data.valor}</td>
                                        </tr>
                                        
                                        </>)})}
                                         
                                </>):(<>
                                </>)}
                                </table>
                                <span>Valor Atual: {PostData.valor}</span>
                            </div>
                            <div className='blocoRetornoInfo'>
                                <form onClick={AdicionarServicoOS}>
                                    <table>
                                    <td><button type="submit" class="btn btn-success">Salvar</button></td>
                                    </table>
                                </form>
                            </div>
                            <div className='blocoRetornoInfo'>
                                <table>
                                    <tr>
                                    <td>Selecionar</td>
                                    <td>Serviço</td>
                                    <td>Código</td>
                                    <td>Valor</td>
                                    </tr>
                                    {dadoPesquisaServico.length>0?(<>
                                    
                                        {pesquisaServico.map((data,i)=>{return(<>
                                            <tr>
                                                <td><input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/></td>
                                                <td>{data.nome}</td>
                                                <td>{data.codigo}</td>
                                                <td>{data.valorFront}</td>
                                            </tr>
                                        </>)})}
                                    </>):(<>
                                    
                                        {APIDataServicos.map((data,i)=>{return(<>
                                            <tr>
                                                <td><input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/></td>
                                                <td>{data.nome}</td>
                                                <td>{data.codigo}</td>
                                                <td>{data.valorFront}</td>
                                            </tr>
                                        </>)})}
                                    </>)}
                                </table>    
                            </div>
                        </>):(<></>)}
                        {seletorOpcao.length === 11?(<>
                            <div className='blocoRetornoInfo'>

                                <h3>Cliente: {PostData.cliente}</h3>
                                <span>Código: {PostData.codigo}</span><br/>
                                <span>Data: {PostData.data}</span><br/>
                                <table>
                                        <tr>
                                            <td>Serviço</td>
                                            <td>Código</td>
                                            <td>Valor</td>
                                        </tr>
                                {PostData.itens?(<>
                                    {PostData.itens.map((data,i)=>{return(<>
                                    
                                        
                                        <tr key={i}>
                                            <td>{data.servico}</td>
                                            <td>{data.codigo}</td>
                                            <td>{data.valor}</td>
                                        </tr>
                                        
                                        </>)})}
                                </>):(<>
                                    
                                </>)}
                                </table>
                                <span>Valor Atual: {PostData.valor}</span>
                            </div>
                        <div className='blocoRetornoInfo'> 
                            <form onSubmit={FinalizarOs}>
                                
                                <table>
                                    <tr>
                                        <td>
                                        <div class="input-group">
                                            <span class="input-group-text">Forma de pagamento</span>
                                            <input list="formaPagamento" name="formaPagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanageFinalizarOS} />
                                                <datalist id="formaPagamento">
                                                <option value="DINHEIRO">DINHEIRO</option>
                                                <option value="PIX">PIX</option>
                                                <option value="CREDITO">CREDITO</option>
                                                <option value="DEBITO">DEBITO</option>
                                                </datalist>                          
                                        </div>
                                        </td> 
                                    </tr>
                                    <tr>
                                        {caixa.formaPagamento.length ===8?(<>
                                        
                                        <div class="input-group">
                                            <span class="input-group-text">Valor Pago</span>
                                            <input type="number" class="form-control" name='valorPago' onChange={handleChanageFinalizarOS} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>

                                        </>):(<></>)} 
                                        {caixa.formaPagamento.length ===7?(<>
                                        <div class="input-group">
                                            <span class="input-group-text">parcelas</span>
                                            <input type="number" class="form-control" name='parcelas' onChange={handleChanageFinalizarOS} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                        </>):(<></>)} 
                                    </tr>
                                    <tr>
                                        <td><button type="submit" class="btn btn-success">Salvar</button></td>
                                    </tr>
                                </table>

                            </form>
                        </div>                      
                        </>):(<></>)}
                </div>                

            </div>

        </div>


       
    </>)
}

export default Home