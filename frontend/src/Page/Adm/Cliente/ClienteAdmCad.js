import './ClienteAdm.css'
import '../AdmGlobal.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdmClienteCad()
{
   //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const[filtroCadastro, setfiltroCadastro] = useState('')
    const navigate = useNavigate();
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
        email: "",
      });

      const [empresaData, setempresaData] = useState({
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
    
  const handleChanage = (e) => {
   setclienteData(prev=>({...prev,[e.target.name]:e.target.value}));
 }
 
 const handleChanagecnpj = (e) => {
   setempresaData(prev=>({...prev,[e.target.name]:e.target.value}));
 }

 const handleClickcpf=async (e)=>{
   try{
     fetch(`${baseUrl}/cliente/NovoCliente`, {
       method: 'POST',
       headers:{
         'Content-Type': 'application/x-www-form-urlencoded'
       },    
       body: new URLSearchParams({
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
   .then(navigate("/adm"))     
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

 const handleClickcnpj=async (e)=>{
   try{
     fetch(`${baseUrl}/clienteempresa/NovaClienteEmpresa`, {
       method: 'POST',
       headers:{
         'Content-Type': 'application/x-www-form-urlencoded'
       },    
       body: new URLSearchParams({
        'nome': empresaData.nome,
       'razaoSocial': empresaData.razaoSocial,
       'cnpj': empresaData.cnpj,
       'logradouro':empresaData.logradouro,
       'numero':empresaData.numero,
       'bairro':empresaData.bairro,
       'referencia':empresaData.referencia,
       'cep': empresaData.cep,
       'cidade': empresaData.cidade,
       'estado': empresaData.estado,
       'prefixo':empresaData.prefixo,
       'telefone':empresaData.telefone,
       'email':empresaData.email
   })})
   .then(navigate("/adm"))     
   setempresaData({
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

         <div className='blocoRetornoInfo'>
         
            {filtroCadastro.length === 3?(<>
            
               <form onSubmit={handleClickcpf}>
                  <table>
                     <tr>
                        <td>
                           <div class="input-group">
                                <span class="input-group-text">Nome</span>
                                <input type="text" class="form-control" name='nome' placeholder="Nome do Cliente" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                                </div>

                        </td>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Sobreome</span>
                              <input type="text" class="form-control" name='sobrenome' placeholder="Sobrenome do Cliente" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                     </tr>
                     <br/>
                     <tr>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">CPF</span>
                              <input type="text" class="form-control" name='cpf' placeholder="000.000.000-00" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Data de Nascimento</span>
                              <input type="date" class="form-control" name="dataNascimento" placeholder="Selecione uma data" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                     </tr>
                     <br/>
                     <tr>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Logradouro</span>
                              <input type="text" class="form-control" name="logradouro" placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Numero</span>
                              <input type="text" class="form-control" name="numero" placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Bairro</span>
                              <input type="text" class="form-control"  name="bairro" placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                     </tr>
                     <br/>
                     <tr>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Referência</span>
                              <input type="text" class="form-control" name="referencia" placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Cep</span>
                              <input type="text" class="form-control" name="cep" placeholder="00000000" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Cidade</span>
                              <input type="text" class="form-control" name="cidade" placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                              <span class="input-group-text">Estado</span>
                              <input type="text" class="form-control" name="estado" placeholder="Nome do serviço" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                     </tr>
                     <br/>
                     <tr>
                        <td>
                         <div class="input-group">
                           <span class="input-group-text">Prefixo</span>
                           <input type="number" class="form-control" name="prefixo" placeholder="00" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                           <span class="input-group-text">Telefone</span>
                           <input type="number" class="form-control" name="telefone" placeholder="000000000" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                           </div>
                        </td>
                        <td>
                           <div class="input-group">
                           <span class="input-group-text">E-Mail</span>
                           <input type="email" class="form-control" name="email" placeholder="Email Válido" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
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

            {filtroCadastro.length === 4?(<>
            
            <form onSubmit={handleChanagecnpj}>
               <table>
                  <tr>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Nome</span>
                           <input type="text" class="form-control" name='nome' placeholder="Nome da Empresa" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Razão Social</span>
                           <input type="text" class="form-control" name='razaoSocial' placeholder="Razão Social da Empresa" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">CNPJ</span>
                           <input type="text" class="form-control" name='cnpj' placeholder=" 99.999.999/9999-99" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                  </tr>
                  <br/>
                  <tr>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Logradouro</span>
                           <input type="text" class="form-control" name="logradouro" placeholder="" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Numero</span>
                           <input type="text" class="form-control" name="numero" placeholder="" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Bairro</span>
                           <input type="text" class="form-control"  name="bairro" placeholder="" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                  </tr>
                  <br/>
                  <tr>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Referência</span>
                           <input type="text" class="form-control" name="referencia" placeholder="" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Cep</span>
                           <input type="text" class="form-control" name="cep" placeholder="00000000" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Cidade</span>
                           <input type="text" class="form-control" name="cidade" placeholder="" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Estado</span>
                           <input type="text" class="form-control" name="estado" placeholder="Nome do serviço" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                  </tr>
                  <br/>
                  <tr>
                     <td>
                      <div class="input-group">
                        <span class="input-group-text">Prefixo</span>
                        <input type="number" class="form-control" name="prefixo" placeholder="00" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                        <span class="input-group-text">Telefone</span>
                        <input type="number" class="form-control" name="telefone" placeholder="000000000" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                        <span class="input-group-text">E-Mail</span>
                        <input type="email" class="form-control" name="email" placeholder="Email Válido" onChange={handleChanagecnpj} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
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
    
    </>)
}
