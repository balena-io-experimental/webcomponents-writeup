# Web components and friends

## tldr
Web components are just that - web components. It’s a purposely low-level browser API. Their interop between frameworks is great. [They are already well integrated with all major frameworks](https://custom-elements-everywhere.com). That said, there are limitations: lack of native server-side rendering, complicated styling/theming and missing tooling and integrations.

General idea with WTC is that you can base your components on them, but you still need to supply some component framework, router, store etc. The ones we talked about like Svelte, Stencil etc. are no match to more mature frameworks (React, Vue, Angular…). I imagine, one of the larger and more mature frameworks will add ability for Shadow DOM and “compile to WCT”. It seems like React is preparing for this with [React Fire](https://github.com/facebook/react/issues/13525). Smaller libraries like Preact already have some support for it. [Vue.js also added support for it in CLI v3](https://vuejsdevelopers.com/2018/05/21/vue-js-web-component/) and their use of `<template>` makes it looks really close to WCT. Angular 6 also possesses [some ability for this](https://medium.com/@tomsu/building-web-components-with-angular-elements-746cd2a38d5b).

## Goals
- we want future-proof our UI component framework
- we want to make it easy to share our components
- we want long-term maintainability and great developer experience

## Issues with WCT
### Server-side rendering (missing Shadow DOM node)
tldr: There is no way, current or specced out, to SSR webcomponents. There are hacky solutions with possible overhead and problems. These hacks would most likely prevent incoporating WCT to other frameworks.

You can’t serialise WCT HTML state with Shadow DOM, as there is no element in HTML that would expose the Shadow DOM. Your server can’t send “this is how my WCT looks like”. The [“declarative Shadow DOM element”](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Declarative-Shadow-DOM.md) proposal was rejected [https://github.com/whatwg/dom/issues/510](https://github.com/whatwg/dom/issues/510) ([https://twitter.com/shadow\_hayato/status/971386233761841155](https://twitter.com/shadow_hayato/status/971386233761841155)) and it looks like it's not coming, possibly ever.

It limits the usage of our WCT to use cases where we don’t care about SEO/bot parsing - WCT support by bots is pretty much non-existent apart from Googlebot. This also brings performance implications, compared to what Rendition currently allows - SSR UI components and create critical CSS. Which brings me to second major issue:

### Styling and theming is still in draft phases
Shadow DOM means that you can’t easily style things inside the WCT. Things get ever more complex if you’d love to theme even deep WCT (embedded inside another Shadow DOM). There are some solutions on the horizon
[https://meowni.ca/posts/part-theme-explainer/](https://meowni.ca/posts/part-theme-explainer/)

Stencil.js don’t recommend using Shadow DOM because of issues with theming: [https://github.com/ionic-team/stencil/issues/116#issuecomment-325768174](https://github.com/ionic-team/stencil/issues/116#issuecomment-325768174)

People are still [experimenting](https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/) with how to DRY embedded styles, nothing really so far.

### Other minor grievances
- unavoidable name clashes (just like with CSS)
- strange bugs and behaviours everywhere I looked. Tooling needs to catch up

## WCT friendly and compatible frameworks/libraries
### Svelte
Svelte tries to be a full framework. I’m getting a lot of Angular vibes for some reason. It’s main drive tries to be a minimal runtime, webcomponents are more like a gimmick (couldn’t get Shadow DOM working in dev mode). Add a cumbersome templating language, simplistic state manager and incomplete tooling.

### Stencil
Ionic v4 will be based on StencilJS components so there is some push behind it. For a “compiler for a web components” it’s quite opinionated, even comes with optional router and whatnot, yet it’s silent when it comes to CSS, as nobody knows what’s the solution to that on large scale. It’s driven by Ionic use case (shared, highly extensible UI framework) so if you have a different use you might be dissapointed.

- Pretty solid for generic components
- the syntax and the way components are written takes some getting used to
- Not solving Styling/Theming in any way
- Shadow root is not enabled by default 🤔 (See comment about styling)
- Makes build more complicated - it’s a pre-v1 release so it’s complex from time to time and looking at some issues, it seems there are some breaking changes coming

### Others
- Skatejs [https://skatejs.netlify.com](https://skatejs.netlify.com) - is not framework independent
- Polymer’s litElement [https://github.com/Polymer/lit-element](https://github.com/Polymer/lit-element) - it’s a low-level Google project without much traction and mostly acts as a polyfill than a tool
- Slimjs [http://slimjs.com](http://slimjs.com/#/getting-started) - stringified templates, crazy boilerplate, looks dead
- React (build to WCT?) / Preact?
- Glimmer.js [https://glimmerjs.com/guides/using-glimmer-as-web-components](https://glimmerjs.com/guides/using-glimmer-as-web-components)

Spent quite some time dissecting WCT usage patterns. New libraries and approches kept popping up, but wanted to time scope this so haven’t tried them all.

## Rant on ideal solution
Looks like WCT will be very strong for a specific (not requiring theming) Style Guides. I think we could see something like [PatternLab](https://patternlab.io) build only on WCT. The Ideal Library™ should then use pure render functions (so I could choose templating language of my choice) and just compile down to web components that I could drop anywhere.

## Local examples
Put together a minimal video wrapper component.
`npm i` and `npm start` or `npm run dev`.

## Resources
- Info on integrating WCT with frameworks[https://custom-elements-everywhere.com](https://custom-elements-everywhere.com)
- [https://www.youtube.com/watch?v=yT-EsESAmgA ](https://www.youtube.com/watch?v=yT-EsESAmgA) SkateJS SSR
- More on skate’s SSR [https://github.com/skatejs/skatejs/tree/master/packages/ssr](https://github.com/skatejs/skatejs/tree/master/packages/ssr) ( [https://github.com/skatejs/skatejs/issues/1548](https://github.com/skatejs/skatejs/issues/1548) ???)
- [https://github.com/Polymer/polymer/issues/3955](https://github.com/Polymer/polymer/issues/3955) Polymer’s take on SSR (closed issue)
- [https://github.com/ionic-team/stencil-ssr-starter](https://github.com/ionic-team/stencil-ssr-starter) not updated and won’t start, but looking at code it’s working same as SkateJS
- [https://github.com/w3c/webcomponents/issues/468](https://github.com/w3c/webcomponents/issues/468) passing down styles is WIP
- [https://speakerdeck.com/robdodson/custom-elements-everywhere](https://speakerdeck.com/robdodson/custom-elements-everywhere) Nice overview
- mixpanel looks invested in WCT [https://github.com/mixpanel/panel](https://github.com/mixpanel/panel) - found it used [https://mixpanel.com/login](https://mixpanel.com/login) (GDPR banner)
- [https://github.com/w3c/webcomponents/issues/716](https://github.com/w3c/webcomponents/issues/716) shadow element registries for hierarchy
- [https://docs.google.com/document/d/1HP4f-vYZ29uUlHDqxHdftoAFBnhQZ-UFnks3m5bRfA4/edit](https://docs.google.com/document/d/1HP4f-vYZ29uUlHDqxHdftoAFBnhQZ-UFnks3m5bRfA4/edit)
- React fire [https://github.com/facebook/react/issues/13525](https://github.com/facebook/react/issues/13525)