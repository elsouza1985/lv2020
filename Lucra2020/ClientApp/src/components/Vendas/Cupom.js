import React from 'react';


function Cupom() {
    return (
        <div className="col-md-3 col-xs-12">
            <div className="card card-hero">
                <div className="card-header">

                    <div className="card-description"><h5>Valor Total Produtos</h5></div>
                </div>
                <div className="card-body p-0">
                    <div className="tickets-list">
                    <span className="ticket-item">
                            <div className="ticket-title">
                                <h4>Nome do Cliente</h4>
                                <div className="form-group">
                                    <input type="text" className="form-control ui-autocomplete-input" placeholder="Ex: João Almeida" id="nomes" autocomplete="off" />
                                </div>
                                <h6 className="txt_nome_venda"><b className="color_venda_txt">Cliente:</b> Banco itau</h6>
                                <h6 className="txt_nome_venda"><b className="color_venda_txt">E-mail:</b>  Virtualex214@gmail.com</h6>
                                <h6 className="txt_nome_venda"><b className="color_venda_txt">Endereço:</b>  Rua Vicente Savi, 86 - São Paulo</h6>
                                <hr />

                                    <h6 className="text-dark">SubTotal: R$300</h6>

                                    <h3 className="text-primary">Total: R$300</h3>
                                    <ul>
                                        <li>Corte de Cabelo Feminino</li>
                                        <li>Corte de Cabelo Masculino</li>
                                    </ul>
                                    <h6>Forma de Pagamento:</h6>
                                    <div className="form-group">
                                        <select className="custom-select">
                                            <option selected="">Dinheiro</option>
                                            <option value="1">Cartão de Débito</option>
                                            <option value="2">Cartão de Crédito</option>
                                            <option value="3">Cheque</option>
                                        </select>
                                    </div>
                                    <h6>Valor Total:</h6>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="valor-total" value="R$300" />
                                    </div>
                                    <button className="btn btn-icon icon-left btn-dark text-center" style="height: 42px;">
                                        <i className="fa fa-credit-card"></i>
                                        Salvar Compra
                                            </button>
                                

                                        </div>
                             </span>
                    </div>
                </div>
            </div>
        </div>
                 
                    );
                }
export default Cupom;