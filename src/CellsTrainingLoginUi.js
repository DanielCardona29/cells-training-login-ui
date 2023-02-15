import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './CellsTrainingLoginUi-styles.js';

import '@bbva-web-components/bbva-web-form-password/bbva-web-form-password';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text';
import '@bbva-web-components/bbva-button-default/bbva-button-default';

export class CellsTrainingLoginUi extends LitElement {
  static get is() {
    return 'cells-training-login-ui';
  }

  // Declare properties
  static get properties() {
    return {
      password: { type: String },
      user: { type: String },
      minPassValueRequired: { type: Number },
      minUserValueRequired: { type: Number },
      passWordMinRequieredErrorMessage: { type: String },
      userMinRequieredErrorMessage: { type: String },
      validPass: { type: Number },
      validUser: { type: Number }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.user = '';
    this.password = '';


    this.minPassValueRequired = 5;
    this.minUserValueRequired = 5;
    this.passWordMinRequieredErrorMessage = "La contraseña no cumple con lo minimo establecido"
    this.userMinRequieredErrorMessage = "El usuario no cumple con lo minimo establecido"

    this.validPass = false;
    this.validUser = false;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-training-login-ui-shared-styles')
    ];
  }

  //Controla las entradas de la contrasena
  onPasswordInput(event) {
    const { target } = event;
    const value = target.value;

    this.password = value;


  }

  validatePasswordBlur(event) {

    const { target: eventTarget } = event;

    if (this.password.length > this.minPassValueRequired - 1) {
      eventTarget.invalid = false;
      this.validPass = true;
      return;
    }

    eventTarget.invalid = true;
    this.validPass = false;
    return;
  }

  //Controla las entradas del nombre de usuario
  onUserInput(event) {
    const { target: eventTarget } = event;
    const value = eventTarget.value;
    this.user = value;
  }


  validateUserBlur(event) {
    const { target: eventTarget } = event;

    if (this.user.length > this.minUserValueRequired - 1) {
      eventTarget.invalid = false;
      this.validUser = true;
      return;
    }

    eventTarget.invalid = true
    this.validUser = false;
    return;
  }

  //Envia la data presionar en el boton de login 
  onSendData() {
    this._fireEvents('login-button-clicked', {
      user: this.user,
      password: this.password,
    });
  }

  //Propaga eventos
  _fireEvents(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true }))
  }

  updated() {
    const button = this.shadowRoot.getElementById('button-login');
    button.disabled = !(this.validPass && this.validUser)
  }

  // Define a template
  render() {
    return html`
      <slot></slot>
      
      <div class="login-wrapper">
        <h3>Iniciar session</h3>
      
        <bbva-web-form-text label="Usuario" placeholder="Usuario" error-message="${this.userMinRequieredErrorMessage}" class="input"
          @blur=${this.validateUserBlur} @input=${this.onUserInput}>
        </bbva-web-form-text>
      
        <bbva-web-form-password label="Contraseña" placeholder="Contraseña" value="" class="input"
          error-message="${this.passWordMinRequieredErrorMessage}" @input=${this.onPasswordInput}
          @blur=${this.validatePasswordBlur}></bbva-web-form-password>
      
        <bbva-button-default @click=${this.onSendData} disabled id="button-login" class="button"> Iniciar Sesion</bbva-button-default>
      </div>
    `;
  }
}
