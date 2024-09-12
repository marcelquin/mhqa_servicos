import './ServicoAdm.css'
import '../AdmGlobal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function AdmServicoGerencia()
{


  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
  const[APIData, setAPIData]= useState([]);
  const navegate = useNavigate()
  const[dadoPesquisa, setdadoPesquisa] = useState('')
  const[seletorOpcao,setseletorOpcao] = useState('')
  const[id,setid] = useState('')
  const pesquisa = dadoPesquisa.length > 0 ?
  APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
  [];
  const[dataPost, setDataPost]=useState({
    nome: "",
    descricao: "",
    codigo: "",
    valor: "",
    maoDeObra: 0
  })

  useEffect(() => {
    Axios
      .get(`${baseUrl}/servico/ListarServicos`)
      .then((response) => { setAPIData(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

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

      <div className='admBlocoFlex'>

      <div className='admBlocoRetornoTabela'>

        <div className='blocoAdicional'>

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nome</span>
            <input type="text" class="form-control" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} placeholder="Nome Os Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

        </div>
        <div className='blocoRetornoInfo'>

          <table>
              <tr>
                <td>Nome</td>
                <td>Código</td>
                <td>Valor</td>
              </tr>
              {dadoPesquisa.length > 0 ?(<>
              
                {pesquisa.map((data, i)=>{return(<>
                
                  <tr key={i}>
                    <td>{data.nome}</td>
                    <td>{data.codigo}</td>
                    <td>{data.valorFront}</td>
                  </tr>
                  <tr>
                    <td>
                      <button onClick={(e)=>{setseletorOpcao("info"); setid(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                    </td>
                    <td>
                      <button onClick={(e)=>{setseletorOpcao("info"); setid(data.id)}} type="button" class="btn btn-outline-success">Editar</button>
                    </td>
                  </tr>
                  
                </>)})}
              </>):(<>
              
                {APIData.map((data, i)=>{return(<>
                
                  <tr key={i}>
                    <td>{data.nome}</td>
                    <td>{data.codigo}</td>
                    <td>{data.valorFront}</td>
                  </tr>
                  <tr>
                    <td>
                      <button onClick={(e)=>{setseletorOpcao("info"); setid(data.id)}} type="button" class="btn btn-outline-success">Mais Informações</button>
                    </td>
                    <td>
                      <button onClick={(e)=>{setseletorOpcao("editar"); setid(data.id)}} type="button" class="btn btn-outline-success">Editar</button>
                    </td>
                  </tr>

                </>)})}
              </>)}
          </table>

        </div>

          

      </div>
      <div className='admBlocoInfo'>
          
          <div className='conteudoVisor'>

                {seletorOpcao.length === 4?(<>
                  
                  <table>
                    <tr>
                      <td>
                        Nome: {dataPost.nome}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Descrição: {dataPost.descricao}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Código: {dataPost.codigo}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Valor: R${dataPost.valor}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Mão de obra: {dataPost.maoDeObra}
                      </td>
                    </tr>
                  </table>

                </>):(<>
                  <br/>
                <form onSubmit={handleClick}>
                  <table>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Nome</span>
                            <input type="text" class="form-control" name='nome' value={dataPost.nome} placeholder="Nome do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="input-group">
                          <span class="input-group-text">Descrição</span>
                          <textarea class="form-control" value={dataPost.descricao}  name='descricao' aria-label="With textarea" placeholder='Descrição do serviço' onChange={handleChanage} ></textarea>
                        </div>
                      </td>
                    </tr>
                    <br/>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1">Valor</span>
                          <input type="number" name='valor' value={dataPost.valor} class="form-control" placeholder="Valor do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1">Mão de obra</span>
                          <input type="number" name='maoDeObra' value={dataPost.maoDeObra} class="form-control" placeholder="Valor da Mão de obra do serviço" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChanage} />
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


                </>)}

          </div>

      </div>

      </div>

          
    </>)
}

