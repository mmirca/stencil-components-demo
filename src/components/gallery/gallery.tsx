import { Component, Element, State } from '@stencil/core';

@Component({
  tag: 'app-gallery',
  styleUrl: 'gallery.css',
  shadow: true
})
export class MyComponent {

  @Element() element: HTMLElement;
  @State() images: string[] = [];
  viewer?: HTMLElement;

  componentWillLoad() {
    console.log('Will load');
    this.images = [];
    const imageNodes = this.element.querySelectorAll('img');
    imageNodes.forEach(img => {
      this.images.push(img.outerHTML);
    });
  }

  viewImage(imgHTML: string) {
    this.viewer.innerHTML = imgHTML;
    this.viewer.classList.add('viewer--visible');
  }

  render() {
    return <div>
        <div class="wrapper">
        <div class="container border py-4 px-3">
          <h2 class="text-secondary border-bottom pb-2 mb-3">Gallery</h2>
          <div id="cards" class="card-columns">
            {this.images.map(img => 
              <div onClick={ () => this.viewImage.apply(this, [img]) } class="card" innerHTML={ img }></div>  
            )}
          </div>
        </div>
      </div>
      <div ref={ (el => this.viewer = el).bind(this) } id="viewer" class="viewer"></div>
      </div>;
  }
}
