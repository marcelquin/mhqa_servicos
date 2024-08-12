import './ServicoAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdmServicoCad()
{
  const baseUrl = "http://34.27.64.127:8080"
  //const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const[dataPost, setDataPost]=useState({
      nome: "",
      descricao: "",
      valor: "",
      maoDeObra: 0
    })


    const handleChanage = (e) => {
      setDataPost(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleClick=async (e)=>{
      try{
        fetch(`${baseUrl}/servico/NovoServico`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams({
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
                            <td>Nome:<br/>
                            <input type='text' name='nome' placeholder='Digite o nome do serviço' onChange={handleChanage} />
                            </td>
                            <td>descriçao:<br/>
                            <input type='text' name='descricao' placeholder='Descreva do serviço' onChange={handleChanage} />
                            </td>
                          </tr>
                        </table>
                      </fieldset>
                      <fieldset>Valores:<br/>
                        <table>
                          <tr>
                            <td>valor:<br/>
                            <input type='number' name='valor' placeholder='Digite o valor do serviço' onChange={handleChanage} />
                            </td>
                            <td>Mão de obra:<br/>
                            <input type='number' name='maoDeObra' placeholder='Digite o valor da Mâo de obra do serviço' onChange={handleChanage} />
                            </td>
                          </tr>
                          <tr>
                            <td><input type="submit" value="Salvar" className="btn"/>  </td>
                          </tr>
                        </table>
                      </fieldset>
                    </form>

                </div>
         </div>
                    
    
    </>)
}