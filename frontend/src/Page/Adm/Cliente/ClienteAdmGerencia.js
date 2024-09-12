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
    const[seletorOpcao,setseletorOpcao] = useState('')
    const[id,setid] = useState('')
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
    const [clienteData, setclienteData] = useState({
      nome: "",
      sobrenome: "",
      cpf: "",
      dataNascimento: "",
      logradouro: "",
      numero: "",
      bairro: "",
      referencia: "",
      cep: "",
      cidade: "",
      estado: "",
      prefixo: "",
      telefone: "",
      email: ""
    });  
    const [EmpresaData, setEmpresaData] = useState({
      nome: "",
      razaoSocial: "",
      cnpj: "",
      logradouro: "",
      numero: "",
      bairro: "",
      referencia: "",
      cep: "",
      cidade: "",
      estado: "",
      prefixo: "",
      telefone: "",
      email: "",
});

    //const baseUrl = "http://34.135.105.123:8080"
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

    useEffect(()=>{
      fetch(`${baseUrl}/cliente/BuscarClienteporid?id=${id}`, 
          {
              method:'GET',
              headers:{
                  'content-type': 'application/json',
              },
          })
          .then((resp)=> resp.json())
          .then((data)=> {
              setclienteData(data)
          })
          .catch(err => console.log(err))
  }, [id])

  useEffect(()=>{
   fetch(`${baseUrl}/clienteempresa/BuscarClienteEmpresaPorId?id=${id}`,
       {
           method:'GET',
           headers:{
               'content-type': 'application/json',
           },
       })
       .then((resp)=> resp.json())
       .then((data)=> {
           setEmpresaData(data)
       })
       .catch(err => console.log(err))
}, [id])

