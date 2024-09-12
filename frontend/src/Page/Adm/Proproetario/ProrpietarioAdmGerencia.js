import './ProprietarioAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';


export default function ProietarioAdmGerencia()
{
  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/empresa/ListarEmpresas`)
        .then((response) => { setAPIData(response.data)}) 
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);


    return(<>

      <div className='blocoRetornoInfo'>
          
        {APIData.map((data, i)=>{
                      return(<>
                        <div className='cartaoProprietario'>
                
                        <div className='info'>
                          <div className='nome'>
                              <h4>{data.nome}</h4>
                              {data.cnpj}
                          </div>
                          <div className='infoGeral'>
                            <div className='blocoInfo'> 
                                <div className='topico topicoTelefone'></div>
                                <div className='texto'><span>({data.contato.prefixo}) {data.contato.telefone}</span></div>
                            </div> 
                            <div className='blocoInfo'>
                                <div className='topico topicoLocalizacao'></div>
                                <div className='texto'><span>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span></div>
                            </div> 
                            <div className='blocoInfo'>
                                <div className='topico topicoEmail'></div>
                                <div className='texto'><span>{data.contato.email}</span></div>
                            </div> 
                                                 
                          </div>
                        </div>
                        <div className='destaque'>
                          <h2>{data.razaoSocial}</h2> 
                          <span>{data.areaAtuacao}</span>
                        </div>
                        <span className='btnEditar'><Link to={`/empresaeditar/${data.id}`}>Editar Informações</Link></span>
                        </div>
                      
                      </>)
                    })}
        </div>   
    </>)
}