import React, { Component, useState } from 'react';


export class ListaProdutosEstab extends Component {
    static displayName = ListaProdutos.name;
   

    constructor(props) {
       
        super(props);
        this.state = { ListaProdutos: [], loading: true, loadingcliente: false, produtoData:  [] };


        this.loadProdutoList = this.loadProdutoList.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderListaProdutosTable = this.renderListaProdutosTable.bind(this);
        this.renderprodutoData = this.renderprodutoData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.ProdutoData = this.ProdutoData.bind(this);
        this.formatMoeda = this.formatMoeda.bind(this);
       
        
    }
    loadProdutoList() {
        fetch('api/vwProdutos/LoadProdList', {
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
            uidProduto: undefined ,
            NomeProduto: "",
            EANProduto: "",
            precoProdutoCompra: "",
            precoProdutoVenda: "",
            qtdEstoque:""
         }
        return produtoData;
    }
    handleSave(e) {
        e.preventDefault();
        let uidProduto = this.state.produtoData.uidProduto;
        const data = {
            IdProduto: this.state.produtoData.iudProduto,
            NomeProduto: document.getElementsByName('nomeProduto')[0].value,
            EANProduto: document.getElementsByName('eanProduto')[0].value,
            precoProdutoCompra: document.getElementsByName('precoProdutoCompra')[0].value,
            precoProdutoVenda: document.getElementsByName('precoProdutoVenda')[0].value,
            qtdEstoque: document.getElementsByName('qtdEstoque')[0].value
        }
        // PUT solicitação para editar 
        if (uidProduto) {
            fetch('api/vwProdutos/' + uidProduto, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data),
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    this.loadProdutoList();
                    document.getElementsByClassName('close')[0].click();
                   // this.setState({ produtoData: undefined });
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
            })
        }
        else // POST requisição para adicionar 
        {
            fetch('api/vwProdutos/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.loadProdutoList();
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
        this.loadProdutoList();
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
            <form  onSubmit={this.handleSave}  >
                <input type="hidden" name="idProduto" value={produtoData.idProduto} />
                <div className="form-group">
                    <label>*Nome:</label>
                    <select className="form-control" name="nomeProduto" required >
                        {produtoData.map(produto =>
                            <option key={produto.uidProduto} value={produto.eanProduto}> {produto.nomeProduto} </option>
                            )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Codigo do Produto</label>
                    <input type="number" className="form-control" name="eanProduto" onChange={e => this.changeValue('eanProduto', e.target.value)} value={produtoData.eanProduto} />
                </div>
               
                <div className="modal-footer bg-whitesmoke br">
                    <button type="submit" className="btn btn-primary" id="swal-2">Salvar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </form>
        )
    }
    formatMoeda(valor) {
        let changedot = valor.toString().replace('.', ',');

        changedot = 'R$' + changedot;
        if (changedot.indexOf(',') > -1) {
            let decimal = changedot.substring(changedot.indexOf(',')+1, changedot.length);
            if (decimal.length == 1) {
                changedot = changedot + '0';
            }
        } else {
            changedot = changedot + ',00';
        }
        return changedot;

    }
    renderListaProdutosEstabTable(ListaProdutos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Preço Compra</th>
                        <th>Preço Venda</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaProdutos.map(produto =>
                        <tr key={produto.uidProduto}>
                            <td>{produto.eanProduto}</td>
                            <td>{produto.nomeProduto}</td>
                            <td>{this.formatMoeda(produto.precoProdutoCompra)}</td>
                            <td>{this.formatMoeda(produto.precoProdutoVenda)}</td>
                            <td>{produto.qtdEstoque}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(produto.idProduto)} title="Atualizar produto" data-toggle="modal" data-target="#editarCliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(produto.idProduto)} data-original-title="Deletar Clientes" alt="Deletar Clientes">
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    renderListaProdutosTable(ListaProdutos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Codigo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaProdutos.map(produto =>
                        <tr key={produto.idProduto}>
                            <td>{produto.nomeProduto}</td>
                            <td>{produto.eanProduto}</td>
                            <td className="align-middle">
                                <a className="btn btn-icon btn-primary" onClick={(id) => this.handleEdit(produto.idProduto)} title="Atualizar Cliente" data-toggle="modal" data-target="#editarCliente">
                                    <i className="fas fa-pen"></i>
                                </a>
                                <a id="swal-6" className="btn btn-icon btn-danger" data-toggle="tooltip" onClick={(id) => this.handleDelete(produto.idProduto)} data-original-title="Deletar Clientes" alt="Deletar Clientes">
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
            : this.renderListaProdutosEstabTable(this.state.ListaProdutos);
        let clienteRender = this.state.loadingcliente ? <p><em>Carregando...</em></p>
            : this.renderprodutoData(this.state.produtoData);
        return (
            <div >
                <section className="section">
                    <div className="section-header">
                        <h1><i className="fa fa-clipboard-list"></i> Produtos</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item active"><a href="/dashboard">Dashboard</a></div>
                            <div className="breadcrumb-item"><a href="/produtos">Produtos</a></div>
                        </div>
                    </div>
                    <p>
                        <button data-toggle="modal" data-target="#editarCliente" onClick={() => { this.setState({ produtoData : this.ProdutoData() }) }} >+Produto</button>
                    </p>
                    <div className="section-body">
                        {contents}
                    </div>
                </section>
                <div>
                    <div className="modal fade" tabIndex="-1" role="dialog" name="editarCliente" id="editarCliente">
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

