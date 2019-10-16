/**
 * WebComponents:
 * https://ayushgp.github.io/html-web-components-using-vanilla-js/
 *
 * CSS Modules:
 * https://github.com/css-modules/css-modules */
/**  */

import BaseComponent from '../base-component/base-component';

class Candle extends BaseComponent {
    static bootstrap () {
        super.bootstrap(Candle, __filename);
    }
}

Candle.bootstrap();
