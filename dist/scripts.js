/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
const $value = [
	posts = {
		active: true,
		label: 'Posts',
		taxonomies: [
			{
				taxonomy: 'post_tag',
				active: true
			},
			{
				taxonomy: 'post_category',
				active: true
			}
		],
		individual_items: true,
		list_style: 'combined',
		excludes: '1,2,12,145',
	},
	page = {
		active: false,
		label: 'Pages',
		taxonomies: [],
		individual_items: true,
		list_style: 'seperate',
		excludes: '1,2,12,145',
	},
];
*/

(function($) {
  $(document).ready(() => {

    const kemi_sitemap = document.querySelector('.kemisitemap_cpts');
    const cpt_blocks = document.querySelectorAll('.kemi-sitemap-pt-block');
    const cpt_blocks_wrapper = document.querySelector('#kemi-sitemap');

    let labelPrev = '';


    /*
     * Description: Function to Toggle the CPT in Viewing Window
     */
    const toggleCPT = (event) => {
      if (event.target.parentNode.className == 'switch') {

        let key = event.target.parentNode.parentNode.parentNode.getAttribute('post-type');

        if (event.target.checked) {
          // Show the CPT in the Viewing Window
          //console.log('checked');
          let label = event.target.parentNode.parentNode.childNodes[3].value;
          ajaxToggleCPT(key, label);
        } else {
          // Remove the CPT from the Viewing Window
          // console.log('unchecked');
          var element = cpt_blocks_wrapper.querySelector('.kemi-sitemap-pt-block[post-type=' + key + ']');
          element.parentNode.removeChild(element);
        }
      }
    }

    /*
     * Description: Function to run AJAX that Toggles the CPT in Viewing Window
     */
    const ajaxToggleCPT = (key, label) => {
      console.log('test');
      $.ajax({
        type: "POST",
        dataType: 'html',
        data: {
          action: 'KemiSitemap_template_block_setup',
          key: key,
          post_type: {
            'label': label,
          },
        },
        url: kemiSitemapLocalScript.ajax_url,
        error: function(response) {
          console.log(response);
          console.log('error this is a test');
        },
        success: function(response) {
          console.log(response);
          console.log('success this is a test');
          $('#kemi-sitemap').append(response);
        }
      });
    }

    /*
     * Description: Function to set the current label value before change
     */
    const labelFocus = (event) => {
      labelPrev = event.target.value;
    }

    /*
     * Description: Function to change the CPT label in the Viewing Window
     */
    const labelChange = (event) => {
      // Find the VIEWING WINDOW CPT based on labelPrev variable
      // 'VIEWING WINDOW CPT' = event.target.value;
      if (event.target.value == '') {
        console.log('mike is gay');
        event.target.value = event.target.placeholder;
      }
      for (let i = 0; i < cpt_blocks.length; i++) {
        let block = cpt_blocks[i].querySelector('h3');
        if (block.textContent == labelPrev) {
          block.textContent = event.target.value;
        }
      }

    }

    $('.kemisitemap_cpts .switch input').on('click', toggleCPT);
    $('.kemisitemap-cpt-label').on('focus', labelFocus);
    $('.kemisitemap-cpt-label').on('change', labelChange);

    /*
    let output = [];

    for(let i = 0; i < cpts.length; i++){
    	let value = {};
    	let checkbox = cpts[i].querySelector('input[type=checkbox]');
    	value.post_type = checkbox.value;
    	value.active = checkbox.checked ? 1 : 0;

    	value.includes = {};

    	value.includes.taxonomy = checkbox.getAttribute('taxonomy');

    	value.includes.taxonomies = checkbox.getAttribute('taxonomy');

    	output.push(value);
    }*/

  });
})(jQuery);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmExZTUxMGMxZTE0ZWY3NjVlMDQiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2RhdGEtbGF5b3V0LmpzIiwid2VicGFjazovLy8uL2FkbWluL3Njc3MvX2FkbWluLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMLEdBQUc7QUFDSCxDQUFDOzs7Ozs7O0FDM0lELHlDIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmYTFlNTEwYzFlMTRlZjc2NWUwNCIsInJlcXVpcmUoJy4vZGF0YS1sYXlvdXQuanMnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5jb25zdCAkdmFsdWUgPSBbXG5cdHBvc3RzID0ge1xuXHRcdGFjdGl2ZTogdHJ1ZSxcblx0XHRsYWJlbDogJ1Bvc3RzJyxcblx0XHR0YXhvbm9taWVzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRheG9ub215OiAncG9zdF90YWcnLFxuXHRcdFx0XHRhY3RpdmU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRheG9ub215OiAncG9zdF9jYXRlZ29yeScsXG5cdFx0XHRcdGFjdGl2ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0aW5kaXZpZHVhbF9pdGVtczogdHJ1ZSxcblx0XHRsaXN0X3N0eWxlOiAnY29tYmluZWQnLFxuXHRcdGV4Y2x1ZGVzOiAnMSwyLDEyLDE0NScsXG5cdH0sXG5cdHBhZ2UgPSB7XG5cdFx0YWN0aXZlOiBmYWxzZSxcblx0XHRsYWJlbDogJ1BhZ2VzJyxcblx0XHR0YXhvbm9taWVzOiBbXSxcblx0XHRpbmRpdmlkdWFsX2l0ZW1zOiB0cnVlLFxuXHRcdGxpc3Rfc3R5bGU6ICdzZXBlcmF0ZScsXG5cdFx0ZXhjbHVkZXM6ICcxLDIsMTIsMTQ1Jyxcblx0fSxcbl07XG4qL1xuXG4oZnVuY3Rpb24oJCkge1xuICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cbiAgICBjb25zdCBrZW1pX3NpdGVtYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcua2VtaXNpdGVtYXBfY3B0cycpO1xuICAgIGNvbnN0IGNwdF9ibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcua2VtaS1zaXRlbWFwLXB0LWJsb2NrJyk7XG4gICAgY29uc3QgY3B0X2Jsb2Nrc193cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2tlbWktc2l0ZW1hcCcpO1xuXG4gICAgbGV0IGxhYmVsUHJldiA9ICcnO1xuXG5cbiAgICAvKlxuICAgICAqIERlc2NyaXB0aW9uOiBGdW5jdGlvbiB0byBUb2dnbGUgdGhlIENQVCBpbiBWaWV3aW5nIFdpbmRvd1xuICAgICAqL1xuICAgIGNvbnN0IHRvZ2dsZUNQVCA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PSAnc3dpdGNoJykge1xuXG4gICAgICAgIGxldCBrZXkgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdwb3N0LXR5cGUnKTtcblxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAvLyBTaG93IHRoZSBDUFQgaW4gdGhlIFZpZXdpbmcgV2luZG93XG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnY2hlY2tlZCcpO1xuICAgICAgICAgIGxldCBsYWJlbCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGROb2Rlc1szXS52YWx1ZTtcbiAgICAgICAgICBhamF4VG9nZ2xlQ1BUKGtleSwgbGFiZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgQ1BUIGZyb20gdGhlIFZpZXdpbmcgV2luZG93XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VuY2hlY2tlZCcpO1xuICAgICAgICAgIHZhciBlbGVtZW50ID0gY3B0X2Jsb2Nrc193cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5rZW1pLXNpdGVtYXAtcHQtYmxvY2tbcG9zdC10eXBlPScgKyBrZXkgKyAnXScpO1xuICAgICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogRGVzY3JpcHRpb246IEZ1bmN0aW9uIHRvIHJ1biBBSkFYIHRoYXQgVG9nZ2xlcyB0aGUgQ1BUIGluIFZpZXdpbmcgV2luZG93XG4gICAgICovXG4gICAgY29uc3QgYWpheFRvZ2dsZUNQVCA9IChrZXksIGxhYmVsKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhY3Rpb246ICdLZW1pU2l0ZW1hcF90ZW1wbGF0ZV9ibG9ja19zZXR1cCcsXG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgcG9zdF90eXBlOiB7XG4gICAgICAgICAgICAnbGFiZWwnOiBsYWJlbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB1cmw6IGtlbWlTaXRlbWFwTG9jYWxTY3JpcHQuYWpheF91cmwsXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgdGhpcyBpcyBhIHRlc3QnKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MgdGhpcyBpcyBhIHRlc3QnKTtcbiAgICAgICAgICAkKCcja2VtaS1zaXRlbWFwJykuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZXNjcmlwdGlvbjogRnVuY3Rpb24gdG8gc2V0IHRoZSBjdXJyZW50IGxhYmVsIHZhbHVlIGJlZm9yZSBjaGFuZ2VcbiAgICAgKi9cbiAgICBjb25zdCBsYWJlbEZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICBsYWJlbFByZXYgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZXNjcmlwdGlvbjogRnVuY3Rpb24gdG8gY2hhbmdlIHRoZSBDUFQgbGFiZWwgaW4gdGhlIFZpZXdpbmcgV2luZG93XG4gICAgICovXG4gICAgY29uc3QgbGFiZWxDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIC8vIEZpbmQgdGhlIFZJRVdJTkcgV0lORE9XIENQVCBiYXNlZCBvbiBsYWJlbFByZXYgdmFyaWFibGVcbiAgICAgIC8vICdWSUVXSU5HIFdJTkRPVyBDUFQnID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykge1xuICAgICAgICBjb25zb2xlLmxvZygnbWlrZSBpcyBnYXknKTtcbiAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gZXZlbnQudGFyZ2V0LnBsYWNlaG9sZGVyO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcHRfYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBibG9jayA9IGNwdF9ibG9ja3NbaV0ucXVlcnlTZWxlY3RvcignaDMnKTtcbiAgICAgICAgaWYgKGJsb2NrLnRleHRDb250ZW50ID09IGxhYmVsUHJldikge1xuICAgICAgICAgIGJsb2NrLnRleHRDb250ZW50ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAkKCcua2VtaXNpdGVtYXBfY3B0cyAuc3dpdGNoIGlucHV0Jykub24oJ2NsaWNrJywgdG9nZ2xlQ1BUKTtcbiAgICAkKCcua2VtaXNpdGVtYXAtY3B0LWxhYmVsJykub24oJ2ZvY3VzJywgbGFiZWxGb2N1cyk7XG4gICAgJCgnLmtlbWlzaXRlbWFwLWNwdC1sYWJlbCcpLm9uKCdjaGFuZ2UnLCBsYWJlbENoYW5nZSk7XG5cbiAgICAvKlxuICAgIGxldCBvdXRwdXQgPSBbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjcHRzLmxlbmd0aDsgaSsrKXtcbiAgICBcdGxldCB2YWx1ZSA9IHt9O1xuICAgIFx0bGV0IGNoZWNrYm94ID0gY3B0c1tpXS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpO1xuICAgIFx0dmFsdWUucG9zdF90eXBlID0gY2hlY2tib3gudmFsdWU7XG4gICAgXHR2YWx1ZS5hY3RpdmUgPSBjaGVja2JveC5jaGVja2VkID8gMSA6IDA7XG5cbiAgICBcdHZhbHVlLmluY2x1ZGVzID0ge307XG5cbiAgICBcdHZhbHVlLmluY2x1ZGVzLnRheG9ub215ID0gY2hlY2tib3guZ2V0QXR0cmlidXRlKCd0YXhvbm9teScpO1xuXG4gICAgXHR2YWx1ZS5pbmNsdWRlcy50YXhvbm9taWVzID0gY2hlY2tib3guZ2V0QXR0cmlidXRlKCd0YXhvbm9teScpO1xuXG4gICAgXHRvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgfSovXG5cbiAgfSk7XG59KShqUXVlcnkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9kYXRhLWxheW91dC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYWRtaW4vc2Nzcy9fYWRtaW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9