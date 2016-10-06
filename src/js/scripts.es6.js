import 'babel-polyfill';
import $ from 'jquery';
import { foundation } from 'foundation-sites/js/foundation.core';
import 'foundation-sites/js/foundation.util.mediaQuery';
import 'foundation-sites/js/foundation.util.motion';
import 'foundation-sites/js/foundation.util.keyboard';
import 'foundation-sites/js/foundation.accordion';

console.log('HELLO A11Y TEST');

// THIS NEEDS TO BE REMOVED
$(document).ready(function(){
		$(document).foundation();
});




