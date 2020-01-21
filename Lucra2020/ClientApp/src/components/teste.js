import { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

export class Example extends Component {
    constructor(props) {
        super(props);

        this.showSettings = this.showSettings.bind(this);
        this.state = {
            collapsed: true
        };
    }
    showSettings(event) {
        event.preventDefault();
   
    }

    render() {
         return (
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
            </Menu>
        );
    }
}