import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListaClientes } from './components/Clientes/ListaClientes';
import { ExibeCliente } from './components/Clientes/ExibirCliente';
import { ListaProdutos } from './components/Produtos/ListaProdutos';
import { ListaProdutosEstab } from './components/Produtos/ListaProdutosEstab';
import { ListaServicos } from './components/Servicos/ListaServicos';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
                  <Route path='/clientes' component={ListaClientes} />
            <Route path='/clientes/edit/:contid' component={ExibeCliente} />
            <Route path="/produtos" component={ListaProdutos} />
            <Route path="/produtosestab" component={ListaProdutosEstab} />
            <Route path="/servicos" component={ListaServicos} />
      </Layout>
    );
  }
}
