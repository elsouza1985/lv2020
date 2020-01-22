import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListaClientes } from './components/Clientes/ListaClientes';
import { ExibeCliente } from './components/Clientes/ExibirCliente';
import { ListaProdutos } from './components/Produtos/ListaProdutos';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
                  <Route path='/clientes' component={ListaClientes} />
            <Route path='/clientes/edit/:contid' component={ExibeCliente} />
            <Route path="/produtos" component={ListaProdutos} />
      </Layout>
    );
  }
}
