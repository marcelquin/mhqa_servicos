import './OrdemServicoAdm.css'
import '../AdmGlobal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import { useReactToPrint } from "react-to-print";

export default function OrdemServicoAdmGerencia()
{
  const documentPrint = useRef();
  const handlePrint = useReactToPrint  ({
    content: ()=> documentPrint.current,
  })
  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);
    const [ApiDataProrpietario, setApiDataProrpietario] = useState([])
    const[dadoPesquisaOrdemServico, setdadoPesquisaOrdemServico] = useState('')
    const[seletor, setseletor] = useState('')
    const[idInfo, setidInfo] = useState('')
    const pesquisaOs = dadoPesquisaOrdemServico.length > 0 ?
    APIData.filter(dados => dados.codigo.includes(dadoPesquisaOrdemServico)) :
    [];
    const[PostData, setPostData] = useState({
        codigo: '',
        cliente: '',
        data: '',
        itens: [],
        valor: '',
        parcelas: '',
        statusPagamento: '',
        formaPagamento: '',
        dataPagamento: ''
      })
      
    useEffect(() => {
      Axios
        .get(`${baseUrl}/vendas/ListarVendas`)
        .then((response) => { setAPIData(response.data)}) 
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/empresa/ListarEmpresas`)
        .then((response) => { setApiDataProrpietario(response.data)}) 
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    useEffect(()=>{
      fetch(`${baseUrl}/vendas/BuscarVendaPorId?id=${idInfo}`,
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
  }, [idInfo])

    return(<>
          <NavAdm></NavAdm>
          <div className='admBlocoFlex'>

          <div className='admBlocoRetornoTabela'>
              <div className='blocoAdicional'>

                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Código</span>
                  <input type="text" class="form-control" name='dadoPesquisaOrdemServico' onChange={(e)=>{setdadoPesquisaOrdemServico(e.target.value)}} placeholder="Código Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
              </div>
              <div className='blocoRetornoInfo'>

                <table>
                    <tr>
                        <td>Cliente</td>
                        <td>Código</td>
                        <td>Data Inicio</td>
                        <td>Valor</td>
                        <td>Status</td>
                        <td>Data Finalização</td>
                    </tr>
                    {dadoPesquisaOrdemServico.length>0?(<>
                    
                        {pesquisaOs.map((data,i)=>{return(<>
                          <tr>
                            <td>{data.nomeCliente}</td>
                            <td>{data.codigo}</td>
                            <td>{data.dataPedido}</td>
                            <td>{data.valorTotalFront}</td>
                            <td>{data.status}</td>
                            <td>{data.pagamento.dataPagamento}</td>
                          </tr>
                          <tr>
                            <td>
                              <button onClick={(e)=>{setseletor("info"); setidInfo(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                            </td>
                          </tr>
                        </>)})}
                    </>):(<>
                        {APIData.map((data,i)=>{return(<>
                        
                          <tr>
                            <td>{data.nomeCliente}</td>
                            <td>{data.codigo}</td>
                            <td>{data.dataPedido}</td>
                            <td>{data.valorTotalFront}</td>
                            <td>{data.status}</td>
                            <td>{data.dataPagamento}</td>
                          </tr>
                          <tr>
                            <td>
                              <button onClick={(e)=>{setseletor("info"); setidInfo(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                            </td>
                          </tr>
                        </>)})}
                    </>)}
                </table>                  
              </div>      
          </div>
          <div className='admBlocoInfo' >
              
              <div className='conteudoVisor' >
              <button onClick={handlePrint} type="button" class="btn btn-outline-success">Imprimir</button>
                <div className='blocoPrint' ref={documentPrint}>
                {ApiDataProrpietario?(<>
                  {ApiDataProrpietario.map(data=>{return(<>
                    <h3>{data.razaoSocial}</h3>
                    <span>{data.cnpj}</span><br/>
                    <span> {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                    <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                  </>)})}                
                </>):(<></>)}

                <h3>Cliente: {PostData.cliente}</h3>
                <span>Código: {PostData.codigo}</span><br/>
                <span>Data Inicio: {PostData.data}</span><br/>
                <span>Valor: {PostData.valor}</span><br/>
                 {PostData.itens?(<>
                  <table>     
                  <tr>
                     <td>Serviço</td>
                     <td>Código</td>
                     <td>Valor</td>       
                  </tr>
                  {PostData.itens.map((data,i)=>{return(<>
                   <tr key={i}>
                    <td>{data.servico}</td>
                    <td>{data.codigo}</td>
                    <td>{data.valor}</td>
                  </tr> 
                </>)})}
                </table>              
                 </>):(<></>)}                                 
                <span>Status: {PostData.statusPagamento}</span><br/>
                <span>Forma de Pagamento: {PostData.formaPagamento}</span><br/>
                <span>Parcela: {PostData.parcelas}</span><br/>
                <span>Data de Pagamento: {PostData.dataPagamento}</span><br/>
                    
                </div>
                
              </div>
          </div>

          </div>
                    
    
    </>)
}

