import React, { Component, useState } from 'react';


export class ListaProdutos extends Component {
    static displayName = ListaProdutos.name;
   

    constructor(props) {
       
        super(props);
        this.state = { ListaProdutos: [], loading: true, loadingcliente: false, produtoData:  [] };


        this.loadClientList = this.loadClientList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderListaProdutosTable = this.renderListaProdutosTable.bind(this);
        this.renderprodutoData = this.renderprodutoData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.loadClientList();
    }
    loadClientList() {
        fetch('api/vwProdutos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ListaProdutos: data, loading: false });
            });
    }
    ProdutoData() {
        const produtoData = {
            idProduto: undefined ,
            NomeProduto: "",
            EANProduto: "",
         }
        return clientData;
    }
    handleSave(e) {
        e.preventDefault();
        let clientID = this.state.produtoData.idProduto;
        const data = {
            IdProduto: this.state.produtoData.IdProduto,
            NomeProduto: document.getElementsByName('nomeProduto')[0].value,
            EANProduto: document.getElementsByName('EANProduto')[0].value
        }
        // PUT solicitação para editar contato
        if (clientID) {
            fetch('api/vwProdutos/' + idProduto, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    this.loadClientList();
                    document.getElementsByClassName('close')[0].click();
                   // this.setState({ produtoData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
            })
        }
        else // POST requisição para adicionar contato
        {
            fetch('api/vwProdutos/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.loadClientList();
                    this.setState({ produtoData: this.produtoData() })
                    document.getElementsByClassName('close')[0].click();
                })
        }
       
    }

    handleEdit(id) {

        fetch('api/vwProdutos/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ titulo: "Editar", carregando: false, produtoData: data });
                console.log(data);
            }).catch(error => { console.log(error) });
    }
    changeValue(prop, value) {
        this.setState(prevState => ({
            produtoData: {
                ...prevState.produtoData,
                ...prevState.produtoData[prop] = value
            }
        }))
        this.loadClientList();
    }
    handleDelete(id) {

        if (window.confirm('Esta ação irá apagar o registro, confirma?')) {
            fetch('api/vwProdutos/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.loadClientList();
                    }
                })
                .catch(error => { console.log(error) })
        }
      
    }
    renderprodutoData(produtoData) {
        return (
            <form id="modalcliente" onSubmit={this.handleSave}  >
                <input type="hidden" name="uidCliente" value={produtoData.uidCliente} />
                <div className="form-group">
                    <label>*Nome:</label>
                    <input type="text" className="form-control" name="nomeCliente" value={produtoData.nomeCliente} onChange={e => this.changeValue('nomeCliente', e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>*Telefone:</label>
                    <div className="row">
                        <div className="col-3">
                            <input type="text" className="form-control" name="ddd" onChange={e => this.changeValue('ddd', e.target.value)} value={produtoData.ddd} required />
                        </div>
                        <div className="col-9">
                            <input type="text" className="form-control" name="telefone" onChange={e => this.changeValue('telefone', e.target.value)} value={produtoData.telefone} required />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>E-mail:</label>
                    <input type="text" className="form-control" name="email" onChange={e => this.changeValue('email', e.target.value)} value={produtoData.email} />
                </div>
                <div className="form-group">
                    <label>Aniversário:</label>
                    <input type="text" className="form-control" name="dataDeNascimento" onChange={e => this.changeValue('dataDeNascimento', e.target.value)} value={produtoData.dataDeNascimento} />
                </div>
                <div className="modal-footer bg-whitesmoke br">
                    <button type="submit" className="btn btn-primary" id="swal-2">Salvar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </form>
        )
    }
    renderListaProdutosTable(ListaProdutos) {
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
                    {ListaProdutos.map(cliente =>
                        <tr key={cliente.uidCliente}>
                            <td>{cliente.nomeCliente}</td>
                            <td>{cliente.ddd} - {cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.datadeNascimento}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-dark" data-toggle="tooltip" title="" data-original-title="Enviar SMS" alt="Enviar SMS">
                                    <i className="fa fa-comments"></i>
                                </a>
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(cliente.uidCliente)} title="Atualizar Cliente" data-toggle="modal" data-target="#editarCliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(cliente.uidCliente)} data-original-title="Deletar Clientes" alt="Deletar Clientes">
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
            : this.renderListaProdutosTable(this.state.ListaProdutos);
        let clienteRender = this.state.loadingcliente ? <p><em>Carregando...</em></p>
            : this.renderprodutoData(this.state.produtoData);
        return (
            <div >
                <section className="section">
                    <div className="section-header">
                        <h1><i className="fa fa-user-friends"></i> Clientes</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                            <div className="breadcrumb-item"><a href="/clientes">Clientes</a></div>
                        </div>
                    </div>
                    <p>
                        <a to="#" data-toggle="modal" data-target="#editarCliente" onClick={() => { this.setState({ produtoData : this.produtoData() }) }} >Adicionar cliente</a>
                    </p>
                    <div className="section-body">
                        {contents}
                    </div>
                </section>
                <div>
                    <div className="modal fade" tabIndex="-1" role="dialog" id="editarCliente">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Novo Cliente</h5>
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

