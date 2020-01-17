import React, { Component } from 'react';

export class ListaClientes extends Component {
    static displayName = ListaClientes.name;

    constructor(props) {
        super(props);
        this.state = { listaclientes: [], loading: true };

        fetch('api/vwClientes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaclientes: data, loading: false });
            });
        this.handleEdit = this.handleEdit.bind(this);
        this.renderlistaclientesTable = this.renderlistaclientesTable.bind(this);
    }
    handleEdit(id) {
     
        this.props.history.push("/clientes/edit/" + id);
    }
    renderlistaclientesTable(listaclientes) {
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
                    {listaclientes.map(cliente =>
                        <tr key={cliente.uidCliente}>
                            <td>{cliente.nomeCliente}</td>
                            <td>{cliente.ddd} - {cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.datadeNascimento}</td>
                            <td className="align-middle">
                                <a  className="btn btn-icon btn-dark" data-toggle="tooltip" title="" data-original-title="Enviar SMS" alt="Enviar SMS">
                                    <i className="fa fa-comments"></i>
                                </a>
                                <a  className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(cliente.uidCliente)} title="Atualizar Cliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a  id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" title="" data-original-title="Deletar Clientes" alt="Deletar Clientes">
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
            : this.renderlistaclientesTable(this.state.listaclientes);

        return (
            <section className="section">
            <div className="section-header">
                    <h1><i className="fa fa-user-friends"></i> Clientes</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                        <div className="breadcrumb-item"><a href="/clientes">Clientes</a></div>
                </div>
                </div>
                <div className="section-body">
                    {contents}
                </div>
                </section>
        );
    }
}
export class ClienteData {
    uidCliente: 0;
    nomeCliente: "";
    ddd: 0;
    telefone: 0;
    email: "";
    datadeNascimento: "";
}
