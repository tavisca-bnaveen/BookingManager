import {LitElement, html, customElement} from 'lit-element';

@customElement('footer-element')
export class FooterElement extends LitElement{
    
    render(){
        return html`<div>Hey from lit-element</div>`;
    }
}
