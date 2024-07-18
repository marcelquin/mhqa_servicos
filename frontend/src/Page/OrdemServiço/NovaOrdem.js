import '../PageGlobal.css'
import './OrdemServico.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';

function NovaOrdem() {

    //const baseUrl = "http://34.133.121.3:8080"
    const baseUrl = "http://localhost:8080"
    const navegate = useNavigate()
    const [filtroCadastro, setfiltroCadastro] = useState('')
    const [idCLiente, setidCLiente] = useState('')
    const [idClienteEmpresa, setidClienteEmpresa] = useState('')
    const [nomeCLiente, setnomeCLiente] = useState('')
    const[APIDataCpf, setAPIDataCpf]= useState([]);
    const[APIDataCnpj, setAPIDataCnpj]= useState([]);
    const[dadoPesquisaCpf, setdadoPesquisaCpf] = useState('')
    const[dadoPesquisaCnpj, setdadoPesquisaCnpj] = useState('')
    const pesquisacpf = dadoPesquisaCpf.length > 0 ?
    APIDataCpf.filter(dados => dados.nome.includes(dadoPesquisaCpf)) :
    [];
    const pesquisacnpj = dadoPesquisaCnpj.length > 0 ?
    APIDataCnpj.filter(dados => dados.nome.includes(dadoPesquisaCnpj)) :
    [];

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
                'clienteNome':nomeCLiente
        })})
        .then(navegate("/"))  
        setidCLiente('');
        setidClienteEmpresa('')
        setdadoPesquisaCpf('')
        setdadoPesquisaCnpj('')
        setnomeCLiente('')   
        }catch (err){
          console.log("erro")
        }
      }

    useEffect(() => {
        Axios
          .get(`${baseUrl}/cliente/ListarClientes`)
          .then((response) => { setAPIDataCpf(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);
      


      useEffect(() => {
        Axios               
          .get(`${baseUrl}/clienteempresa/ListarClienteEmpresa`)
          .then((response) => { setAPIDataCnpj(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    
    return(
        <>
            <div className='SeletorCadastro'>
                    <input type='radio' value="CPF" onClick={(e)=>{setfiltroCadastro(e.target.value)}} />CPF
                    <input type='radio' value="CNPJ" onClick={(e)=>{setfiltroCadastro(e.target.value)}} />CNPJ
                </div>
            <div className="boxgeral">

                {filtroCadastro.length === 3?(<>
                    
                    <div className="campoPesquisa">
                        <label>Nome:<br/>
                        <input type="text" name="dadoPesquisacpf" className="inputPesquisa" onChange={e=> {setdadoPesquisaCpf(e.target.value); setnomeCLiente(e.target.value)}} placeholder="Digite o Nome para busca" />
                        </label>
                        <input type='submit' value="Iniciar OS" onClick={NovaOrdemServico} />
                    </div>
                    
                    <div className='conteudoInterno'>
                        
                        {dadoPesquisaCpf.length > 0?(<>
                            {pesquisacpf.map((data, i)=>{
                            return(<>
                            <div className="Retorno">
                             <input type='checkbox' onClick={(e)=>{setidCLiente(data.id)}}/>Selecionar
                              <div className="Destaque">
                                <div className="infoOs">
                                  <span>{data.nome} {data.sobrenome}</span><br/><br/>
                                  <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              </div>
                              </div>
                              
                            </div>
                              </>)
                        })}
                        </>):(<>
                            {APIDataCpf.map((data, i)=>{
                        return(<>
                            <div className="Retorno">
                             <input type='checkbox' onClick={(e)=>{setidCLiente(data.id)}}/>Selecionar
                              <div className="Destaque">
                                <div className="infoOs">
                                  <span>{data.nome} {data.sobrenome}</span><br/><br/>
                                  <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              </div>
                              </div>
                            </div>
                        </>)
                    })} 
                        </>)}                                     
                    </div>               
                </>):(<>
                    <div className="campoPesquisa">
                        <label>Nome:<br/>
                        <input type="text" name="dadoPesquisacnpj" className="inputPesquisa" onChange={e=> {setdadoPesquisaCnpj(e.target.value); setnomeCLiente(e.target.value)}} placeholder="Digite o Nome para busca" />
                        </label>
                        <input type='submit' value="Iniciar OS" onClick={NovaOrdemServico} />
                    </div>
                    <div className='conteudoInterno'>
                        {dadoPesquisaCnpj.length > 0?(<>
                            {pesquisacnpj.map((data, i)=>{
                            return(<>
                            <div className="Retorno">
                             <input type='checkbox' onClick={(e)=>{setidClienteEmpresa(data.id)}}/>Selecionar
                              <div className="Destaque">
                                <div className="infoOs">
                                  <span>{data.razaoSocial}</span><br/><br/>
                                  <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              </div>
                              </div>
                            </div>
                            </>)
                        })}
                        </>):(<>
                            {APIDataCnpj.map((data, i)=>{
                        return(<>
                            <div className="Retorno">
                             <input type='checkbox' onClick={(e)=>{setidClienteEmpresa(data.id)}}/>Selecionar
                              <div className="Destaque">
                                <div className="infoOs">
                                  <span>{data.razaoSocial}</span><br/><br/>
                                  <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              </div>
                              </div>
                            </div>
                        </>)
                    })} 
                        </>)}                                     
                    </div>               
                
                </>)}
            </div>
        </>)
}

export default NovaOrdem