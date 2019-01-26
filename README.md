# dna-parallax
Pure CSS-animation defined parallax effect. No Javascript skills required, just HTML/CSS.

There is not much to say, if you know how to use @keyframes CSS then you know how to use this.

Define your CSS @keyframes animation and put its name into "parallax" attribute of the element to be animated. If you add "parallax-container" class on any of element's parent then that element will be used to determine the animation progress.

Animation starts at 
* **0%** container's side aligns with viewport's bottom - container is just bellow the viewport 
* **50%** container is in the very middle of the viewport
* **100%** continer's bottom is aligned with viewport's top - ontainer is just above the viewport
