import './Cliente.css';
import { useEffect, useState } from 'react'
import Axios from 'axios';

function Cliente() {

    //const baseUrl = "http://34.133.121.3:8080"
    const baseUrl = "http://localhost:8080"
    const [filtroCadastro, setfiltroCadastro] = useState('')
    const[APIDataCpf, setAPIDataCpf]= useState([]);
    const[APIDataCnpj, setAPIDataCnpj]= useState([]);

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
        <div className="BoxConteudoPagina">
            
            <div className='SeletorCadastro'>
                <input type='radio' value="CPF" onClick={(e)=>{setfiltroCadastro(e.target.value)}} />CPF
                <input type='radio' value="CNPJ" onClick={(e)=>{setfiltroCadastro(e.target.value)}} />CNPJ
            </div>
            <div className='Conteudointerno'>
            {filtroCadastro.length ===3?(<>
                {APIDataCpf.map((data, i)=>{
                    return(<>
                        <div className='clienteBoxRetorno' key={i}>
                    <div className='infoDestaque'>
                        <span>{data.nome} {data.sobrenome} </span><br/>
                        <span>({data.contato.prefixo}) {data.contato.telefone}</span>
                    </div>
                    <div className='info'>
                        <span>
                            {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}
                        </span><br/>
                    </div>
                </div>
                    </>)
                })}
                
            </>):(<>
                {APIDataCnpj.map((data, i)=>{
                    return(<>
                    <div className='clienteBoxRetorno' key={i}>
                    <div className='infoDestaque'>
                    <span>{data.razaoSocial}</span><br/>
                        <span>({data.contato.prefixo}) {data.contato.telefone}</span>
                    </div>
                    <div className='info'>
                        <span>{data.cnpj}</span><br/>
                        <span>
                            {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}
                        </span><br/>
                    </div>
                </div>
                    </>)
                })}
                
            </>)}
            </div>
            
        </div>
    
    
    </>)}

    export default Cliente;