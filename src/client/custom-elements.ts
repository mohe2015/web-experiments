// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
// https://developers.google.com/web/fundamentals/web-components/best-practices

export class Button extends HTMLButtonElement {

   constructor() {
     super()

      this.setAttribute('type', 'button')

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

      this.setAttribute('class', `btn btn-${buttonStyle}`)
  }
}

export class Editor extends HTMLElement {

  constructor() {
    super()

    var shadow = this.attachShadow({mode: 'open'})

    let slot = document.createElement('slot')
    shadow.appendChild(slot)

    var templateElement = document.getElementById('editor-add-button-template') as HTMLTemplateElement
    let template = templateElement.content.cloneNode(true)
    shadow.appendChild(template)

    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', '/node_modules/bootstrap/dist/css/bootstrap.css')
    shadow.appendChild(linkElem)

    const linkElem1 = document.createElement('link')
    linkElem1.setAttribute('rel', 'stylesheet')
    linkElem1.setAttribute('href', '/fontawesome/css/all.css')
    shadow.appendChild(linkElem1)

    var dropdownElementList = [].slice.call(shadow.querySelectorAll('.dropdown-toggle'))
    console.log(dropdownElementList)
    dropdownElementList.map(function (dropdownToggleEl) {
      console.log(dropdownToggleEl)
      // @ts-ignore
      return new bootstrap.Dropdown(dropdownToggleEl)
    })
  }
}

export class EditorParagraph extends HTMLParagraphElement {
  constructor() {
    super()

    this.contentEditable = "true"

    console.log(this.closest('my-editor'))
  }
}

customElements.define('my-button', Button, { extends: 'button' })
customElements.define('my-editor', Editor)
customElements.define('my-p', EditorParagraph, { extends: 'p' })