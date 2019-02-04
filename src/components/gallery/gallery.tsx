import { Component } from '@stencil/core';

@Component({
  tag: 'app-gallery',
  styleUrl: 'gallery.css',
  shadow: true
})
export class MyComponent {



  render() {
    return <div>
        <p>Sup</p>
        <slot></slot>
      </div>;
  }
}
