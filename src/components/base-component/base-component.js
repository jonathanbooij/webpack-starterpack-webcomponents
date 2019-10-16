/**
 * WebComponents:
 * https://ayushgp.github.io/html-web-components-using-vanilla-js/
 *
 * CSS Modules:
 * https://github.com/css-modules/css-modules */

class BaseComponent extends HTMLElement {
    shadowRoot;

    constructor () {
        super();
    }

    static moduleName = null;

    static getModuleName () {
        if (null === BaseComponent.moduleName) {
            throw new Error('call setModuleName in components extending BaseComponent');
        }

        return this.moduleName;
    }

    static setModuleName (filename) {
        BaseComponent.moduleName = /[^/]*$/
            .exec(filename)[0]
            .replace(/\.[^/.]+$/, '');
    }

    static bootstrap (className, fileName) {
        this.setModuleName(fileName);
        customElements.define(this.getModuleName() + '-component', className);
    }

    async loadModuleFile (extension) {
        const res = await fetch('/src/components/' + BaseComponent.getModuleName() + '/' + BaseComponent.getModuleName() + extension);
        return await res.text();

    }

    async loadHTML () {
        const textTemplate = await this.loadModuleFile('.html');
        const HTMLTemplate = new DOMParser().parseFromString(
            textTemplate, 'text/html'
        ).querySelector('template');

        return HTMLTemplate.content.cloneNode(true);
    };

    async loadCSS () {
        const cssTemplate = await this.loadModuleFile('.scss');
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssTemplate);

        return sheet;
    };

    async connectedCallback () {
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [await this.loadCSS()];
        this.shadowRoot.appendChild(await this.loadHTML());
    }
}

export default BaseComponent;
