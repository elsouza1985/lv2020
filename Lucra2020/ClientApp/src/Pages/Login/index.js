

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../Services/api";
import logo from "../../Content/img/lucra-mais.png";
import { login } from "../../Services/auth";



class SignIn extends Component {
    state = {
        UserID: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { UserID, password } = this.state;
        if (!UserID || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("/login", { UserID, password });
                if (response.data.authenticated) {
                    login(response.data.token);
                    this.props.history.push("/home");
                } else {
                    this.setState({ error: response.data.message });
                }
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
    };

    render() {
        return (
        
                <div className="row">
                    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <div className="login-brand">
                        <img src={logo} alt="logo" width="140" />
                        </div>

                        <div className="card card-primary">
                            <div className="card-header"><h4>Login</h4></div>
                        
                            <div className="card-body">
                            <form onSubmit={this.handleSignIn} className="needs-validation" novalidate="">
                                    <div className="form-group">
                                        <label for="email">E-mail</label>
                                    <input id="email" type="email" className="form-control" name="email" onChange={e => this.setState({ UserID: e.target.value })} />
                                        <div className="invalid-feedback">
                                            Coloque um e-mail válido
                    </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="d-block">
                                            <label for="password" className="control-label">Senha</label>
                                            <div className="float-right">
                                                <a href="auth-forgot-password.html" className="text-small">
                                                    Esqueceu sua senha ?
                        </a>
                                            </div>
                                        </div>
                                    <input id="password" type="password" className="form-control" name="password" onChange={e => this.setState({ password: e.target.value })} />
                                        <div className="invalid-feedback">
                                            Coloque sua senha !
                    </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" name="remember" className="custom-control-input" tabindex="3" id="remember-me" />
                                            <label className="custom-control-label" for="remember-me">Lembrar-me</label>
                                        </div>
                                    </div>
                                {this.state.error && <p className="text-danger center">{this.state.error}</p>}
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-lg btn-block" tabindex="4">
                                            Acessar
                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mt-5 text-muted text-center">
                            Não possui uma conta? <a href="#">Crie aqui</a>
                        </div>
                        <div className="simple-footer">
                            Copyright © Valor9 2020
            </div>
                    </div>
                </div>
         
        );
    }
}
export default withRouter(SignIn);