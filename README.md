# DNA Parallax / CSS Keyframes Scroll Animator
Pure CSS-animation defined parallax effect. No Javascript skills required, just HTML/CSS.

**There is not much to say. If you know how to use `@keyframes` CSS then you know how to use this.**

Define your CSS `@keyframes` animation and put its name into `parallax` attribute on the element to be animated. You can use multiple white-space separated animation names and they will get merged into one final animation. Possible mergin conflicts will be resolved that later animation's conflicting CSS styles will overwrite previous animation's styles.

If you add `role="parallax-container"` on any of element's parent then that element will be used to determine the animation progress.

Animation starts at
* **0%** container is just bellow the viewport
* **50%** container is in the very middle of the viewport
* **100%** container is just above the viewport

The best way is to look at `example.html` file. It is very simple and self-explanatory.

## Limitations
* **units** CSS animated properties must have same units. E.g. you cannot use `transition: rotate(360`**deg**`)` in one keyframe and `transition: rotate(9`**rad**`)` in next.
* **IE** is not supported (yet). But it should be easy to create standard CSS fallback styles and all animation-related CSS styles put into `0%` key of the `@keyframe` - they will overwrite CSS defaults if browser is supported...

## Feedback
Let me know what problems did you run in.
