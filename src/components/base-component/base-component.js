/**
 * WebComponents:
 * https://ayushgp.github.io/html-web-components-using-vanilla-js/
 *
 * CSS Modules:
 * https://github.com/css-modules/css-modules */

class BaseComponent extends HTMLElement {
    constructor () {
        super();
    }

    static componentName = null;

    static getComponentName () {
        if (null === BaseComponent.componentName) {
            throw new Error('call setComponentName in components extending BaseComponent');
        }

        return this.componentName;
    }

    static setComponentName (filename) {
        BaseComponent.componentName = /[^/]*$/
            .exec(filename)[0]
            .replace(/\.[^/.]+$/, '');
    }

    static bootstrap (className, fileName) {
        this.setComponentName(fileName);
        customElements.define(this.getComponentName() + '-component', className);
    }

    async loadComponentFile (extension) {
        const res = await fetch('/src/components/' + BaseComponent.getComponentName() + '/' + BaseComponent.getComponentName() + extension);
        return await res.text();

    }

    async loadHTML () {
        const textTemplate = await this.loadComponentFile('.html');
        const HTMLTemplate = new DOMParser().parseFromString(
            textTemplate, 'text/html'
        ).querySelector('template');

        return HTMLTemplate.content.cloneNode(true);
    };

    async loadCSS () {
        const cssTemplate = await this.loadComponentFile('.scss');
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssTemplate);

        return sheet;
    };

    async connectedCallback () {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.adoptedStyleSheets = [await this.loadCSS()];
        shadowRoot.appendChild(await this.loadHTML());
    }
}

export default BaseComponent;
