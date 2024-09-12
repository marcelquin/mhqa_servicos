import './FinanceiroAdm.css';
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function RelatorioAdm() {

    //const baseUrl = "http://34.135.105.123:8080"
    const baseUrl = "http://localhost:8080"
    const[seletorInterno, setseletorInterno] = useState('')
    const[seletor, setSeletor] = useState('')
    const [relatorioDiadio, setrelatorioDiadio] = useState([]);
    const [relatorioMensal, setrelatorioMensal] = useState([]);
    const [relatorioAnual, setrelatorioAnual] = useState([]);

    useEffect(()=>{
        fetch(`${baseUrl}/relatorios/BuscarRelatorioDiario`,
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setrelatorioDiadio(data)
            })
            .catch(err => console.log(err))
    }, [])
    
    useEffect(()=>{
        fetch(`${baseUrl}/relatorios/BuscarRelatorioMensal`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setrelatorioMensal(data)
            })
            .catch(err => console.log(err))
    }, [])
    
    useEffect(()=>{
        fetch(`${baseUrl}/relatorios/BuscarRelatorioAnual`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setrelatorioAnual(data)
            })
            .catch(err => console.log(err))
    }, [])


    return(<>

            <div className='blocoAdicional'>

                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={(e)=>{setseletorInterno("dia")}}/>
                <label class="form-check-label" for="flexRadioDefault1">
                    Diario
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>{setseletorInterno("mensal")}}/>
                <label class="form-check-label" for="flexRadioDefault2">
                    Mensal
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>{setseletorInterno("anual")}}/>
                <label class="form-check-label" for="flexRadioDefault2">
                    Anual
                </label>
                </div>
            </div>
            <div className='blocoRetornoInfo'>

            {seletorInterno.length === 3?(<>
                                {relatorioDiadio ?(<>
                                    {relatorioDiadio.map((data, i)=>{
                                        return(<>
                                        <div className='retornoInfoRelatorio'>
                                            <div className='retornoInfoResumo' key={i}>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao '></div><h5>Crédito: {data.totalVendasCredito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao'></div><h5>Dédito: {data.totalVendasDebito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeDinheiro'></div><h5>Dinheiro: {data.totalVendasDinheiro}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconePix'></div><h5>Pix: {data.totalVendasPix}</h5>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumoValor'>
                                                <div className='sessaoValor'>
                                                    <h3>Valor Total de Vendas: {data.totalVendas}</h3>
                                                </div>
                                                <div className='sessaoValor'>
                                                <h3>Valor Total de Débitos: {data.totalDebitos}</h3>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumotabela'>
                                                <div className='seletorrelatorio'>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={(e)=>{setSeletor("vendas")}}/>
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Serviços Executados
                                                    </label>
                                                    </div>
                                                    <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>{setSeletor("debitos")}}/>
                                                    <label class="form-check-label" for="flexRadioDefault2">
                                                        Debitos
                                                    </label>
                                                </div>
                                                {seletor.length ===6?(<>
                                                    <div className='blocoRetornoInfo'>
                                                        <table>
                                                            <tr>
                                                                <td>Cliente</td>
                                                                <td>CPF/CNPJ</td>
                                                                <td>Itens</td>
                                                                <td>Valor</td>
                                                                <td>Data Venda</td>
                                                                <td>Data Pagamento</td>
                                                                <td>Parcelas</td>
                                                                <td>Forma Pagamento</td>
                                                            </tr>
                                                            {data.vendasRealizadas.map((data1,i)=>{
                                                                return(<>
                                                                    <tr key={i}>
                                                                    <td>{data1.nomeCLiente}</td>
                                                                    <td>{data1.documento}</td>
                                                                    <td>{data1.itens }</td>
                                                                    <td>{data1.valor}</td>
                                                                    <td>{data1.dataVenda}</td>
                                                                    <td>{data1.dataPagamento}</td>
                                                                    <td>{data1.parcelas}</td>
                                                                    <td>{data1.formapagamento}</td>
                                                                </tr>
                                                                </>)})}
                                                            
                                                        </table>
                                                    </div> 
                                                
                                                </>):(<></>)}
                                                {seletor.length ===7?(<>
                                                
                                                    <div className='blocoRetornoInfo'>
                                                    <table>
                                                                    <tr>
                                                                        <td>Razão Social</td>
                                                                        <td>CNPJ</td>
                                                                        <td>Valor Total</td>
                                                                        <td>Valor Parcela</td>
                                                                        <td>Parcela Atual</td>
                                                                        <td>Data Vencimento</td>
                                                                        <td>Status Pagamento</td>
                                                                    </tr>
                                                                    {data.boletos.map((data2, i)=>{return(<>
                                                                        <tr>
                                                                            <td>{data2.empresa}</td>
                                                                            <td>{data2.cnpj}</td>
                                                                            <td>{data2.valorTotal}</td>
                                                                            <td>{data2.valorParcela}</td>
                                                                            <td>{data2.parcelaAtual}</td>
                                                                            <td>{data2.dataVencimento}</td>
                                                                            <td>{data2.statusPagamento}</td>
                                                                            <td><Link to={`/pagamento/${data2.id}`}>Informar Pagamento</Link></td>
                                                                        </tr>
                                                                    </>)})}
                                                                </table>
                                                    </div>
                                                </>):(<></>)}
                                                </div>
                                                     
                                            </div>
                                        </div>
                                        </>)
                                    })}
                    </>):(<>
                        <div className='retornoInfoRelatorio'>
                                <div className='retornoInfoResumo'>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao '></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeDinheiro'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconePix'></div><h5>Pix: R$ 0.00</h5>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumoValor'>
                                        <div className='sessaoValor'>
                                            <h3>Valor Total de Vendas: R$ 0.00</h3>
                                        </div>
                                        <div className='sessaoValor'>
                                        <h3>Valor Total de Débitos: R$ 0.00</h3>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumotabela'>
                                        <div className='seletorrelatorio'>
                                            <span><input  type='radio' value="vendas" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Vendas</span>
                                            <span><input  type='radio' value="debitos" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Debitos</span>
                                        </div>
                                        {seletorInterno.length === 6?(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Cliente</td>
                                                        <td>CPF/CNPJ</td>
                                                        <td>Itens</td>
                                                        <td>Valor</td>
                                                        <td>Data Venda</td>
                                                        <td>Data Pagamento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>):(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Razão Social</td>
                                                        <td>CNPJ</td>
                                                        <td>Valor</td>
                                                        <td>Parcelas</td>
                                                        <td>Data Emissão</td>
                                                        <td>Data Vencimento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>)}               
                                    </div>

                                </div>
                    </>)}                   
                                </>):(<></>)}
                                

            
                                {seletorInterno.length === 6?(<>
                                {relatorioMensal ?(<>
                                    {relatorioMensal.map((data, i)=>{
                                        return(<>
                                        <div className='retornoInfoRelatorio'>
                                            <div className='retornoInfoResumo' key={i}>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao '></div><h5>Crédito: {data.totalVendasCredito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao'></div><h5>Dédito: {data.totalVendasDebito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeDinheiro'></div><h5>Dinheiro: {data.totalVendasDinheiro}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconePix'></div><h5>Pix: {data.totalVendasPix}</h5>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumoValor'>
                                                <div className='sessaoValor'>
                                                    <h3>Valor Total de Vendas: {data.totalVendas}</h3>
                                                </div>
                                                <div className='sessaoValor'>
                                                <h3>Valor Total de Débitos: {data.totalDebitos}</h3>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumotabela'>
                                                <div className='seletorrelatorio'>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={(e)=>{setSeletor("vendas")}}/>
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Serviços Executados
                                                    </label>
                                                    </div>
                                                    <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>{setSeletor("debitos")}}/>
                                                    <label class="form-check-label" for="flexRadioDefault2">
                                                        Debitos
                                                    </label>
                                                </div>
                                                {seletor.length ===6?(<>
                                                    <div className='blocoRetornoInfo'>
                                                        <table>
                                                            <tr>
                                                                <td>Cliente</td>
                                                                <td>CPF/CNPJ</td>
                                                                <td>Itens</td>
                                                                <td>Valor</td>
                                                                <td>Data Venda</td>
                                                                <td>Data Pagamento</td>
                                                                <td>Parcelas</td>
                                                                <td>Forma Pagamento</td>
                                                            </tr>
                                                            {data.vendasRealizadas.map((data1,i)=>{
                                                                return(<>
                                                                    <tr key={i}>
                                                                    <td>{data1.nomeCLiente}</td>
                                                                    <td>{data1.documento}</td>
                                                                    <td>{data1.itens }</td>
                                                                    <td>{data1.valor}</td>
                                                                    <td>{data1.dataVenda}</td>
                                                                    <td>{data1.dataPagamento}</td>
                                                                    <td>{data1.parcelas}</td>
                                                                    <td>{data1.formapagamento}</td>
                                                                </tr>
                                                                </>)})}
                                                            
                                                        </table>
                                                    </div> 
                                                
                                                </>):(<></>)}
                                                {seletor.length ===7?(<>
                                                
                                                    <div className='blocoRetornoInfo'>
                                                    <table>
                                                                    <tr>
                                                                        <td>Razão Social</td>
                                                                        <td>CNPJ</td>
                                                                        <td>Valor Total</td>
                                                                        <td>Valor Parcela</td>
                                                                        <td>Parcela Atual</td>
                                                                        <td>Data Vencimento</td>
                                                                        <td>Status Pagamento</td>
                                                                    </tr>
                                                                    {data.boletos.map((data2, i)=>{return(<>
                                                                        <tr>
                                                                            <td>{data2.empresa}</td>
                                                                            <td>{data2.cnpj}</td>
                                                                            <td>{data2.valorTotal}</td>
                                                                            <td>{data2.valorParcela}</td>
                                                                            <td>{data2.parcelaAtual}</td>
                                                                            <td>{data2.dataVencimento}</td>
                                                                            <td>{data2.statusPagamento}</td>
                                                                            <td><Link to={`/pagamento/${data2.id}`}>Informar Pagamento</Link></td>
                                                                        </tr>
                                                                    </>)})}
                                                                </table>
                                                    </div>
                                                </>):(<></>)}
                                                </div>
                                                     
                                            </div>
                                        </div>
                                        </>)
                                    })}
                    </>):(<>
                        <div className='retornoInfoRelatorio'>
                                <div className='retornoInfoResumo'>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao '></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeDinheiro'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconePix'></div><h5>Pix: R$ 0.00</h5>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumoValor'>
                                        <div className='sessaoValor'>
                                            <h3>Valor Total de Vendas: R$ 0.00</h3>
                                        </div>
                                        <div className='sessaoValor'>
                                        <h3>Valor Total de Débitos: R$ 0.00</h3>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumotabela'>
                                        <div className='seletorrelatorio'>
                                            <span><input  type='radio' value="vendas" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Vendas</span>
                                            <span><input  type='radio' value="debitos" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Debitos</span>
                                        </div>
                                        {seletorInterno.length === 6?(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Cliente</td>
                                                        <td>CPF/CNPJ</td>
                                                        <td>Itens</td>
                                                        <td>Valor</td>
                                                        <td>Data Venda</td>
                                                        <td>Data Pagamento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>):(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Razão Social</td>
                                                        <td>CNPJ</td>
                                                        <td>Valor</td>
                                                        <td>Parcelas</td>
                                                        <td>Data Emissão</td>
                                                        <td>Data Vencimento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>)}               
                                    </div>

                                </div>
                    </>)}                   
                                </>):(<></>)}

                                {seletorInterno.length === 5?(<>
                                {relatorioAnual ?(<>
                                    {relatorioAnual.map((data, i)=>{
                                        return(<>
                                        <div className='retornoInfoRelatorio'>
                                            <div className='retornoInfoResumo' key={i}>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao '></div><h5>Crédito: {data.totalVendasCredito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao'></div><h5>Dédito: {data.totalVendasDebito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeDinheiro'></div><h5>Dinheiro: {data.totalVendasDinheiro}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconePix'></div><h5>Pix: {data.totalVendasPix}</h5>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumoValor'>
                                                <div className='sessaoValor'>
                                                    <h3>Valor Total de Vendas: {data.totalVendas}</h3>
                                                </div>
                                                <div className='sessaoValor'>
                                                <h3>Valor Total de Débitos: {data.totalDebitos}</h3>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumotabela'>
                                                <div className='seletorrelatorio'>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={(e)=>{setSeletor("vendas")}}/>
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Serviços Executados
                                                    </label>
                                                    </div>
                                                    <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={(e)=>{setSeletor("debitos")}}/>
                                                    <label class="form-check-label" for="flexRadioDefault2">
                                                        Debitos
                                                    </label>
                                                </div>
                                                {seletor.length ===6?(<>
                                                    <div className='blocoRetornoInfo'>
                                                        <table>
                                                            <tr>
                                                                <td>Cliente</td>
                                                                <td>CPF/CNPJ</td>
                                                                <td>Itens</td>
                                                                <td>Valor</td>
                                                                <td>Data Venda</td>
                                                                <td>Data Pagamento</td>
                                                                <td>Parcelas</td>
                                                                <td>Forma Pagamento</td>
                                                            </tr>
                                                            {data.vendasRealizadas.map((data1,i)=>{
                                                                return(<>
                                                                    <tr key={i}>
                                                                    <td>{data1.nomeCLiente}</td>
                                                                    <td>{data1.documento}</td>
                                                                    <td>{data1.itens }</td>
                                                                    <td>{data1.valor}</td>
                                                                    <td>{data1.dataVenda}</td>
                                                                    <td>{data1.dataPagamento}</td>
                                                                    <td>{data1.parcelas}</td>
                                                                    <td>{data1.formapagamento}</td>
                                                                </tr>
                                                                </>)})}
                                                            
                                                        </table>
                                                    </div> 
                                                
                                                </>):(<></>)}
                                                {seletor.length ===7?(<>
                                                
                                                    <div className='blocoRetornoInfo'>
                                                    <table>
                                                                    <tr>
                                                                        <td>Razão Social</td>
                                                                        <td>CNPJ</td>
                                                                        <td>Valor Total</td>
                                                                        <td>Valor Parcela</td>
                                                                        <td>Parcela Atual</td>
                                                                        <td>Data Vencimento</td>
                                                                        <td>Status Pagamento</td>
                                                                    </tr>
                                                                    {data.boletos.map((data2, i)=>{return(<>
                                                                        <tr>
                                                                            <td>{data2.empresa}</td>
                                                                            <td>{data2.cnpj}</td>
                                                                            <td>{data2.valorTotal}</td>
                                                                            <td>{data2.valorParcela}</td>
                                                                            <td>{data2.parcelaAtual}</td>
                                                                            <td>{data2.dataVencimento}</td>
                                                                            <td>{data2.statusPagamento}</td>
                                                                            <td><Link to={`/pagamento/${data2.id}`}>Informar Pagamento</Link></td>
                                                                        </tr>
                                                                    </>)})}
                                                                </table>
                                                    </div>
                                                </>):(<></>)}
                                                </div>
                                                     
                                            </div>
                                        </div>
                                        </>)
                                    })}
                    </>):(<>
                        <div className='retornoInfoRelatorio'>
                                <div className='retornoInfoResumo'>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao '></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeDinheiro'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconePix'></div><h5>Pix: R$ 0.00</h5>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumoValor'>
                                        <div className='sessaoValor'>
                                            <h3>Valor Total de Vendas: R$ 0.00</h3>
                                        </div>
                                        <div className='sessaoValor'>
                                        <h3>Valor Total de Débitos: R$ 0.00</h3>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumotabela'>
                                        <div className='seletorrelatorio'>
                                            <span><input  type='radio' value="vendas" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Vendas</span>
                                            <span><input  type='radio' value="debitos" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Debitos</span>
                                        </div>
                                        {seletorInterno.length === 6?(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Cliente</td>
                                                        <td>CPF/CNPJ</td>
                                                        <td>Itens</td>
                                                        <td>Valor</td>
                                                        <td>Data Venda</td>
                                                        <td>Data Pagamento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>):(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Razão Social</td>
                                                        <td>CNPJ</td>
                                                        <td>Valor</td>
                                                        <td>Parcelas</td>
                                                        <td>Data Emissão</td>
                                                        <td>Data Vencimento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>)}               
                                    </div>

                                </div>
                    </>)}                   
                                </>):(<></>)}

            </div>  
        </>)
}

export default RelatorioAdm
