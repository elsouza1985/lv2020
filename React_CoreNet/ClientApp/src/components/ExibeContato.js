
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class ExibeContato extends React.Component {
    constructor() {
        super();
        const ContatoData = {
            contatoId: 0 ,
            nome: "",
            email: "",
            cidade: "",
            sexo: ""
        }    
        this.state = { contatoLista: [], carregando: true };
        fetch('api/Contato/GetContatos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json() )
            .then(data => {
                this.setState({ contatoLista: data, carregando: false });
            });
        // este binding é necessário para que o 'this' funcione no callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.renderContatoTable = this.renderContatoTable.bind(this);
    }
  render() {
        let contents = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderContatoTable(this.state.contatoLista);
        return <div>
            <h1>Contatos</h1>
            <p>Dados dos contatos obtidos do servidor.</p>
            <p>
                <Link to="/AddContato">Criar Novo</Link>
            </p>
            {contents}
        </div>;
    }
    // Trata a solicitação Delete  para um contato  
    handleDelete(id) {
        if (!window.confirm("Deseja deletar o contato com id : " + id))
            return;
        else {
            fetch('api/Contato/DeleteContatos/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        contatoLista: this.state.contatoLista.filter((rec) => {
                            return (rec.contatoId != id);
                        })
                    });
            });
        }
    }
     handleEdit(id) {
        this.props.history.push("/contato/edit/" + id);
    }
    // Retorna uma tabela HTML para o método render().  
     renderContatoTable(contatoLista) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>ContatoId</th>
                    <th>Nome</th>
                    <th>Sexo</th>
                    <th>Email</th>
                    <th>Cidade</th>
                </tr>
            </thead>
            <tbody>
                {contatoLista.map(emp =>
                    <tr key={emp.contatoId}>
                        <td></td>
                        <td>{emp.contatoId}</td>
                        <td>{emp.nome}</td>
                        <td>{emp.sexo}</td>
                        <td>{emp.email}</td>
                        <td>{emp.cidade}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.contatoId)}>Editar</a>  |
                                <a className="action" onClick={(id) => this.handleDelete(emp.contatoId)}>Deletar</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
      
}
export class ContatoData {
    contatoId: number = 0;
    nome: string = "";
    email: string = "";
    cidade: string = "";
    sexo: string = "";
}  
