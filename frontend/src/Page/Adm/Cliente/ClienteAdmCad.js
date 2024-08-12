import './ClienteAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdmClienteCad()
{
   const baseUrl = "http://34.135.105.123:8080"
  //const baseUrl = "http://localhost:8080"
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
       areaAtuacao: "",
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
                        
                        <form onSubmit={handleClickcpf}>
                           <fieldset>Dados pessoais:<br/>
                                 <table>
                                    <tr>
                                    <td><label> Nome:<br/> 
                                    <input type="text" name="nome" id="nome" onChange={handleChanage}/></label></td>
                                    <td><label>Sobreome:<br/>
                                    <input type="text" name="sobrenome"  onChange={handleChanage}/></label></td>
                                    <td><label>CPF:<br/>
                                    <input type="text" name="cpf" placeholder="Somente numeros"  onChange={handleChanage}/></label></td>
                                    </tr>
                                    <tr>
                                    <td><label>Data de Nascimento:<br/>
                                    <input type="text" name="dataNascimento" placeholder="dd/mm/aaaa"  onChange={handleChanage}/></label></td>
                                    </tr>
                                 </table>
                              </fieldset>
                              <fieldset>Endereço:<br/>  
                                 <table>
                                    <tr>
                                    <td><label>Logradouro: <br/>
                                    <input type="text" name="logradouro" placeholder="Digite o Nome da rua"  onChange={handleChanage}/></label></td>
                                    <td><label>Numero:<br/> 
                                    <input type="text" name="numero" placeholder="Digite o numero da casa"  onChange={handleChanage}/></label></td>
                                    <td><label>Bairro:<br/> 
                                    <input type="text" name="bairro" placeholder="Digite O Bairro"  onChange={handleChanage}/></label></td>
                                    </tr>
                                    <tr>
                                    <td><label>Referência:<br/>
                                    <input type="text" name="referencia" placeholder="Digite um Ponto de referência"  onChange={handleChanage}/></label></td>
                                    <td><label>CEP: <br/>
                                    <input type="number" name="cep" placeholder="Digite O Cep da cidade"  onChange={handleChanage}/></label></td>
                                    <td><label>Cidade: <br/>
                                    <input type="text" name="cidade" placeholder="Digite a cidade"  onChange={handleChanage}/></label></td>
                                    </tr>
                                    <tr>
                                    <td><label>Estado: <br/> 
                                    <input type="text" name="estado" placeholder="Digite a sigla do estado"  onChange={handleChanage}/></label></td>
                                    </tr>
                                 </table>
                              </fieldset>
                              <fieldset>Contato:<br/>
                                 <table>
                                    <tr>
                                    <td><label> Prefixo: <br/>
                                    <input type="number" name="prefixo" placeholder="99"  onChange={handleChanage}/></label></td>
                                    <td><label>Telefone: <br/>
                                    <input type="number" name="telefone" placeholder="999999999"  onChange={handleChanage}/></label></td>
                                    <td><label>E-Mail: <br/>
                                    <input type="email" name="email" placeholder="email@email.com"  onChange={handleChanage}/></label></td>
                                    </tr>
                                    <tr>
                                    <td><input type="submit" value="Salvar" className="btn"/>  </td>
                                    </tr>
                                 </table>
                              </fieldset> 
                           </form>
                    </div>
                     </>):(<>
                     <div className='conteudoGeral'>
                           <form onSubmit={handleClickcnpj}>
                              <fieldset>Dados da empresa:<br/>
                                 <table>
                                    <tr>
                                       <td><label>Nome: <br/>
                                       <input type="text" name="nome" id="" onChange={handleChanagecnpj}/></label></td>
                                       <td><label>Razão Social: <br/>
                                       <input type="text" name="razaoSocial"  onChange={handleChanagecnpj}/></label></td>                                    
                                       <td><label>CNPJ: <br/>
                                       <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa"  onChange={handleChanagecnpj}/></label></td>
                                    </tr>
                                 </table>

                              </fieldset>
                              <fieldset>Endereço:<br/>
                                 <table>
                                    <tr>
                                       <td><label>Logradouro: <br/>
                                       <input type="text" name="logradouro" placeholder="Digite o Nome da rua"  onChange={handleChanagecnpj}/></label></td>
                                       <td><label>Numero:<br/> 
                                       <input type="text" name="numero" placeholder="Digite o numero da casa"  onChange={handleChanagecnpj}/></label></td>
                                       <td><label>Bairro:<br/> 
                                       <input type="text" name="bairro" placeholder="Digite O Bairro"  onChange={handleChanagecnpj}/></label></td>
                                       </tr>
                                       <tr>
                                       <td><label>Referência:<br/>
                                       <input type="text" name="referencia" placeholder="Digite um Ponto de referência"  onChange={handleChanagecnpj}/></label></td>
                                       <td><label>CEP: <br/>
                                       <input type="number" name="cep" placeholder="Digite O Cep da cidade"  onChange={handleChanagecnpj}/></label></td>
                                       <td><label>Cidade: <br/>
                                       <input type="text" name="cidade" placeholder="Digite a cidade"  onChange={handleChanagecnpj}/></label></td>
                                       </tr>
                                       <tr>
                                       <td><label>Estado: <br/> 
                                       <input type="text" name="estado" placeholder="Digite a sigla do estado"  onChange={handleChanagecnpj}/></label></td>
                                    </tr>
                                 </table>
                              </fieldset>
                              <fieldset>Contato:<br/>
                                 <table>
                                    <tr>
                                       <td><label>Prefixo: <br/><input type="number" name="prefixo" placeholder="99" id="" onChange={handleChanagecnpj}/></label></td>
                                       <td><label>Telefone: <br/><input type="number" name="telefone" placeholder="999999999" id="" onChange={handleChanagecnpj}/></label></td>
                                       <td><label>E-mail: <br/><input type="email" name="email" placeholder="email@email.com" id="" onChange={handleChanagecnpj}/></label></td>
                                    </tr>
                                    <tr>
                                       <td><input type="submit" value="Salvar" className="btn"/>  </td>
                                    </tr>
                                 </table>
                              </fieldset>
                           </form>
                        
                    </div>
                     </>)} 
                     </div>            
            </div>
    
    </>)
}
