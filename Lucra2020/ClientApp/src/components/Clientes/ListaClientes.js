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
    }
    handleEdit(id) {
        this.props.history.push("/clientes/edit/" + id);
    }
    static renderlistaclientesTable(listaclientes) {
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
                                <a href="#" className="btn btn-icon btn-dark" data-toggle="tooltip" title="" data-original-title="Enviar SMS" alt="Enviar SMS">
                                    <i className="fa fa-comments"></i>
                                </a>
                                <a href="#" className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(cliente.uidCliente)} title="Atualizar Clientes" data-original-title="Atualizar Clientes" alt="Atualizar Clientes" data-toggle="modal" data-target="#editarCliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a href="#" id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" title="" data-original-title="Deletar Clientes" alt="Deletar Clientes">
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
            : ListaClientes.renderlistaclientesTable(this.state.listaclientes);

        return (
            <section className="section">
            <div className="section-header">
                    <h1><i className="fa fa-user-friends"></i> Clientes</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item active"><a href="dashboard.php">Dashboard</a></div>
                        <div className="breadcrumb-item"><a href="clientes.php">Clientes</a></div>
                </div>
                </div>
                <div className="section-body">
                    {contents}
                </div>
                </section>
        );
    }
}
