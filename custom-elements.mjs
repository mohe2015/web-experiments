// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

export class Button extends HTMLElement {
    constructor() {
        super()

        var shadow = this.attachShadow({mode: 'open'})

        var button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.setAttribute('class', 'btn btn-primary')
        button.textContent = this.textContent;

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '/bootstrap.css');

        shadow.appendChild(button);
        shadow.appendChild(linkElem);
    }
}

customElements.define('my-button', Button)