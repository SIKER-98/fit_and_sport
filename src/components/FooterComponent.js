import React, {Component} from "react";

class FooterComponent extends Component {
    redFontSize(event) {
        let html = document.querySelectorAll("*")
        html.forEach(item => item.classList.toggle('red-font-color'))
    }

    render() {
        return (
            <div className={'footer'}>
                © Made by Hubert Sikorsky & Rafał Wasilij - WAT
                <button className={'button-red action-button'} onClick={(event) => this.redFontSize(event)}>RED</button>
            </div>
        )
    }
}

export default FooterComponent;
