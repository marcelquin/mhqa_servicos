import './ClienteAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdmClienteGerencia()
{
    //onChange={e=> setdadoPesquisaCpf(e.target.value)} 
    const[filtroCadastro, setfiltroCadastro] = useState('')
   
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

    const baseUrl = "http://34.28.64.143:8080"
    //const baseUrl = "http://localhost:8080"
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


    return(<>
        <div className="admBoxGeral">
                
                <div className="admBoxNav">
                    <NavAdm></NavAdm>
                </div>

                <div className="admSession">
                    <div className='SeletorCadastro'>
                        <input type='radio' value="CPF" onClick={(e)=>{setfiltroCadastro(e.target.value)}} />CPF
                        <input type='radio' value="CNPJ" onClick={(e)=>{setfiltroCadastro(e.target.value)}} />CNPJ
                     </div>
                     {filtroCadastro.length === 3?(<>
                        
                        <div className='conteudoGeral'>
                           <div className='campoPesquisa'>
                              <label>Nome:<br/>
                              <input type="text" name="dadoPesquisacpf" className="inputPesquisa" onChange={e=> setdadoPesquisaCpf(e.target.value)} placeholder="Digite o Nome para busca" />
                              </label>
                           </div>
                           <div className='conteudoInterno'>

                              {dadoPesquisaCpf.length >0?(<>
                                 
                                 {pesquisacpf.map((data,i)=>{
                                    return(<>

                                       <div className="Retorno">
                                       <span><Link to={`/clienteeditar/${data.id}`}>Editar</Link></span>
                                       <div className="Destaque">
                                          <div className="info">
                                             <span>{data.nome} {data.sobrenome}</span><br/>
                                             <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                             <span>{data.codigo}</span>
                                             <span>{data.dataPedido}</span><br/>
                                             <span>{data.status}</span>
                                          </div>
                                       </div>
                                       <div className="infoGeral">
                                             {data.cpf}<br/>
                                             {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}<br/>
                                             {data.contato.email}
                                       </div>
                                  </div>
                                    
                                    </>)
                                 })}
                                 
                              
                              </>):(<>
                                 
                                 {APIDataCpf.map((data,i)=>{
                                    return(<>

                                       <div className="Retorno">
                                       <span><Link to={`/clienteeditar/${data.id}`}>Editar</Link></span>
                                          <div className="Destaque">
                                          <div className="info">
                                             <span>{data.nome} {data.sobrenome}</span><br/>
                                             <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                             <span>{data.codigo}</span>
                                             <span>{data.dataPedido}</span><br/>
                                             <span>{data.status}</span>
                                          </div>
                                       </div>
                                       <div className="infoGeral">
                                             {data.cpf}<br/>
                                             {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}<br/>
                                             {data.contato.email}
                                       </div>
                                  </div>
                                    
                                    </>)
                                 })}
                                 
                              </>)}

                            </div>  
                        </div>
                        
                     </>):(<>
                     
                        <div className='conteudoGeral'>
                           <div className='campoPesquisa'>
                              <label>Nome:<br/>
                              <input type="text" name="dadoPesquisacnpj" className="inputPesquisa" onChange={e=> setdadoPesquisaCnpj(e.target.value)} placeholder="Digite o Nome para busca" />
                              </label>
                           </div>
                           <div className='conteudo'>
                           {dadoPesquisaCnpj.length >0?(<>

                              {pesquisacnpj.map((data, i)=>{
                                 return(<>
                                    <div className="Retorno">
                                    <span><Link to={`/clienteempresaeditar/${data.id}`}>Editar</Link></span>
                                    <div className="Destaque">
                                <div className="info">
                                  <span>{data.razaoSocial}</span><br/>
                                  <span> {data.cnpj}</span><br/>
                              </div>
                            </div>
                            <div className="infoGeral">
                             {data.nome} {data.razaoSocial}<br/>
                             ({data.contato.prefixo}) {data.contato.telefone}<br/>
                             {data.cpf}<br/>
                             {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}<br/>
                             {data.contato.email}
                            </div>
                         </div>
                                 </>)
                              })}
                           </>):(<>
                           
                              {APIDataCnpj.map((data, i)=>{
                                 return(<>
                                    <div className="Retorno">
                                    <span><Link to={`/clienteempresaeditar/${data.id}`}>Editar</Link></span>
                                    <div className="Destaque">
                                          <div className="info">
                                             <span>{data.razaoSocial}</span><br/>
                                             <span> {data.cnpj}</span><br/>
                                          </div>
                                       </div>
                                       <div className="infoGeral">
                                       {data.nome} {data.razaoSocial}<br/>
                                       ({data.contato.prefixo}) {data.contato.telefone}<br/>
                                       {data.cpf}<br/>
                                       {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}<br/>
                                       {data.contato.email}
                                       </div>
                                    </div>
                                 </>)
                              })}
                           
                           </>)}
                           </div>
                        </div> 
                     </>)}
                     
                                
       </div></div>
    
    </>)
}

