import React, { Component } from 'react'
import { Icon } from 'react-icons-kit'
import {times} from 'react-icons-kit/fa/times'

//Style
import './style.sass'

// Images e Assets
import factory from '../../assets/factory.gif'

export default class ModalNuvem extends Component {

    componentDidMount(){
        if(this.props.open){
            setTimeout(() =>{
                window.location = "http://app.arquivei.com.br?token=some-unreadable-hash-token"
            }, 3000)
        }
    }

    render() {
        return (
            <div className={this.props.open ? "modal open" : "modal"}>
                <div className="modal-cont nuvem">
                    <img src={factory} />
                    <p className="nuvem">Descarregando para a nuvem</p>
                    <div className="load-bar">
                        <div className="track"></div>
                        <div className="anima"></div>
                    </div>
                </div>

            </div>
            )
    }
}
