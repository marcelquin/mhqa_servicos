import './Servico.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../PageGlobal.css'
import '../../Style/Global.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';


function Servico() {

  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
  const[APIData, setAPIData]= useState([]);
  const[dadoPesquisa, setdadoPesquisa]= useState([]);
  const pesquisa = dadoPesquisa.length > 0 ?
  APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
      [];

  useEffect(() => {
    Axios
      .get(`${baseUrl}/servico/ListarServicos`)
      .then((response) => { setAPIData(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);


    return(<>

        <div className='blocoAdicional'>

          <div className='blocoAdicional'>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Nome</span>
              <input type="text" class="form-control" name='dadoPesquisa' onChange={(e)=>{setdadoPesquisa(e.target.value)}} placeholder="Nome Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
          </div>

        </div>

        <div className='blocoTabela'>

            <table class="table-light">
              <tr>
                <td class="table-light">Nome</td>
                <td class="table-light">Código</td>
                <td class="table-light">Valor</td>  
                <td class="table-light">Mão de Obra</td>
              </tr>
              {dadoPesquisa.length > 0?(<>
              
                {pesquisa.map((data,i)=>{return(<>
                  <tr>
                    <td>{data.nome}</td>
                    <td>{data.codigo}</td>
                    <td>{data.valorFront}</td>
                    <td>R${data.maoDeObra},00</td>
                  </tr>
                </>)})}
              </>):(<>
              
                {APIData.map((data,i)=>{return(<>
                  <tr>
                    <td>{data.nome}</td>
                    <td>{data.codigo}</td>
                    <td>{data.valorFront}</td>
                    <td>R${data.maoDeObra},00</td>
                  </tr>
                </>)})}
              </>)}
            </table>

        </div>    
    </>)}

    export default Servico;