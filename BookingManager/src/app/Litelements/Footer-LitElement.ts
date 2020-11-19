import {LitElement, html, customElement, property} from 'lit-element';


export class FooterElement extends LitElement{

    
    @property()FooterTitle = 'Post Booking Manager';

    constructor(){
        super();
    }
    render(){
        return html`
        <style>
        .my-footer{
            height: 50px;
            position: fixed;
            width: 100%;
            background-color:  #bfefff;
            bottom: 0;
            display: flex;
        }
        .my-footer .footer-title{
            margin: auto;
            font-size: 20px;
    
        }
        .footer-title b{
            font-size: 18px;
        }
        </style>
        <div class="my-footer">
            <span class="footer-title">${this.FooterTitle} <b>&#169;</b></span>
        </div>`; 
    }
}
customElements.define('footer-element',FooterElement)
