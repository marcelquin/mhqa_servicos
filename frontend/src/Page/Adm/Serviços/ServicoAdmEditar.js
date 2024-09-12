import './ServicoAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function AdmServicoEditar()
{
  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const {id} = useParams()
    const[dataPost, setDataPost]=useState({
      nome: "",
      descricao: "",
      valor: "",
      maoDeObra: 0
    })

    useEffect(()=>{
      fetch(`${baseUrl}/servico/BuscarServicoPorId?id=${id}`,
          {
              method:'GET',
              headers:{
                  'content-type': 'application/json',
              },
          })
          .then((resp)=> resp.json())
          .then((data)=> {
              setDataPost(data)
          })
          .catch(err => console.log(err))
    }, [id])

    const handleChanage = (e) => {
      setDataPost(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleClick=async (e)=>{
      try{
        fetch(`${baseUrl}/servico/EditarServico`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams({
              'id': id,
              'nome':dataPost.nome,
              'descricao': dataPost.descricao,
              'valor': dataPost.valor,
              'maoDeObra':dataPost.maoDeObra
      })})
      .then(navigate("/adm"))     
      setDataPost({
        nome: "",
        descricao: "",
        valor: "",
        maoDeObra: 0
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
                <div className='conteudoGeral'>

                    <form onSubmit={handleClick}>
                      <fieldset>Dados de Serviço:<br/>
                        <table>
                          <tr>
                            <td>editar</td>
                          </tr>
                          <tr>
                            <td>Nome:<br/>
                            <input type='text' name='nome' placeholder='Digite o nome do serviço' value={dataPost.nome} onChange={handleChanage} />
                            </td>
                            <td>descriçao:<br/>
                            <input type='text' name='descricao' placeholder='Descreva do serviço' value={dataPost.descricao}  onChange={handleChanage} />
                            </td>
                          </tr>
                        </table>
                      </fieldset>
                      <fieldset>Valores:<br/>
                        <table>
                          <tr>
                            <td>valor:<br/>
                            <input type='number' name='valor' placeholder='Digite o valor do serviço' value={dataPost.valor}  onChange={handleChanage} />
                            </td>
                            <td>Mão de obra:<br/>
                            <input type='number' name='maoDeObra' value={dataPost.maoDeObra}  placeholder='Digite o valor da Mâo de obra do serviço' onChange={handleChanage} />
                            </td>
                          </tr>
                          <tr>
                            <td><input type="submit" value="Salvar" className="btn" />  </td>
                          </tr>
                        </table>
                      </fieldset>
                    </form>

                </div>
         </div>
                    
    
    </>)
}