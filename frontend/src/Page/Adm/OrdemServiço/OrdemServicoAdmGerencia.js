import './OrdemServicoAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import Axios from 'axios';


export default function OrdemServicoAdmGerencia()
{

  const baseUrl = "http://34.27.64.127:8080"
  //const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/vendas/ListarVendas`)
        .then((response) => { setAPIData(response.data)}) 
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    return(<>
        <div className="admBoxGeral">
                
                <div className="admBoxNav">
                    <NavAdm></NavAdm>
                </div>
                <div className='conteudoGeral'>
                  <div className='campoPesquisa'>
                        <label>Nome:<br/>
                        <input type="text" name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                        </label>
                  </div>
                  <div className='conteudo'>
                    <table>
                      <tr>
                        <td>Cliente</td>
                        <td>relato</td>
                        <td>Código</td>
                        <td>Data</td>
                        <td>Serviços</td>
                        <td>Valor</td>
                        <td>Status</td>
                        <td>Data Pagamento</td>
                      </tr>
                      {APIData.map((data, i)=>{
                        return(<>
                        <tr>                          
                          <td>{data.nomeCliente}</td>
                          <td>{data.relato}</td>
                          <td>{data.codigo}</td>
                          <td>{data.dataPedido}</td>
                          <td>
                          {data.produtos.map((data, i)=>{
                            return(<>
                                <span>{data.nome}, </span>
                            </>)
                          })}
                          </td>
                          <td>{data.valorTotalFront}</td>
                          <td>{data.status}</td>
                          <td>{data.dataPagamento}</td>
                          </tr>

                        </>)
                      })}
                    </table>
                  </div>
                </div>
         </div>
                    
    
    </>)
}

