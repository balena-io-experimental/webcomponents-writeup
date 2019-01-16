import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'x-video',
  shadow: true,
  styleUrl: './video.css'
})

export class Video {
  // Indicate that name should be a public property on the component
  @Prop() url: string;
  @Prop() controls: boolean = true;

  render() {
    // Would rather see props passed to render
    const {
      url,
      controls
    } = this;
    const urls = [].concat(url);

    // Not exactly sure why, but these callbacks are executed in random order
    // Would expect them to follow order in HTML
    // console.log(url);

    if (!url) {
      return (
        <div class="error">No video URL specified</div>
      );
    }

    return (
      <figure>
        {/* https://github.com/ionic-team/stencil/issues/1317 */}
        <video
          // onCanPlay={() => console.log('Video ready')}
          // onEnded={() => console.log('Video ended')}
          controls={controls}>
          {urls.map((url) => {
            return (
              <source src={url} />
            )
          })}
          <p>Your browser doesn't support HTML5 video.</p>
        </video>
        {/* AFAIK can't detect whether slot is occupied - https://github.com/ionic-team/stencil/issues/399 */}
        <slot name="controls" />
      </figure>
    );
  }
}
