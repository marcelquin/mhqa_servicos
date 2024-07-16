import '../AdmGlobal.css'
import './AdmHome.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'

function AdmHome() {
    return(
        <>
            <div className="admBoxGeral">
                
                <div className="admBoxNav">
                    <NavAdm></NavAdm>
                </div>

                <div className="admSession"></div>
            </div>
        </>)
}

export default AdmHome