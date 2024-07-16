import './ClienteAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import Axios from 'axios';

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

    //const baseUrl = "http://34.133.121.3:8080"
    const baseUrl = "http://localhost:8080"
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
                           
                           {dadoPesquisaCpf.length > 0 ?(<>
                              {pesquisacpf.map((data, i)=>{
                                 return(<>
                                    <div className='cartaoRetorno'>
                                       <div className='destaque'>
                                          {data.nome} {data.sobrenome}<br/>
                                          ({data.contato.prefixo}) {data.contato.telefone}
                                       </div>
                                       <div className='Info'>
                                          {data.nome} {data.sobrenome}<br/>
                                          ({data.contato.prefixo}) {data.contato.telefone}<br/>
                                          {data.cpf}<br/>
                                          {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}<br/>
                                          {data.contato.email}
                                 </div>
                           </div>
                                 </>)
                              })}
                           </>):(<>
                              {APIDataCpf.map((data, i)=>{
                                 return(<>
                                    <div className='cartaoRetorno'>
                                       <div className='destaque'>
                                          {data.nome} {data.sobrenome}<br/>
                                          ({data.contato.prefixo}) {data.contato.telefone}
                                       </div>
                                       <div className='Info'>
                                          {data.nome} {data.sobrenome}<br/>
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
                       
                     </>):(<>
                     <div className='conteudoGeral'>
                        <div className='campoPesquisa'>
                           <label>Nome:<br/>
                           <input type="text" name="dadoPesquisacnpj" className="inputPesquisa" onChange={e=> setdadoPesquisaCnpj(e.target.value)} placeholder="Digite o Nome para busca" />
                           </label>
                        </div>
                        <div className='conteudo'>
                        {dadoPesquisaCnpj.length > 0 ?(<>
                              {pesquisacnpj.map((data, i)=>{
                                 return(<>
                                   <div className='cartaoRetorno'>
                                          <div className='destaque'>
                                             {data.razaoSocial}<br/>
                                             {data.cnpj}
                                          </div>
                                          <div className='Info'>
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
                                    <div className='cartaoRetorno'>
                                          <div className='destaque'>
                                             {data.razaoSocial}<br/>
                                             {data.cnpj}
                                          </div>
                                          <div className='Info'>
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
                     </div>            
            </div>
    
    </>)
}

