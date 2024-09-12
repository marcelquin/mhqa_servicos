

import {Routes, Route} from 'react-router-dom';

import Header from './Component/Header/Header'
import Home from './Page/Home/Home'
import NovaOrdem from './Page/OrdemServiço/NovaOrdem'
import Caixa from './Page/Caixa/Caixa'
import Cliente from './Page/Cliente/Cliente';
import Servico from './Page/Serviços/Servico';
import AdmHome from './Page/Adm/Home/AdmHome';

import ProprietarioAdm from './Page/Adm/Proproetario/Proprietarioadm.js';
import ClienteAdm from './Page/Adm/Cliente/ClienteAdm.js'
import ServicoAdm from './Page/Adm/Serviços/ServicoAdm.js';
import FinanceiroAdm from './Page/Adm/Relatorio/FinanceiroAdm.js';

import AdmClienteCad from './Page/Adm/Cliente/ClienteAdmCad';
import AdmServicoCad from './Page/Adm/Serviços/ServicoAdmCad.js';
import ProietarioAdmCad from './Page/Adm/Proproetario/ProprietarioAdmCad.js';
import DebitosAdmCad from './Page/Adm/Relatorio/DebitosAdmCad.js';

import AdmClienteGerencia from './Page/Adm/Cliente/ClienteAdmGerencia';
import AdmServicoGerencia from './Page/Adm/Serviços/ServicosAdmGerencia.js';
import OrdemServicoAdmGerencia from './Page/Adm/OrdemServiço/OrdemServicoAdmGerencia.js';
import ProietarioAdmGerencia from './Page/Adm/Proproetario/ProrpietarioAdmGerencia.js';
import RelatorioAdm from './Page/Adm/Relatorio/Relatorio.js';

import AdicionarServico from './Page/OrdemServiço/AdicionarServico.js';
import AdmServicoEditar from './Page/Adm/Serviços/ServicoAdmEditar.js';
import CLienteEditar from './Page/Adm/Cliente/ClienteEditar.js';
import ClienteEmpresaEditar from './Page/Adm/Cliente/ClienteEmpresaEditar.js'
import EmpresaEditar from './Page/Adm/Proproetario/EmpresaEditar.js'
import Pagamento from './Page/Adm/Relatorio/Pagamento.js';
function App() {
  return (
      <>
      <div className='ndBackground'>

        <div className='ndHeader'><Header></Header></div>

        <div className='ndbody'>

          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/NovaOs' element={<NovaOrdem/>} />
            <Route path='/Caixa' element={<Caixa/>} />      
            <Route path='/Cliente' element={<Cliente/>} />
            <Route path='/Servico' element={<Servico/>} />

            <Route path='/Adm' element={<AdmHome/>}/>
            <Route path='/AdmProprietario' element={<ProprietarioAdm/>}/>
            <Route path='/AdmCliente' element={<ClienteAdm/>}/>
            <Route path='/AdmServico' element={<ServicoAdm/>}/>
            <Route path='/AdmFinanceiro' element={<FinanceiroAdm/>}/>


            <Route path='/ClienteCadastrar' element={<AdmClienteCad/>}/>
            <Route path='/ServicoCadastrar' element={<AdmServicoCad/>}/>
            <Route path='/ProprietarioCadastrar' element={<ProietarioAdmCad/>}/>
            <Route path='/DebitoCadastrar' element={<DebitosAdmCad/>}/>

            <Route path='/AdmClienteGerencia' element={<AdmClienteGerencia/>}/>
            <Route path='/AdmServicoGerencia' element={<AdmServicoGerencia/>}/>
            <Route path='/AdmOrdemServicoGerencia' element={<OrdemServicoAdmGerencia/>}/>
            <Route path='/ProprietarioGerencia' element={<ProietarioAdmGerencia/>}/>
            <Route path='/RelatorioGerencia' element={<RelatorioAdm/>}/>

            <Route path='/adicionaritem/:id' element={<AdicionarServico/>} />
            <Route path='/servicoeditar/:id' element={<AdmServicoEditar/>} />
            <Route path='/clienteeditar/:id' element={<CLienteEditar/>} />
            <Route path='/clienteempresaeditar/:id' element={<ClienteEmpresaEditar/>} />
            <Route path='/empresaeditar/:id' element={<EmpresaEditar/>} />
            <Route path='/pagamento/:id' element={<Pagamento/>} />
          </Routes>        
        </div>
      </div>
         
      </>
  );
}

export default App;
