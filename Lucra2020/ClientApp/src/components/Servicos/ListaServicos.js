import React, { Component } from 'react';


export class ListaServicos extends Component {
    static displayName = ListaServicos.name;


    constructor(props) {

        super(props);
        this.state = { listaServicos: [], loading: true, loadingServico: false, ServicoData: new this.ServicoData(), produtoList: [], selectedProdutoList: [] };


        this.loadServicoList = this.loadServicoList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderlistaServicosTable = this.renderlistaServicosTable.bind(this);
        this.renderServicoData = this.renderServicoData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.loadServicoList();
    }
    loadServicoList() {
        fetch('api/vwServicoEstabelecimento/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaServicos: data, loading: false });
            });
    }
    ServicoData() {
        const ServicoData = {
            uidServicoEstabelecimento: undefined,
            nomeServico: "",
            qtdTempo: "",
            unidadeMedida: "",
            produtos: [],
            valorServico:""

        }
        return ServicoData;
    }
    addtableProduct() {
        let selectVal = document.getElementById('ddrProduto');
        let idproduto = selectVal.options[selectVal.selectedIndex].value
        fetch('api/vwProdutos/GetvwProdutoEstab/' + idproduto, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ produtoList: data });
            });
    }
    handleSave(e) {
        e.preventDefault();
        let ServicoID = this.state.ServicoData.uidServicoEstabelecimento;
        let produto = {
            uidServicoEstabelecimento: ""
            , UidProdutoEstabelecimento: ""
            , UnidadeMedida: ""
            , QtdProdutoServico: ""
            , ValorProdutoServico: ""
        }
        const produtoList = new Array();

        produtoList.push({
            UidProdutoEstabelecimento: 'F779ABBA-4616-48B5-8FE5-30084798ACEE'
            , UnidadeMedida: "mL"
            , QtdProdutoServico: "100"
            , ValorProdutoServico: "1.53"
        },  {
             UidProdutoEstabelecimento: 'A060D653-D8C8-4DFB-BD84-D02F8FDC1F67'
            , UnidadeMedida: "mL"
            , QtdProdutoServico: "150"
            , ValorProdutoServico: "3.35"
        },
        )
        
        
        const data = {
            UidServicoEstabelecimento: this.state.ServicoData.uidServicoEstabelecimento,
            NomeServico: document.getElementsByName('nomeServico')[0].value,
            QtdTempo: document.getElementsByName('qtdTempo')[0].value,
            UnidadeMedida: document.getElementsByName('UnidadeMedida')[0].options[document.getElementsByName('UnidadeMedida')[0].selectedIndex].value,
            TipoUnidadeMedida: 'Tempo',
            ValorServico: document.getElementsByName('valorServico')[0].value,
            Produtos: produtoList
        }
        // PUT solicitação para editar contato
        if (ServicoID) {
            fetch('api/vwServicoEstabelecimento' + ServicoID, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200|| response.status == 201) {
                    this.loadServicoList();
                    document.getElementsByClassName('close')[0].click();
                    // this.setState({ ServicoData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
            })
        }
        else // POST requisição para adicionar contato
        {
            fetch('api/vwServicoEstabelecimento', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200 || response.status == 201) {
                    this.loadServicoList();
                    document.getElementsByClassName('close')[0].click();
                    // this.setState({ ServicoData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao criar o cadastro\nErro:'+response.statusText);
                }
            });
        }

    }

    handleEdit(id) {

        fetch('api/vwServicoEstabelecimento/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ titulo: "Editar", carregando: false, ServicoData: data });
                console.log(data);
            }).catch(error => { console.log(error) });
        fetch('api/vwProdutos/LoadProdList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ produtoList: data });
            });
    }
    changeValue(prop, value) {
        this.setState(prevState => ({
            ServicoData: {
                ...prevState.ServicoData,
                ...prevState.ServicoData[prop] = value
            }
        }))
        this.loadServicoList();
    }
    handleDelete(id) {

        if (window.confirm('Esta ação irá apagar o registro, confirma?')) {
            fetch('api/vwServicoEstabelecimento/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.loadServicoList();
                    }
                })
                .catch(error => { console.log(error) })
        }

    }
    renderServicoData(ServicoData, produtoList) {
        return (
            <form id="modalServico" onSubmit={this.handleSave}  >
                <input type="hidden" name="uidServico" value={ServicoData.uidServico} />
                <div className="form-group">
                    <div className="row">
                        <label>*Serviço:</label>
                    </div>
                    <div className="row">
                        <input type="text" className="form-control" name="nomeServico" value={ServicoData.nomeServico} onChange={e => this.changeValue('nomeServico', e.target.value)} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>*Tempo Médio:</label>
                    <div className="row">
                        <div className=" col-sm-3">
                            <input type="number" className="form-control" name="qtdTempo" onChange={e => this.changeValue('qtdTempo', e.target.value)} value={ServicoData.qtdTempo} required />
                        </div>
                        <div className="col-sm-9">
                            <select className="form-control" name="UnidadeMedida" onChange={e => this.changeValue('UnidadeMedida', e.target.value)} value={ServicoData.unidadeMedida} required>
                                <option value="Minuto">Minuto</option>
                                <option value="Hora">Hora</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label>Produtos:</label>
                    </div>
                    <div className="row">
                        <div className="col-sm-11">
                    <select id="ddrProdutos" className="form-control">
                        <option value="0">Selecione...</option>
                        {produtoList.map(produto =>
                            <option value={produto.eanProduto}> {produto.nomeProduto} </option>
                        )}

                            </select>
                        </div>
                        <div className="col-sm-1 mr-3">
                            <button className="btn btn-success"><i class="fas fa-plus-circle"></i></button>
                        </div>
                    </div>
                 <div className="space-1">
                        <table id="tblProdutos" className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th>Produto</th>
                                <th>Qtd</th>
                                <th>Custo(R$)</th>
                                <th>Remover</th>
                            </tr>
                        </thead>
                        <tr scope="row">
                                <td className=" col-sm-6"><label className="form-control">Navalha</label></td>
                                <td className="col-sm-2"><input className="form-control" defaultValue="1" /></td>
                                <td className=" col-sm-3"><input className="form-control" defaultValue="2.50" /></td>
                                <td className="col-sm-1"><button className="btn btn-danger "><i className="fa fa-trash"></i></button></td>
                            </tr>
                            <tr scope="row">
                                <td ><label className="form-control">Shampoo</label></td>
                                <td className="col-sm-3"><input className="form-control" value="0.1" /></td>
                                <td className=" col-sm-3"><input className="form-control" value="0.50" /></td>
                                <td className="col-sm-1"><button className="btn btn-danger "><i className="fa fa-trash"></i></button></td>
                            </tr>
                        </table>
                   </div>
                </div>
                <div className="form-group">
                    <label>Valor:</label>
                    <input type="text" className="form-control" name="valorServico" onChange={e => this.changeValue('valorServico', e.target.value)} value={ServicoData.valorServico} />
                </div>
                <div className="modal-footer bg-whitesmoke br">
                    <button type="submit" className="btn btn-primary" id="swal-2">Salvar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </form>
        )
    }
    renderlistaServicosTable(listaServicos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Tempo</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaServicos.map(Servico =>
                        <tr key={Servico.uidServicoEstabelecimento}>
                            <td>{Servico.nomeServico}</td>
                            <td>{Servico.qtdTempo}/{Servico.unidadeMedida}(s)</td>
                            <td>{Servico.valorServico}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(Servico.uidServicoEstabelecimento)} title="Atualizar Servico" data-toggle="modal" data-target="#editarServico">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(Servico.uidServicoEstabelecimento)} data-original-title="Deletar Servicos" alt="Deletar Servicos">
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderlistaServicosTable(this.state.listaServicos);
        let ServicoRender = this.state.loadingServico ? <p><em>Carregando...</em></p>
            : this.renderServicoData(this.state.ServicoData, this.state.produtoList);
        return (
            <div >
                <section className="section">
                    <div className="section-header">
                        <h1><i className="fa fa-user-friends"></i> Servicos</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                            <div className="breadcrumb-item"><a href="/Servicos">Servicos</a></div>
                        </div>
                    </div>
                    <p>
                        <a to="#" data-toggle="modal" data-target="#editarServico" onClick={() => { this.setState({ ServicoData: this.ServicoData() }) }} >Adicionar Servico</a>
                    </p>
                    <div className="section-body">
                        {contents}
                    </div>
                </section>
                <div>
                    <div className="modal fade" tabIndex="-1" role="dialog" id="editarServico">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Novo Servico</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {ServicoRender}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

