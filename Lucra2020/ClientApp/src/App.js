import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ListaClientes } from './components/Clientes/ListaClientes';
import { ExibeCliente } from './components/Clientes/ExibirCliente';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/clientes' component={ListaClientes} />
            <Route path='/clientes/edit/:contid' component={ExibeCliente} />

      </Layout>
    );
  }
}
