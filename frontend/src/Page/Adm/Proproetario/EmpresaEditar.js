import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useState,useEffect } from 'react';
import './ProprietarioAdm.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
function EmpresEditar() {
    //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const {id} = useParams()
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
useEffect(()=>{
  fetch(`${baseUrl}/empresa/BuscarEmpresaPorId?id=${id}`,
      {
          method:'GET',
          headers:{
              'content-type': 'application/json',
          },
      })
      .then((resp)=> resp.json())
      .then((data)=> {
          setPostData(data)
      })
      .then(console.log(PostData))
      .catch(err => console.log(err))
}, [id])
  const handleChanage = (e) => {
    setPostData(prev=>({...prev,[e.target.name]:e.target.value}));
  }


  const handleClick=async (e)=>{
    try{
      fetch(`${baseUrl}/empresa/EditarEmpresa`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'id': id,
            'nome': PostData.nome,
            'razaoSocial': PostData.razaoSocial,
            'cnpj': PostData.cnpj,
            'areaAtuacao': PostData.areaAtuacao,
            'dataInicioContrato': PostData.dataContrato,
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
        dataContrato: "",
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


    return(
        <>
        <div className='blocoNav'><NavAdm></NavAdm></div>
        <div className='blocoRetornoInfo'>

        <form onSubmit={handleClick}>
               <table>
                  <tr>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Nome</span>
                           <input type="text" class="form-control" name='nome' value={PostData.nome} placeholder="Nome da Empresa" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Razão Social</span>
                           <input type="text" class="form-control" name='razaoSocial' value={PostData.razaoSocial} placeholder="Razão Social da Empresa" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">CNPJ</span>
                           <input type="text" class="form-control" name='cnpj' value={PostData.cnpj} placeholder=" 99.999.999/9999-99" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td> 
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Área de Atuação</span>
                           <input type="text" class="form-control" name='areaAtuacao' value={PostData.areaAtuacao} placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                  </tr>
                  <br/>
                  <tr>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Logradouro</span>
                           <input type="text" class="form-control" name="logradouro" value={PostData.logradouro} placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Numero</span>
                           <input type="text" class="form-control" name="numero" value={PostData.logradouro} placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Bairro</span>
                           <input type="text" class="form-control"  name="bairro" value={PostData.bairro} placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                  </tr>
                  <br/>
                  <tr>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Referência</span>
                           <input type="text" class="form-control" name="referencia" value={PostData.referencia} placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Cep</span>
                           <input type="text" class="form-control" name="cep" value={PostData.cep} placeholder="00000000" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Cidade</span>
                           <input type="text" class="form-control" name="cidade" value={PostData.cidade} placeholder="" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                           <span class="input-group-text">Estado</span>
                           <input type="text" class="form-control" name="estado" value={PostData.estado} placeholder="Nome do serviço" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                  </tr>
                  <br/>
                  <tr>
                     <td>
                      <div class="input-group">
                        <span class="input-group-text">Prefixo</span>
                        <input type="number" class="form-control" name="prefixo" value={PostData.prefixo} placeholder="00" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                        <span class="input-group-text">Telefone</span>
                        <input type="number" class="form-control" name="telefone" value={PostData.telefone} placeholder="000000000" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                     </td>
                     <td>
                        <div class="input-group">
                        <span class="input-group-text">E-Mail</span>
                        <input type="email" class="form-control" name="email" value={PostData.email} placeholder="Email Válido" onChange={handleChanage} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
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
        </>
    )
}
export default EmpresEditar;