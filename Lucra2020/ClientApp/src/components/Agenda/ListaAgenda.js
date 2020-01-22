import React, { Component } from 'react';


export class ListaAgenda extends Component {
    static displayName = ListaAgenda.name;
   

    constructor(props) {
       
        super(props);
        this.state = { listaagenda: [], loading: true, loadingcliente: false, clienteData:  [] };


        this.loadAgendaList = this.loadAgendaList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderlistaagendaTable = this.renderlistaagendaTable.bind(this);
        this.renderAgendaData = this.renderAgendaData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.loadAgendaList();
    }
    loadAgendaList() {
        fetch('api/vwAgendaes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaagenda: data, loading: false });
            });
    }
    AgendaeData() {
        const clientData = {
            uidAgendae: undefined ,
            nomeAgendae: "",
            ddd: "",
            telefone: "",
            email: "",
            datadeNascimento: ""
        }
        return clientData;
    }
    handleSave(e) {
        e.preventDefault();
        let clientID = this.state.clienteData.uidAgendae;
        const data = {
            UidAgendae: this.state.clienteData.uidAgendae,
            NomeAgendae: document.getElementsByName('nomeAgendae')[0].value,
            Telefone: document.getElementsByName('telefone')[0].value,
            Email: document.getElementsByName('email')[0].value,
            DDD: document.getElementsByName('ddd')[0].value,
            DataDeNascimento: document.getElementsByName('dataDeNascimento')[0].value
        }
        // PUT solicitação para editar contato
        if (clientID) {
            fetch('api/vwAgendaes/' + clientID, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    this.loadAgendaList();
                    
                    
                    document.getElementsByClassName('close')[0].click();
                   // this.setState({ clienteData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
            })
        }
        else // POST requisição para adicionar contato
        {
            fetch('api/vwAgendaes/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.loadAgendaList();
                    this.setState({ clienteData: this.AgendaeData() })
                    document.getElementsByClassName('close')[0].click();
                })
        }
       
    }

    handleEdit(id) {

        fetch('http://localhost:49929/api/vwAgendaes/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ titulo: "Editar", carregando: false, clienteData: data });
                console.log(data);
            }).catch(error => { console.log(error) });
    }
    changeValue(prop, value) {
        this.setState(prevState => ({
            clienteData: {
                ...prevState.clienteData,
                ...prevState.clienteData[prop] = value
            }
        }))
        this.loadAgendaList();
    }
    handleDelete(id) {

        if (window.confirm('Esta ação irá apagar o registro, confirma?')) {
            fetch('http://localhost:49929/api/vwAgendaes/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.loadAgendaList();
                    }
                })
                .catch(error => { console.log(error) })
        }
      
    }
    renderAgendaeData(clienteData) {
        return (
            <form id="modalcliente" onSubmit={this.handleSave}  >
                <input type="hidden" name="uidAgendae" value={clienteData.uidAgendae} />
                <div className="form-group">
                    <label>*Nome:</label>
                    <input type="text" className="form-control" name="nomeAgendae" value={clienteData.nomeAgendae} onChange={e => this.changeValue('nomeAgendae', e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>*Telefone:</label>
                    <div className="row">
                        <div className="col-3">
                            <input type="text" className="form-control" name="ddd" onChange={e => this.changeValue('ddd', e.target.value)} value={clienteData.ddd} required />
                        </div>
                        <div className="col-9">
                            <input type="text" className="form-control" name="telefone" onChange={e => this.changeValue('telefone', e.target.value)} value={clienteData.telefone} required />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>E-mail:</label>
                    <input type="text" className="form-control" name="email" onChange={e => this.changeValue('email', e.target.value)} value={clienteData.email} />
                </div>
                <div className="form-group">
                    <label>Aniversário:</label>
                    <input type="text" className="form-control" name="dataDeNascimento" onChange={e => this.changeValue('dataDeNascimento', e.target.value)} value={clienteData.dataDeNascimento} />
                </div>
                <div className="modal-footer bg-whitesmoke br">
                    <button type="submit" className="btn btn-primary" id="swal-2">Salvar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </form>
        )
    }
    renderlistaagendaTable(listaagenda) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Aniversario</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaagenda.map(cliente =>
                        <tr key={cliente.uidAgendae}>
                            <td>{cliente.nomeAgendae}</td>
                            <td>{cliente.ddd} - {cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.datadeNascimento}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-dark" data-toggle="tooltip" title="" data-original-title="Enviar SMS" alt="Enviar SMS">
                                    <i className="fa fa-comments"></i>
                                </a>
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(cliente.uidAgendae)} title="Atualizar Agendae" data-toggle="modal" data-target="#editarAgendae">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(cliente.uidAgendae)} data-original-title="Deletar Agendaes" alt="Deletar Agendaes">
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
            : this.renderlistaagendaTable(this.state.listaagenda);
        let clienteRender = this.state.loadingcliente ? <p><em>Carregando...</em></p>
            : this.renderAgendaeData(this.state.clienteData);
        return (
            <div >
                <section className="section">
                    <div className="section-header">
                        <h1><i className="fa fa-user-friends"></i> Agendaes</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                            <div className="breadcrumb-item"><a href="/clientes">Agendaes</a></div>
                        </div>
                    </div>
                    <p>
                        <a to="#" data-toggle="modal" data-target="#editarAgendae" onClick={() => { this.setState({ clienteData : this.AgendaeData() }) }} >Adicionar cliente</a>
                    </p>
                    <div className="section-body">
                        {contents}
                    </div>
                </section>
                <div>
                    <div className="modal fade" tabIndex="-1" role="dialog" id="editarAgendae">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Novo Agendae</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {clienteRender}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

