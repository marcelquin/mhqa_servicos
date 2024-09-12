import '../PageGlobal.css'
import './OrdemServico.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';

function NovaOrdem() {

  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const navegate = useNavigate()
    const [filtroCadastro, setfiltroCadastro] = useState('')
    const [idCLiente, setidCLiente] = useState('')
    const [idClienteEmpresa, setidClienteEmpresa] = useState('')
    const [nomeCLiente, setnomeCLiente] = useState('')
    const [relatoProblema, setrelatoProblema] = useState('')
    const [prefixo, setprefixo] = useState('')
    const [telefone, settelefone] = useState('')
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
                'clienteNome':nomeCLiente,
                'prefixo': prefixo,
                'telefone': telefone,
                'relatoProblema': relatoProblema
        })})
        .then(navegate("/"))  
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
          <div className='blocoRetornoInfo'>

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
          <div className='blocoRetornoInfo'>

              {filtroCadastro.length === 3?(<>
              
                <div className='blocoRetornoInfo'>

                  <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">Nome</span>
                      <input type="text" class="form-control" name='dadoPesquisaCpf' onChange={(e)=>{setdadoPesquisaCpf(e.target.value)}}  placeholder="Nome Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>

                </div>

                <div className='blocoRetornoInfo'>

                  <form onSubmit={NovaOrdemServico}>
                    <table>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Nome</span>
                            <input type="text" class="form-control" name='nome' className="inputPesquisa" onChange={e=> {setdadoPesquisaCpf(e.target.value); setnomeCLiente(e.target.value)}} placeholder="Razão Social da Empresa" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Prefixo</span>
                            <input type="text" class="form-control" name='prefixo' onChange={e=> {setprefixo(e.target.value)}} placeholder="00" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Telefone</span>
                            <input type="text" class="form-control" name='telefone' placeholder="000000000" onChange={e=> {settelefone(e.target.value)}} aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Razão Social</span>
                            <input type="text" class="form-control" name='relatoProblema' onChange={e=> {setrelatoProblema(e.target.value)}} placeholder="Defeito Relatado" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button type="submit" class="btn btn-success">Salvar</button>
                        </td>
                      </tr>
                    </table>
                  </form>

                </div>
                
                <div className='blocoRetornoInfo'>

                    <table>
                      <tr>
                        <td>Selecionar</td>
                        <td>Nome</td>
                        <td>Telefone</td>
                      </tr>

                      {dadoPesquisaCpf.length >0?(<>
                      
                        {pesquisacpf.map((data, i)=>{return(<>
                        
                          <tr key={i}>
                            <td><input type='checkbox' onClick={(e)=>{setidCLiente(data.id)}}/>Selecionar</td>
                            <td>{data.nome} {data.sobrenome}</td>
                            <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                          </tr>
                        </>)})}
                      </>):(<>
                      
                        {APIDataCpf.map((data, i)=>{return(<>
                        
                          <tr key={i}>
                            <td><input type='checkbox' onClick={(e)=>{setidCLiente(data.id)}}/>Selecionar</td>
                            <td>{data.nome} {data.sobrenome}</td>
                            <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                          </tr>
                        </>)})}
                      </>)}  

                    </table>

                </div>
              </>):(<></>)}
              {filtroCadastro.length === 4?(<>
              
                <div className='blocoRetornoInfo'>

                  <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">Razão Social</span>
                      <input type="text" class="form-control" name='dadoPesquisaCnpj' onChange={(e)=>{setdadoPesquisaCnpj(e.target.value)}} placeholder="Razão social Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>

                </div>

                <div className='blocoRetornoInfo'>

                  <form onSubmit={NovaOrdemServico}>
                    <table>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Nome</span>
                            <input type="text" class="form-control" name='nome' className="inputPesquisa" onChange={e=> {setdadoPesquisaCpf(e.target.value); setnomeCLiente(e.target.value)}} placeholder="Razão Social da Empresa" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Prefixo</span>
                            <input type="text" class="form-control" name='prefixo' onChange={e=> {setprefixo(e.target.value)}} placeholder="00" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Telefone</span>
                            <input type="text" class="form-control" name='telefone' placeholder="000000000" onChange={e=> {settelefone(e.target.value)}} aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Razão Social</span>
                            <input type="text" class="form-control" name='relatoProblema' onChange={e=> {setrelatoProblema(e.target.value)}} placeholder="Defeito Relatado" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button type="submit" class="btn btn-success">Salvar</button>
                        </td>
                      </tr>
                    </table>
                  </form>

                </div>

                <div className='blocoRetornoInfo'>

                    <table>
                      <tr>
                        <td>Selecionar</td>
                        <td>Razão Social</td>
                        <td>Telefone</td>
                      </tr>
                      {dadoPesquisaCnpj.length >0?(<>
                      
                      {pesquisacnpj.map((data, i)=>{return(<>
                      
                        <tr key={i}>
                            <td><input type='checkbox' onClick={(e)=>{setidClienteEmpresa(data.id)}}/>Selecionar</td>
                            <td>{data.razaoSocial}</td>
                            <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                        </tr>
                      </>)})}
                    </>):(<>
                    
                      {APIDataCnpj.map((data, i)=>{return(<>
                      
                        <tr key={i}>
                            <td><input type='checkbox' onClick={(e)=>{setidClienteEmpresa(data.id)}}/>Selecionar</td>
                            <td>{data.razaoSocial}</td>
                            <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                        </tr>
                      </>)})}
                    </>)} 
                    </table>

                </div>
              </>):(<></>)}
          </div>
        </>)     
}

export default NovaOrdem