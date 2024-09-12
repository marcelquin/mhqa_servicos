import './Cliente.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../PageGlobal.css'
import '../../Style/Global.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';

function Cliente() {

  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const [filtroCadastro, setfiltroCadastro] = useState('')
   const[APIDataCpf, setAPIDataCpf]= useState([]); 
   const[dadoPesquisaCpf, setdadoPesquisaCpf]= useState([]);
   const[dadoPesquisaCnpj, setdadoPesquisaCnpj]= useState([]);
    const[APIDataCnpj, setAPIDataCnpj]= useState([]);
    const pesquisacpf = dadoPesquisaCpf.length > 0 ?
    APIDataCpf.filter(dados => dados.nome.includes(dadoPesquisaCpf)) :
      [];
    const pesquisaCnpj = dadoPesquisaCnpj.length > 0 ?
    APIDataCnpj.filter(dados => dados.razaoSocial.includes(dadoPesquisaCnpj)) :
      [];
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

        <div className='blocoAdicional'>

            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={(e)=>{setfiltroCadastro("CPF")}}/>
              <label class="form-check-label" for="flexRadioDefault1">
                CPF
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>{setfiltroCadastro("CNPJ")}}/>
              <label class="form-check-label" for="flexRadioDefault2">
                CNPJ
              </label>
            </div>

        </div>
        {filtroCadastro.length === 3?(<>
        
          <div className='blocoAdicional'>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Nome</span>
              <input type="text" class="form-control" name='dadoPesquisaCpf' onChange={(e)=>{setdadoPesquisaCpf(e.target.value)}} placeholder="Nome Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
          </div>

          <div className='blocoTabela'>

            <table class="table-light">
              <tr>
                <td class="table-light">Nome</td>
                <td class="table-light">Telefone</td>
                <td class="table-light">Endereço</td>
                <td class="table-light">E-mail</td>
              </tr>
              {dadoPesquisaCpf.length>0?(<>
                
                  {pesquisacpf.map((data,i)=>{return(<>
                  
                    <tr>
                      <td>{data.nome} {data.sobrenome}</td>
                      <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                    <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                    <td>{data.contato.email}</td>
                    </tr>
                  </>)})}
              </>):(<>
              
                {APIDataCpf.map((data,i)=>{return(<>
                  
                  <tr>
                    <td>{data.nome} {data.sobrenome}</td>
                    <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                    <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                    <td>{data.contato.email}</td>
                  </tr>
                </>)})} 
              </>)}
            </table>

          </div>
        </>):(<></>)}
        {filtroCadastro.length === 4?(<>
        
          <div className='blocoAdicional'>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Razão Social</span>
              <input type="text" class="form-control" name='dadoPesquisaCnpj' onChange={(e)=>{setdadoPesquisaCnpj(e.target.value)}} placeholder="Razão Social Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
          </div>

          <div className='blocoTabela'>

          <table class="table-light">
            <tr>
              <td class="table-light">Razão Social</td>
              <td class="table-light">CNPJ</td>
              <td class="table-light">Endereço</td>
              <td class="table-light">Telfone</td>
              <td class="table-light">E-mail</td>
            </tr>
            {dadoPesquisaCnpj.length>0?(<>
            
                {pesquisaCnpj.map((data,i)=>{return(<>
                
                  <tr key={i}>
                    <td>{data.razaoSocial}</td>
                    <td>{data.cnpj}</td>
                    <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                    <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                    <td>{data.contato.email}</td>
                  </tr>
                </>)})}
            </>):(<>
            
              {APIDataCnpj.map((data,i)=>{return(<>
                
                <tr key={i}>
                  <td>{data.razaoSocial}</td>
                  <td>{data.cnpj}</td>
                  <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                  <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                  <td>{data.contato.email}</td>
                </tr>
              </>)})}
            </>)}
          </table>

          </div>

        </>):(<></>)}
    </>)}

    export default Cliente;