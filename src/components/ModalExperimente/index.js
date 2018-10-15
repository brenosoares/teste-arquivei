import React, { Component } from 'react'
import { Icon } from 'react-icons-kit'
import {times} from 'react-icons-kit/fa/times'

//Style
import './style.sass'

export default class ModalExperimente extends Component {
    render() {
        return (
            <div className={this.props.open ? "modal open" : "modal"}>
                <div className="modal-cont">
                    <div className="modal-close" onClick={this.props.close}><Icon icon={times} /></div>
                    <div className="modal-top">Experimente grátis o Arquivei 🎉</div>
                    <div className="modal-text">
                        <p>Com <b>o Arquivei</b>, você terá acesso a <b>todas as</b> notas dos seus fornecedores, além de:</p>
                        <ul className="modal-list">
                            <li>• Consulta de seus <b>XMLs</b> direto da <b>Sefaz;</b></li>
                            <li>• <b>Alerta</b> de notas <b>canceladas;</b></li>
                            <li>• <b>Conhecimento</b> de notas <b>indevidas/frias;</b></li>
                        </ul>
                        <p><b>Tudo</b> isso <b>grátis</b> e sem compromisso.</p>
                        <a href="#" className="btn-blue" onClick={this.props.experimente}>Experimentar agora</a>
                        <div className="modal-footer">Ao continuar você aceita o <a href="#">Termo de uso do Arquivei.</a></div>
                    </div>
                </div>
            </div>
            )
    }
}
