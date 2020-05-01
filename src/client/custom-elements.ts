// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
// https://developers.google.com/web/fundamentals/web-components/best-practices

 export class Button extends HTMLElement {

   constructor() {
     super()

      var shadow = this.attachShadow({mode: 'open'})

      var button = document.createElement('button')
      button.setAttribute('type', 'button')

      var buttonStyle = 'primary' // default
      buttonStyle = this.hasAttribute('primary') ? 'primary' : buttonStyle;
      buttonStyle = this.hasAttribute('secondary') ? 'secondary' : buttonStyle;
      buttonStyle = this.hasAttribute('success') ? 'success' : buttonStyle;
      buttonStyle = this.hasAttribute('danger') ? 'danger' : buttonStyle;
      buttonStyle = this.hasAttribute('warning') ? 'warning' : buttonStyle;
      buttonStyle = this.hasAttribute('info') ? 'info' : buttonStyle;
      buttonStyle = this.hasAttribute('light') ? 'light' : buttonStyle;
      buttonStyle = this.hasAttribute('dark') ? 'dark' : buttonStyle;
      buttonStyle = this.hasAttribute('link') ? 'link' : buttonStyle;

      button.setAttribute('class', `btn btn-${buttonStyle}`)
      button.textContent = this.textContent;

      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', '/node_modules/bootstrap/dist/css/bootstrap.css');

      shadow.appendChild(button);
      shadow.appendChild(linkElem);
  }
}

export class Editor extends HTMLElement {

  constructor() {
    super()

     var shadow = this.attachShadow({mode: 'open'})

     let slot = document.createElement('slot')
     shadow.appendChild(slot)

     let addButton = new Button()
     addButton.textContent = "+"
     shadow.appendChild(addButton)
  }
}

export class EditorParagraph extends HTMLParagraphElement {
  constructor() {
    super()

    this.contentEditable = "true"

    console.log(this.closest('my-editor'))
  }
}

customElements.define('my-button', Button)
customElements.define('my-editor', Editor)
customElements.define('my-p', EditorParagraph, { extends: 'p' })