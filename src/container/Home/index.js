import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Icon } from 'react-icons-kit'
import {download} from 'react-icons-kit/fa/download'
import {eye} from 'react-icons-kit/fa/eye'

// Style
import './style.sass'

//Components
import TopBar from '../../components/TopBar';
import ModalExperimente from '../../components/ModalExperimente';
import ModalNuvem from '../../components/ModalNuvem';

export default class HomeContainer extends Component {

    constructor(){
        super();

        this.state = {
            currentCompany: null,
            dataNotas: null,
            listaNotas: null,
            authorized: false,
            modalExperiemente: false,
            modalNuvem: false
        }
    }

    componentDidMount(){

        axios.get('http://5b50cee2fe45ed0014cf08e6.mockapi.io/initialState')
            .then((response) => {
                const data = response.data

                data.map((item) => (
                    this.setState({
                        currentCompany: item.networkGrowth.currentCompany,
                        dataNotas: item.networkGrowth.data
                    })
                ))

                this.listNotas(this.state.dataNotas)
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }

    listNotas = (data) => {
        const arr= []
        data.map((item, index) => {

            let diaDoMes = moment(item.emissionDate, "YYYY-MM-DD").format("DD-MM-YYYY")

            let valorNota = this.formatarValor(item.value)

            let macaraCNPJ = item.emitter.CNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")

            return(arr.push(
                <div className="row" key={index}>
                    <div className="column status">
                    {
                        item.status === 'authorized' ?  this.setState({authorized: true}) :  this.setState({authorized: false})
                    }
                    <div className={ this.state.authorized ? "autorizado" : "desautorizado"}>{ this.state.authorized ? 'Autorizada' : 'Não Autorizada'}</div>
                    </div>
                    <div className="column numero">{item.number}</div>
                    <div className="column emissao">{diaDoMes}</div>
                    <div className="column fornecedor">{item.emitter.XNome}</div>
                    <div className="column valor">{valorNota}</div>
                    <div className="column cnpj">{macaraCNPJ}</div>
                    <div className="column acao">
                        <div className="btns">
                            <a className="btn" href="#"><div className="icon"><Icon icon={eye} /></div>Ver Nota</a>
                            <a className="btn" href="#"><div className="icon"><Icon icon={download} /></div>Baixar Xml</a>
                        </div>
                    </div>
                </div>)
            )
        })
        this.setState({listaNotas : arr})
    }

    formatarValor = (amount, decimalCount = 2, decimal = ",", thousands = ".")=> {

          decimalCount = Math.abs(decimalCount);
          decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

          let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
          let j = (i.length > 3) ? i.length % 3 : 0;

          return 'R$' + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");

      };

        openModalExperimente = () =>{
            this.setState({modalExperiemente: true})
        }
        closeModalExperimente = () =>{
            this.setState({modalExperiemente: false})
        }
        openModalNuvem = () =>{
            this.setState({modalNuvem: true})
        }
    render() {
        return (
            <div>
                <TopBar />
                <div className="topo-notas">
                    <p>Seu CNPJ / Razão Social:</p>
                    <p className="numero-cnpj">{ this.state.currentCompany ? `[${this.state.currentCompany.state}] [${this.state.currentCompany.cnpj}] ${this.state.currentCompany.name}` : null}</p>
                </div>
                <div className="lista-de-notas">
                    <div className="lista-de-notas-titulo">Existem novas notas contra seu CNPJ</div>
                    <div className="lista-de-notas-tabela">
                        <div className="row row-head">
                            <div className="column status">Status</div>
                            <div className="column numero">Número</div>
                            <div className="column emissao">Emissão</div>
                            <div className="column fornecedor">Fornecedor</div>
                            <div className="column valor">Valor</div>
                            <div className="column cnpj">CNPJ</div>
                            <div className="column acao">Ação</div>
                        </div>
                       {this.state.listaNotas}
                    </div>
                </div>
                <div className="caixa-dialogo">
                    <p>Você pode ter as notas de <b>todos os seus fornecedores</b>, que ter acesso a elas?</p>
                    <p><b>Experimente grátis o Arquivei</b> e tenha todas suas notas diretamente da Sefaz</p>
                    <div className="btn-experimentar" onClick={() => this.openModalExperimente()}>Experimentar o Arquivei</div>
                </div>
                <ModalExperimente open={this.state.modalExperiemente} close={() => this.closeModalExperimente()} experimente={() => this.openModalNuvem()}/>
                <ModalNuvem open={this.state.modalNuvem}/>
            </div>
        )
    }
}
