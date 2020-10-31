import {LitElement, html, customElement} from 'lit-element';


export class FooterElement extends LitElement{
    constructor(){
        super();
    }
    render(){
        return html`<div>Hey from lit-element</div>`; 
    }
}
customElements.define('footer-element',FooterElement)
