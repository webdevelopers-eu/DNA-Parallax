/**
 * CSS limitations
 * Keyframes must be
 *   - ordered from lowest to heighest
 *   - must be in %
 *   - value units of subsequent keyframes must have the same units (not mixing px and %)
 *   - animation props supports only single-number expressions, e.g. "10px" or "scale(10%)" but not "translate(10px, 30px)"
 *
 * Usage:
 *
 * Define CSS keyframes anywhere in your CSS, e.g.
 *
 *   @keyframes myParallaxAnim {
 *	0% {
 *	    height: 100px;
 *	    width: 100%;
 *	}
 *
 *	50% {
 *	   height: 500px;
 *	   width: 10%;
 *	}
 *
 *	100% {
 *	   height: 300px;
 *	}
 *   }
 *
 * Then create a master container that will decide when to start
 * animation of nested objects. When container enters page view on the
 * bottom animation is at 0%, when it leaves the view on top animation
 * is at 100%. You can use negative or even >100% values to start
 * animation before container enters the view or continue animation
 * after it leaves the view...
 *
 * Example:
 *
 * <div parallax="container" style="height: 50vh;">
 *    <div parallax-anim="myParallaxAnim">Animated Object using 'myParallaxAnim' animation.</div>
 * </div>
 *
 * @module     CSS Parallax
 * @author     Daniel Sevcik <sevcik@webdevelopers.cz>
 * @copyright  2018 Daniel Sevcik
 * @since      2019-01-25 20:41:57 UTC
 * @access     public
 */
(function() {

    $(window).on("scroll", runOnScroll);

    function runOnScroll() {
	$('[parallax]').each(function() {updateContainer($(this));});
    };


    // Animagte all [prallax-anim] elements inside this container
    function updateContainer($container) {
	var top=$container.offset().top;
	var height=$container.height();
	var winHeight=$(window).height();
	var winTop=$(window).scrollTop();
	var topMin=top - winHeight;
	var topMax=top + height;
	var frame=Math.round((winTop - topMin) / (topMax - topMin) * 100);

	$container.attr('parallax-frame', frame + '%');
	$('[parallax-anim]', $container).each(function() {setAnim($(this), frame);});
	// console.log("CSS-PARALLAX progress " + frame + "%", $container.get());
    }

    // Calculate posisiotn of animation specified in @parallax-anim attribute and set it to ${frame}%
    function setAnim($el, frame) {
	var name=$el.attr('parallax-anim');
	var props=getAnimFrame(name, frame);
	console.log("CSS-PARALLAX animation '" + name + "' is at " + frame + "%", $el.get(), props);
	$el.css(props);
    }

    // Get array of properties with caluclated position `frame`% for animation `name`
    function getAnimFrame(name, frame) {
	var anim=getAnim(name);
	var start, end, startFrame, endFrame;

	for(var i=0; i < anim.cssRules.length; i++) {
	    var currFrame=parseInt(anim.cssRules[i].keyText);
	    if (currFrame <= frame) {
		start=anim.cssRules[i];
		startFrame=currFrame;
	    } else if (!end && currFrame >= frame) {
		end=anim.cssRules[i];
		endFrame=currFrame;
	    }
	    if (start && end) {
		break;
	    }
	}

	if (!start || !end) return (end && styleToArray(end.style)) || (start && styleToArray(start.style)); // outside
	return getAnimFrameProps(start, end, (frame - startFrame) / (endFrame - startFrame));
    }

    // Convert CSSStyle object into Array
    function styleToArray(style) {
	var props={};
	for (var i=0; i < style.length; i++) {
	    props[style[i]]=style[style[i]];
	}
	return props;
    }

    // Return CSS properties calculated between `start` and `end` according to `progress` (float percents)
    function getAnimFrameProps(start, end, progress) {
	var props={};
	for (var i=0; i < start.style.length; i++) {
	    var prop=start.style[i];
	    var parts=splitProp(start.style[prop]);
	    var valStart=parseFloat(parts[2]);
	    var valEnd=parseFloat(typeof end.style[prop] == "string" && end.style[prop] != "" ? splitProp(end.style[prop])[2] : valStart);
	    var val=valStart + (valEnd - valStart) * progress;
	    props[prop]=parts[1] + val + parts[3];
	}
	return props;
    }

    // Search all CSS and return keyframe CSS object of given name
    function getAnim(name) {
	var all = document.styleSheets;
	for (var i = 0; i < all.length; ++i) {
	    for (var j = 0; j < all[i].cssRules.length; ++j) {
		if (all[i].cssRules[j].type == 7 && all[i].cssRules[j].name == name) {
		    return all[i].cssRules[j]; }
	    }
	}
	return null;
    }

    // Split CSS property into [all, prefix, number, suffix]
    function splitProp(prop) {
	var split=prop.match(/^(.*?)([+-]?[0-9.]+)(.*?)$/);
	return split;
    }

})();
