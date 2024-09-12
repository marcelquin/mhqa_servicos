import './ServicoAdm.css'
import '../AdmGlobal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdmServicoCad()
{
  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
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
      .then(window.location.reload())     
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

        <div className='blocoRetornoInfo'>
        <form onSubmit={handleClick}>
          <table>
            <tr>
              <td>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Nome</span>
                  <input type="text" class="form-control" name='nome' placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="input-group">
                  <span class="input-group-text">Descrição</span>
                  <textarea class="form-control"  name='descricao' aria-label="With textarea" placeholder='Descrição do serviço' onChange={handleChanage} ></textarea>
                </div>
              </td>
            </tr>
            <br/>
            <tr>
              <td>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Valor</span>
                  <input type="number" name='valor' class="form-control" placeholder="Valor do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                </div>
              </td>
              <td>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Mão de obra</span>
                  <input type="number" name='maoDeObra' class="form-control" placeholder="Valor da Mão de obra do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
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


        
                    
    
    </>)
}