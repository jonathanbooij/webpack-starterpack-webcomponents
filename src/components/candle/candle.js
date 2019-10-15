/** https://ayushgp.github.io/html-web-components-using-vanilla-js/ */

(async () => {
    const res = await fetch('/src/components/candle/candle.html');
    const textTemplate = await res.text();
    const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
        .querySelector('template');

    class Candle extends HTMLElement {
        shadowRoot;

        constructor() {
            super();
        }

        connectedCallback() {
            this.shadowRoot = this.attachShadow({mode: 'open'});
            const instance = HTMLTemplate.content.cloneNode(true);
            this.shadowRoot.appendChild(instance);
        }
    }

    customElements.define('c-candle', Candle);
})();
