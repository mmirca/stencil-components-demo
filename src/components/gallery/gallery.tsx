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
  viewerImg?: HTMLImageElement;

  componentWillLoad() {
    this.images = [];
    const imageNodes = this.element.querySelectorAll('img');
    console.log(Array.from(imageNodes));
    Array.from(imageNodes).forEach(img => {
      this.images.push(img.outerHTML);
    });
  }

  viewImage(imgHTML: string) {
    this.viewer.innerHTML = imgHTML;
    this.viewer.classList.add('viewer--visible');
    this.viewerImg = this.viewer.querySelector('img');
    this.viewerImg.classList.add('viewer__img');
  }

  hideViewer(e: MouseEvent) {
    const imgRect = this.viewerImg.getBoundingClientRect();
    const clickedOutsideImgX = e.clientX < imgRect.left || e.clientX > (imgRect.left + imgRect.width);
    const clickedOutsideImgY = e.clientY < imgRect.top || e.clientY > (imgRect.top + imgRect.height);
    if (clickedOutsideImgX || clickedOutsideImgY) {
      this.viewer.classList.remove('viewer--visible');
    } else {
      this.viewerImg.classList.toggle('viewer__img--enlarged');
    }
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
      <div ref={ (el => this.viewer = el).bind(this) } onClick={ this.hideViewer.bind(this) } id="viewer" class="viewer"></div>
      </div>;
  }
}