const handleChanageCpf = (e) => {
   setclienteData(prev=>({...prev,[e.target.name]:e.target.value}));
 }

 const handleChanageCnpj = (e) => {
   setEmpresaData(prev=>({...prev,[e.target.name]:e.target.value}));
 }



 const handleClickCpf=async (e)=>{
   try{
     fetch(`${baseUrl}/cliente/EdiarCliente`, {
       method: 'PUT',
       headers:{
         'Content-Type': 'application/x-www-form-urlencoded'
       },    
       body: new URLSearchParams({
           'id': id,
           'nome':clienteData.nome,
           'sobrenome': clienteData.sobrenome,
           'cpf': clienteData.cpf,
           'dataNascimento':clienteData.dataNascimento,
           'logradouro':clienteData.logradouro,
           'numero':clienteData.numero,
           'bairro':clienteData.bairro,
           'referencia':clienteData.referencia,
           'cep': clienteData.cep,
           'cidade': clienteData.cidade,
           'estado': clienteData.estado,
           'prefixo':clienteData.prefixo,
           'telefone':clienteData.telefone,
           'email':clienteData.email
   })})
   .then(window.location.reload())   
   setclienteData({
       nome: "",
       sobrenome: "",
       cpf: "",
       dataNascimento: "",
       logradouro: "",
       numero: "",
       bairro: "",
       referencia: "",
       cep: "",
       cidade: "",
       estado: "",
       prefixo: "",
       telefone: "",
       email: ""
   })
   }catch (err){
     console.log("erro")
   }
 }

 const handleClickCnpj=async (e)=>{
   try{
       fetch(`${baseUrl}/clienteempresa/EditarClienteEmpresa`, {
         method: 'PUT',
         headers:{
           'Content-Type': 'application/x-www-form-urlencoded'
         },    
         body: new URLSearchParams({
             'id': id,
             'nome':EmpresaData.nome,
             'razaoSocial': EmpresaData.razaoSocial,
             'cnpj': EmpresaData.cnpj,
             'logradouro':EmpresaData.logradouro,
             'numero':EmpresaData.numero,
             'bairro':EmpresaData.bairro,
             'referencia':EmpresaData.referencia,
             'cep': EmpresaData.cep,
             'cidade': EmpresaData.cidade,
             'estado': EmpresaData.estado,
             'prefixo':EmpresaData.prefixo,
             'telefone':EmpresaData.telefone,
             'email':EmpresaData.email
     })})
     .then(window.location.reload())     
     setEmpresaData({
         nome: "",
         sobrenome: "",
         cpf: "",
         dataNascimento: "",
         logradouro: "",
         numero: "",
         bairro: "",
         referencia: "",
         cep: "",
         cidade: "",
         estado: "",
         prefixo: "",
         telefone: "",
         email: ""
     })
     }catch (err){
       console.log("erro")
     }
   }

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
                     <input type="text" class="form-control" name="dadoPesquisaCpf" onChange={e=> setdadoPesquisaCpf(e.target.value)} placeholder="Nome Os Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
               </div>
               <div className='admBlocoFlex'>

               <div className='admBlocoRetornoTabela'>

                  <table>
                     <tr>
                        <td>Nome</td>
                        <td>Telefone</td>
                        <td>E-Mail</td>
                     </tr>
                     {dadoPesquisaCpf.length >0?(<>
                     
                        {pesquisacpf.map((data, i)=>{return(<>
                        <tr key={i}>
                           <td>{data.nome} {data.sobrenome}</td>
                           <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                           <td>{data.contato.email}</td>
                        </tr>
                        <tr>
                           <td>
                              <button onClick={(e)=>{setseletorOpcao("infocpf"); setid(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                           </td>
                           <td>
                              <button onClick={(e)=>{setseletorOpcao("edicaocpf"); setid(data.id)}} type="button" class="btn btn-outline-success">Editar Informações</button>
                           </td>
                        </tr>
                        </>)})}

                     </>):(<>
                     
                        {APIDataCpf.map((data, i)=>{return(<>
                           <tr key={i}>
                              <td>{data.nome} {data.sobrenome}</td>
                              <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                              <td>{data.contato.email}</td>
                           </tr>
                           <tr>
                              <td>
                                 <button onClick={(e)=>{setseletorOpcao("infocpf"); setid(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                              </td>
                              <td>
                                 <button onClick={(e)=>{setseletorOpcao("edicaocpf"); setid(data.id)}} type="button" class="btn btn-outline-success">Editar Informações</button>
                              </td>
                           </tr>
                        
                        </>)})}

                     </>)}
                  </table>

                  </div>
                  <div className='admBlocoInfo'>

                     <div className='conteudoVisor'>
                        {seletorOpcao.length === 7?(<>
                           
                           <table>
                              <tr>
                                 <td>Nome: {clienteData.nome} {clienteData.sobrenome}</td>
                              </tr>
                              <tr>
                                 <td>CPF: {clienteData.cpf}</td>
                              </tr>
                              <tr>
                                 <td>Data de Nascimento: {clienteData.dataNascimento}</td>
                              </tr>
                              <tr>
                                 <td>Endereço: {clienteData.logradouro}, {clienteData.numero}, {clienteData.bairro}, {clienteData.referencia}, {clienteData.cep}, {clienteData.cidade}, {clienteData.estado}</td>
                              </tr>
                              <tr>
                                 <td>Telefone: ({clienteData.prefixo}) {clienteData.telefone}</td>
                              </tr>
                              <tr>
                                 <td>E-mail: {clienteData.email}</td>
                              </tr>
                              <tr>
                                 <td></td>
                              </tr>
                              <tr>
                                 <td></td>
                              </tr>
                           </table>
                        
                        </>):(<></>)}
                        {seletorOpcao.length === 9?(<>
                        
                           <form onSubmit={handleClickCpf}>
                              <table>
                                 <tr>
                                    <td>
                                       <div class="input-group">
                                             <span class="input-group-text">Nome</span>
                                             <input type="text" class="form-control" name='nome' value={clienteData.nome} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                             </div>
                                    </td>
                                 </tr> 
                                 <tr>  
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Sobreome</span>
                                          <input type="text" class="form-control" name='sobrenome' value={clienteData.sobrenome} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr>
                                 <br/>
                                 <tr>
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">CPF</span>
                                          <input type="text" class="form-control" name='cpf' value={clienteData.cpf} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Data de Nascimento</span>
                                          <input type="date" class="form-control" name='dataNascimento' value={clienteData.dataNascimento} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr>
                                 <br/>
                                 <tr>
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Logradouro</span>
                                          <input type="text" class="form-control" name='logradouro' value={clienteData.logradouro} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Numero</span>
                                          <input type="text" class="form-control" name='numero' value={clienteData.numero} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Bairro</span>
                                          <input type="text" class="form-control" name='bairro' value={clienteData.bairro} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr>
                                 <br/>
                                 <tr>
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Referência</span>
                                          <input type="text" class="form-control" name='referencia' value={clienteData.referencia} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Cep</span>
                                          <input type="text" class="form-control" name='cep' value={clienteData.cep} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Cidade</span>
                                          <input type="text" class="form-control" name='cidade' value={clienteData.cidade} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                          <span class="input-group-text">Estado</span>
                                          <input type="text" class="form-control" name='estado' value={clienteData.estado} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr>
                                 <br/>
                                 <tr>
                                    <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Prefixo</span>
                                       <input type="number" class="form-control" name='prefixo' value={clienteData.prefixo} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                       <span class="input-group-text">Telefone</span>
                                       <input type="number" class="form-control" name='telefone' value={clienteData.telefone} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr> 
                                 <tr> 
                                    <td>
                                       <div class="input-group">
                                       <span class="input-group-text">E-Mail</span>
                                       <input type="email" class="form-control" name='email' value={clienteData.email} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCpf} />
                                       </div>
                                    </td>
                                 </tr>
                                 <br/>
                                 <tr>
                                    <td>
                                       <button type="submit" class="btn btn-success">Salvar</button>
                                    </td>
                                 </tr>
                              </table>
                           </form>


                        </>):(<></>)}
                     </div>

                  </div>

               </div>          
            </>):(<>
               <div className='blocoAdicional'>
                  <div class="input-group mb-3">
                     <span class="input-group-text" id="basic-addon1">Razão Social</span>
                     <input type="text" class="form-control" name="dadoPesquisaCnpj" onChange={e=> setdadoPesquisaCnpj(e.target.value)} placeholder="Nome Os Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
               </div>
               <div className='admBlocoFlex'>
                  <div className='admBlocoRetornoTabela'> 

                  <table>
                     <tr>
                        <td>Razão Social</td>
                        <td>CNPJ</td>
                        <td>Telefone</td>
                        <td>Endereço</td>
                     </tr>
                     {dadoPesquisaCnpj.length > 0?(<>
                     
                        {pesquisacnpj.map((data, i)=>{return(<>
                           
                           <tr key={i}>
                           <td>{data.razaoSocial}</td>
                           <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                           <td>{data.contato.email}</td>
                        </tr>
                        <tr>
                           <td>
                              <button onClick={(e)=>{setseletorOpcao("infocnpj"); setid(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                           </td>
                           <td>
                              <button onClick={(e)=>{setseletorOpcao("edicaocnpj"); setid(data.id)}} type="button" class="btn btn-outline-success">Editar Informações</button>
                           </td>
                        </tr>
                        
                        </>)})}

                     </>):(<>
                        
                        {APIDataCnpj.map((data, i)=>{return(<>
                           
                           <tr key={i}>
                           <td>{data.razaoSocial}</td>
                           <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                           <td>{data.contato.email}</td>
                        </tr>
                        <tr>
                           <td>
                              <button onClick={(e)=>{setseletorOpcao("infocnpj"); setid(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                           </td>
                           <td>
                              <button onClick={(e)=>{setseletorOpcao("edicaocnpj"); setid(data.id)}} type="button" class="btn btn-outline-success">Editar Informações</button>
                           </td>
                        </tr>
                        
                        </>)})}
                     
                     </>)}
                  </table>

               </div>
               <div className='admBlocoInfo'>

                  <div className='conteudoVisor'>
                     {seletorOpcao.length===8?(<>
                        <table>
                              <tr>
                                 <td>Nome: {EmpresaData.nome}</td>
                              </tr>
                              <tr>
                                 <td>Razão Social: {EmpresaData.razaoSocial}</td>
                              </tr>
                              <tr>
                                 <td>CNPJ: {EmpresaData.cnpj}</td>
                              </tr>
                              <tr>
                                 <td>Endereço: {EmpresaData.logradouro}, {EmpresaData.numero}, {EmpresaData.bairro}, {EmpresaData.referencia}, {EmpresaData.cep}, {EmpresaData.cidade}, {EmpresaData.estado}</td>
                              </tr>
                              <tr>
                                 <td>Telefone: ({EmpresaData.prefixo}) {EmpresaData.telefone}</td>
                              </tr>
                              <tr>
                                 <td>E-mail: {EmpresaData.email}</td>
                              </tr>
                           </table>
                     
                     </>):(<></>)}
                     {seletorOpcao.length===10?(<>
                        <form onSubmit={handleChanageCnpj}>
                           <table>
                              <tr>
                                 <td>
                                    <div class="input-group">
                                          <span class="input-group-text">Nome</span>
                                          <input type="text" class="form-control" name='nome' value={EmpresaData.nome} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                          </div>

                                 </td>
                              </tr> 
                              <tr>    
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Razão Social</span>
                                       <input type="text" class="form-control" name='razaoSocial' value={EmpresaData.razaoSocial} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr>
                              <br/>
                              <tr>
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">CNPJ</span>
                                       <input type="text" class="form-control" name='cnpj' value={EmpresaData.cnpj} placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr>
                              <br/>
                              <tr>
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Logradouro</span>
                                       <input type="text" class="form-control" name='logradouro' value={EmpresaData.logradouro} placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr> 
                              <tr> 
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Numero</span>
                                       <input type="text" class="form-control" name='numero' value={EmpresaData.numero} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr> 
                              <tr> 
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Bairro</span>
                                       <input type="text" class="form-control" name='bairro' value={EmpresaData.bairro} placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr>
                              <br/>
                              <tr>
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Referência</span>
                                       <input type="text" class="form-control" name='referencia' value={EmpresaData.referencia} placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr> 
                              <tr> 
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Cep</span>
                                       <input type="text" class="form-control" name='cep' value={EmpresaData.cep} placeholder="Somente Numeros" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr> 
                              <tr> 
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Cidade</span>
                                       <input type="text" class="form-control" name='cidade' value={EmpresaData.cidade} placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr> 
                              <tr> 
                                 <td>
                                    <div class="input-group">
                                       <span class="input-group-text">Estado</span>
                                       <input type="text" class="form-control" name='estado' value={EmpresaData.estado} placeholder="AA" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr>
                              <br/>
                              <tr>
                                 <td>
                                 <div class="input-group">
                                    <span class="input-group-text">Prefixo</span>
                                    <input type="number" class="form-control" name='prefixo' value={EmpresaData.prefixo} placeholder="99" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr> 
                              <tr> 
                                 <td>
                                    <div class="input-group">
                                    <span class="input-group-text">Telefone</span>
                                    <input type="number" class="form-control" name='telefone' value={EmpresaData.telefone} placeholder="999999999" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr> 
                              <tr> 
                                 <td>
                                    <div class="input-group">
                                    <span class="input-group-text">E-Mail</span>
                                    <input type="email" class="form-control" name='email' value={EmpresaData.email} placeholder="Email válido" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanageCnpj} />
                                    </div>
                                 </td>
                              </tr>
                              <br/>
                              <tr>
                                 <td>
                                    <button type="submit" class="btn btn-success">Salvar</button>
                                 </td>
                              </tr>
                           </table>
                        </form>
                     </>):(<></>)}
                  </div>

               </div>
               </div>  
                            

            </>)}
                
    </>)
}

