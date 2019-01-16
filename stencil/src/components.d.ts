/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface MyFirstComponent {
    'name': string;
  }
  interface MyFirstComponentAttributes extends StencilHTMLAttributes {
    'name'?: string;
  }

  interface XVideo {
    'controls': boolean;
    'url': string;
  }
  interface XVideoAttributes extends StencilHTMLAttributes {
    'controls'?: boolean;
    'url'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'MyFirstComponent': Components.MyFirstComponent;
    'XVideo': Components.XVideo;
  }

  interface StencilIntrinsicElements {
    'my-first-component': Components.MyFirstComponentAttributes;
    'x-video': Components.XVideoAttributes;
  }


  interface HTMLMyFirstComponentElement extends Components.MyFirstComponent, HTMLStencilElement {}
  var HTMLMyFirstComponentElement: {
    prototype: HTMLMyFirstComponentElement;
    new (): HTMLMyFirstComponentElement;
  };

  interface HTMLXVideoElement extends Components.XVideo, HTMLStencilElement {}
  var HTMLXVideoElement: {
    prototype: HTMLXVideoElement;
    new (): HTMLXVideoElement;
  };

  interface HTMLElementTagNameMap {
    'my-first-component': HTMLMyFirstComponentElement
    'x-video': HTMLXVideoElement
  }

  interface ElementTagNameMap {
    'my-first-component': HTMLMyFirstComponentElement;
    'x-video': HTMLXVideoElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
