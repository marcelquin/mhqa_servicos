import './ProprietarioAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProietarioAdmCad()
{
  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const [PostData, setPostData] = useState({
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
});

const handleChanage = (e) => {
  setPostData(prev=>({...prev,[e.target.name]:e.target.value}));
}


  const handleClick=async (e)=>{
    try{
      fetch(`${baseUrl}/empresa/NovaEmpresa`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'nome': PostData.nome,
            'razaoSocial': PostData.razaoSocial,
            'cnpj': PostData.cnpj,
            'areaAtuacao': PostData.areaAtuacao,
            'logradouro':PostData.logradouro,
            'numero':PostData.numero,
            'bairro':PostData.bairro,
            'referencia':PostData.referencia,
            'cep': PostData.cep,
            'cidade': PostData.cidade,
            'estado': PostData.estado,
            'prefixo':PostData.prefixo,
            'telefone':PostData.telefone,
            'email':PostData.email
    })})
    .then(navigate("/adm"))  
    setPostData({
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

        <div className='blocoRetornoInfo'>

        <form onSubmit={handleClick}>
               <table>
                  <tr>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Nome</span>
                           <input type="text" class="form-control" name='nome' placeholder="Nome da Empresa" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Razão Social</span>
                           <input type="text" class="form-control" name='razaoSocial' placeholder="Razão Social da Empresa" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">CNPJ</span>
                           <input type="text" class="form-control" name='cnpj' placeholder=" 99.999.999/9999-99" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td> 
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Área de Atuação</span>
                           <input type="text" class="form-control" name='areaAtuacao' placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
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

        </div>  
    </>)
}