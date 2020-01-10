
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ContatoData } from './ExibeContato';

export class AddContato extends React.Component
{
    constructor(props) {
        super(props);
        //atualiza o state do componente
        this.state = { titulo: "", carregando: true, listaCidades: [], contData: new ContatoData };
        // obtem as cidades
        fetch('api/Contato/Details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaCidades: data });
            });
        //id do contato
        let contid = this.props.match.params["contid"];
        // define o state para a edição de um contato
        if (contid > 0) {
            fetch('api/Contato/GetContatos/' + contid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ titulo: "Editar", carregando: false, contData: data });
                });
        }
        else // define o state para adição de contato
        {
            this.state = { titulo: "Criar", carregando: false, listaCidades: [], contData: new ContatoData };
        }
        // este binding é necessário para fazer o 'this' funcionar no callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        //this.props = this.props.bind(this);
        
    }
    render() {
        let conteudo = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm(this.state.listaCidades);
        return <div>
            <h1>{this.state.titulo}</h1>
            <h3>Contato</h3>
            <hr />
            {conteudo}
        </div>;
    }
    // trata o evento submit do formulario
     handleSave(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        // PUT solicitação para editar contato
        if (this.state.contData.contatoId) {
            fetch('api/Contato/PutContatos/' + this.state.contData.contatoId, {
                method: 'PUT',
                body: data,
            }).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    this.props.history.push("/exibecontato");
                } else {
                    window.alert('Ocorreu um erro ao atualizar cadastro!');
                }
                })
        }
        else // POST requisição para adicionar contato
        {
            fetch('api/Contato/PostContatos', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/exibecontato");
                })
        }
    }
    // trata o evento do botão cancela
     handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/exibecontato");
    }
    // Retorna o formulario HTMl para o método Render
     renderCreateForm(listaCidades) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="contatoId" value={this.state.contData.contatoId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Nome">Nome</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="nome"
                            defaultValue={this.state.contData.nome} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Sexo">Sexo</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="sexo"
                            defaultValue={this.state.contData.sexo} required>
                            <option value="">-- Selecione o Sexo  --</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Email" >Email</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Email"
                            defaultValue={this.state.contData.email} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Cidade">Cidade</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Cidade"
                            defaultValue={this.state.contData.cidade} required>
                            <option value="">-- Selecione a cidade --</option>
                            {listaCidades.map(cidade =>
                                <option key={cidade.cidadeId} value={cidade.cidadeNome}>{cidade.cidadeNome}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Salvar</button>
                    <button className="btn" onClick={this.handleCancel}>Cancelar</button>
                </div >
            </form >
        );
    }
}  