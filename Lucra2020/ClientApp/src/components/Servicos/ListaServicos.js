import React, { Component } from 'react';


export class ListaServicos extends Component {
    static displayName = ListaServicos.name;
   

    constructor(props) {
       
        super(props);
        this.state = { listaServicos: [], loading: true, loadingServico: false, ServicoData:  [] };


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
            uidServico: undefined ,
            nomeServico: "",
            ddd: "",
            telefone: "",
            email: "",
            datadeNascimento: ""
        }
        return ServicoData;
    }
    handleSave(e) {
        e.preventDefault();
        let ServicoID = this.state.ServicoData.uidServico;
        const data = {
            UidServico: this.state.ServicoData.uidServico,
            NomeServico: document.getElementsByName('nomeServico')[0].value,
            Telefone: document.getElementsByName('telefone')[0].value,
            Email: document.getElementsByName('email')[0].value,
            DDD: document.getElementsByName('ddd')[0].value,
            DataDeNascimento: document.getElementsByName('dataDeNascimento')[0].value
        }
        // PUT solicitação para editar contato
        if (ServicoID) {
            fetch('api/vwServicos/' + ServicoID, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
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
            fetch('api/vwServicos/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.loadServicoList();
                    this.setState({ ServicoData: this.ServicoData() })
                    document.getElementsByClassName('close')[0].click();
                })
        }
       
    }

    handleEdit(id) {

        fetch('http://localhost:49929/api/vwServicos/' + id, {
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
            fetch('http://localhost:49929/api/vwServicos/' + id, {
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
    renderServicoData(ServicoData) {
        return (
            <form id="modalServico" onSubmit={this.handleSave}  >
                <input type="hidden" name="uidServico" value={ServicoData.uidServico} />
                <div className="form-group">
                    <label>*Serviço:</label>
                    <input type="text" className="form-control" name="nomeServico" value={ServicoData.nomeServico} onChange={e => this.changeValue('nomeServico', e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>*Tempo Médio:</label>
                    <div className="row">
                        <div className="form-group col-3">
                            <input type="text" className="form-control" name="qtdTempo" onChange={e => this.changeValue('ddd', e.target.value)} value={ServicoData.qtdTempo} required />
                        </div>
                        <div className="form-group col-9">
                            <input type="text" className="form-control" name="unidadeMedida" onChange={e => this.changeValue('unidadeMedida', e.target.value)} value={ServicoData.unidadeMedida} required />
                        </div>
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Produtos:</label>
                    <table id="tblProdutos" className="Table">
                        <th>Produto</th>
                        <th>Qtd</th>
                        <th>Custo</th>
                    </table>
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
                                <a className="btn btn-icon btn-dark" data-toggle="tooltip" title="" data-original-title="Enviar SMS" alt="Enviar SMS">
                                    <i className="fa fa-comments"></i>
                                </a>
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
            : this.renderServicoData(this.state.ServicoData);
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
                        <a to="#" data-toggle="modal" data-target="#editarServico" onClick={() => { this.setState({ ServicoData : this.ServicoData() }) }} >Adicionar Servico</a>
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

