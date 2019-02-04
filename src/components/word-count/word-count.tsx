import { Component, State, Prop } from '@stencil/core';

@Component({
  tag: 'app-word-count',
  styleUrl: 'word-count.css',
  shadow: true
})
export class MyComponent {

  @Prop() placeholder: string = 'Este componente utiliza bootstrap sin afectar al resto de la página';
  @State() wordCount = 0;
  @State() charCount = 0;
  textarea?: HTMLTextAreaElement;

  componentDidLoad() {
    this.updateCount();
  }

  render() {
    return <div class="wrapper">
        <div class="container border py-4 px-3">
          <h2 class="text-secondary border-bottom pb-2 mb-3">Word Counter</h2>
          <p class="mb-2">Palabras contadas: <b class="text-primary">{ this.wordCount }</b></p>
          <p class="mb-4">Caracteres contados: <b class="text-primary">{ this.charCount }</b></p>
          <textarea onKeyUp={ this.updateCount.bind(this) } class="mb-3 p-2 form-control"
            ref={ (el => this.textarea = el).bind(this) }>{ this.placeholder }
          </textarea>
          <button onClick={ this.resetTextarea.bind(this) } class="btn btn-secondary btn-block">Reset</button>
        </div>
      </div>;
  }

  updateCount() {
    if (!this.textarea.value) {
      this.wordCount = 0;
      this.charCount = 0;
      return;
    }
    const split = this.textarea.value.trim().split(' ');
    this.wordCount = split.length;
    this.charCount = split.join('').length;
  }

  resetTextarea() {
    this.textarea.value = '';
    this.updateCount();
  }
  
}