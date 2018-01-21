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
      if (event.target.value === '') {
        event.target.value = event.target.placeholder;
      }
      for (let i = 0; i < cpt_blocks.length; i++) {
        let block = cpt_blocks[i].querySelector('h3');
        if (block.textContent === labelPrev) {
          block.textContent = event.target.value;
        }
      }
    }

    /*
     * Description: Function to toggle the CPT Individual Pages
     */
    const includeInd = (event) => {

      if(event.target.checked){
        console.log('checked');

        let key = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('post-type');

        for (let i = 0; i < cpt_blocks.length; i++) {
          let block = cpt_blocks[i];
          if (block.getAttribute('post-type') === key) {
            let divs = block.querySelectorAll('div');
            for(let e = 0; e < divs.length; e++){
              block.removeChild(divs[e]);
            }
          }
        }

      } else {
        console.log('unchecked');
      }

    }

    $('.kemisitemap_cpts .switch input').on('click', toggleCPT);
    $('.kemisitemap-cpt-label').on('focus', labelFocus);
    $('.kemisitemap-cpt-label').on('change', labelChange);
    $('.kemisitemap-cpt-ind').on('change', includeInd);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmMyYTY3ZWRiMDE3MTg5ZWY3ZjQiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2RhdGEtbGF5b3V0LmpzIiwid2VicGFjazovLy8uL2FkbWluL3Njc3MvX2FkbWluLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUwsR0FBRztBQUNILENBQUM7Ozs7Ozs7QUNwS0QseUMiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJjMmE2N2VkYjAxNzE4OWVmN2Y0IiwicmVxdWlyZSgnLi9kYXRhLWxheW91dC5qcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbmNvbnN0ICR2YWx1ZSA9IFtcblx0cG9zdHMgPSB7XG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGxhYmVsOiAnUG9zdHMnLFxuXHRcdHRheG9ub21pZXM6IFtcblx0XHRcdHtcblx0XHRcdFx0dGF4b25vbXk6ICdwb3N0X3RhZycsXG5cdFx0XHRcdGFjdGl2ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGF4b25vbXk6ICdwb3N0X2NhdGVnb3J5Jyxcblx0XHRcdFx0YWN0aXZlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRpbmRpdmlkdWFsX2l0ZW1zOiB0cnVlLFxuXHRcdGxpc3Rfc3R5bGU6ICdjb21iaW5lZCcsXG5cdFx0ZXhjbHVkZXM6ICcxLDIsMTIsMTQ1Jyxcblx0fSxcblx0cGFnZSA9IHtcblx0XHRhY3RpdmU6IGZhbHNlLFxuXHRcdGxhYmVsOiAnUGFnZXMnLFxuXHRcdHRheG9ub21pZXM6IFtdLFxuXHRcdGluZGl2aWR1YWxfaXRlbXM6IHRydWUsXG5cdFx0bGlzdF9zdHlsZTogJ3NlcGVyYXRlJyxcblx0XHRleGNsdWRlczogJzEsMiwxMiwxNDUnLFxuXHR9LFxuXTtcbiovXG5cbihmdW5jdGlvbigkKSB7XG4gICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblxuICAgIGNvbnN0IGtlbWlfc2l0ZW1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rZW1pc2l0ZW1hcF9jcHRzJyk7XG4gICAgY29uc3QgY3B0X2Jsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5rZW1pLXNpdGVtYXAtcHQtYmxvY2snKTtcbiAgICBjb25zdCBjcHRfYmxvY2tzX3dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcja2VtaS1zaXRlbWFwJyk7XG5cbiAgICBsZXQgbGFiZWxQcmV2ID0gJyc7XG5cblxuICAgIC8qXG4gICAgICogRGVzY3JpcHRpb246IEZ1bmN0aW9uIHRvIFRvZ2dsZSB0aGUgQ1BUIGluIFZpZXdpbmcgV2luZG93XG4gICAgICovXG4gICAgY29uc3QgdG9nZ2xlQ1BUID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09ICdzd2l0Y2gnKSB7XG5cbiAgICAgICAgbGV0IGtleSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ3Bvc3QtdHlwZScpO1xuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIC8vIFNob3cgdGhlIENQVCBpbiB0aGUgVmlld2luZyBXaW5kb3dcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjaGVja2VkJyk7XG4gICAgICAgICAgbGV0IGxhYmVsID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzNdLnZhbHVlO1xuICAgICAgICAgIGFqYXhUb2dnbGVDUFQoa2V5LCBsYWJlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBDUFQgZnJvbSB0aGUgVmlld2luZyBXaW5kb3dcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygndW5jaGVja2VkJyk7XG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSBjcHRfYmxvY2tzX3dyYXBwZXIucXVlcnlTZWxlY3RvcignLmtlbWktc2l0ZW1hcC1wdC1ibG9ja1twb3N0LXR5cGU9JyArIGtleSArICddJyk7XG4gICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZXNjcmlwdGlvbjogRnVuY3Rpb24gdG8gcnVuIEFKQVggdGhhdCBUb2dnbGVzIHRoZSBDUFQgaW4gVmlld2luZyBXaW5kb3dcbiAgICAgKi9cbiAgICBjb25zdCBhamF4VG9nZ2xlQ1BUID0gKGtleSwgbGFiZWwpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGFjdGlvbjogJ0tlbWlTaXRlbWFwX3RlbXBsYXRlX2Jsb2NrX3NldHVwJyxcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBwb3N0X3R5cGU6IHtcbiAgICAgICAgICAgICdsYWJlbCc6IGxhYmVsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVybDoga2VtaVNpdGVtYXBMb2NhbFNjcmlwdC5hamF4X3VybCxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciB0aGlzIGlzIGEgdGVzdCcpO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcyB0aGlzIGlzIGEgdGVzdCcpO1xuICAgICAgICAgICQoJyNrZW1pLXNpdGVtYXAnKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIERlc2NyaXB0aW9uOiBGdW5jdGlvbiB0byBzZXQgdGhlIGN1cnJlbnQgbGFiZWwgdmFsdWUgYmVmb3JlIGNoYW5nZVxuICAgICAqL1xuICAgIGNvbnN0IGxhYmVsRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgIGxhYmVsUHJldiA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIERlc2NyaXB0aW9uOiBGdW5jdGlvbiB0byBjaGFuZ2UgdGhlIENQVCBsYWJlbCBpbiB0aGUgVmlld2luZyBXaW5kb3dcbiAgICAgKi9cbiAgICBjb25zdCBsYWJlbENoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgLy8gRmluZCB0aGUgVklFV0lORyBXSU5ET1cgQ1BUIGJhc2VkIG9uIGxhYmVsUHJldiB2YXJpYWJsZVxuICAgICAgLy8gJ1ZJRVdJTkcgV0lORE9XIENQVCcgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSBldmVudC50YXJnZXQucGxhY2Vob2xkZXI7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNwdF9ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGJsb2NrID0gY3B0X2Jsb2Nrc1tpXS5xdWVyeVNlbGVjdG9yKCdoMycpO1xuICAgICAgICBpZiAoYmxvY2sudGV4dENvbnRlbnQgPT09IGxhYmVsUHJldikge1xuICAgICAgICAgIGJsb2NrLnRleHRDb250ZW50ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZXNjcmlwdGlvbjogRnVuY3Rpb24gdG8gdG9nZ2xlIHRoZSBDUFQgSW5kaXZpZHVhbCBQYWdlc1xuICAgICAqL1xuICAgIGNvbnN0IGluY2x1ZGVJbmQgPSAoZXZlbnQpID0+IHtcblxuICAgICAgaWYoZXZlbnQudGFyZ2V0LmNoZWNrZWQpe1xuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tlZCcpO1xuXG4gICAgICAgIGxldCBrZXkgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ3Bvc3QtdHlwZScpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3B0X2Jsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBibG9jayA9IGNwdF9ibG9ja3NbaV07XG4gICAgICAgICAgaWYgKGJsb2NrLmdldEF0dHJpYnV0ZSgncG9zdC10eXBlJykgPT09IGtleSkge1xuICAgICAgICAgICAgbGV0IGRpdnMgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcbiAgICAgICAgICAgIGZvcihsZXQgZSA9IDA7IGUgPCBkaXZzLmxlbmd0aDsgZSsrKXtcbiAgICAgICAgICAgICAgYmxvY2sucmVtb3ZlQ2hpbGQoZGl2c1tlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1bmNoZWNrZWQnKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgICQoJy5rZW1pc2l0ZW1hcF9jcHRzIC5zd2l0Y2ggaW5wdXQnKS5vbignY2xpY2snLCB0b2dnbGVDUFQpO1xuICAgICQoJy5rZW1pc2l0ZW1hcC1jcHQtbGFiZWwnKS5vbignZm9jdXMnLCBsYWJlbEZvY3VzKTtcbiAgICAkKCcua2VtaXNpdGVtYXAtY3B0LWxhYmVsJykub24oJ2NoYW5nZScsIGxhYmVsQ2hhbmdlKTtcbiAgICAkKCcua2VtaXNpdGVtYXAtY3B0LWluZCcpLm9uKCdjaGFuZ2UnLCBpbmNsdWRlSW5kKTtcblxuICAgIC8qXG4gICAgbGV0IG91dHB1dCA9IFtdO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNwdHMubGVuZ3RoOyBpKyspe1xuICAgIFx0bGV0IHZhbHVlID0ge307XG4gICAgXHRsZXQgY2hlY2tib3ggPSBjcHRzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyk7XG4gICAgXHR2YWx1ZS5wb3N0X3R5cGUgPSBjaGVja2JveC52YWx1ZTtcbiAgICBcdHZhbHVlLmFjdGl2ZSA9IGNoZWNrYm94LmNoZWNrZWQgPyAxIDogMDtcblxuICAgIFx0dmFsdWUuaW5jbHVkZXMgPSB7fTtcblxuICAgIFx0dmFsdWUuaW5jbHVkZXMudGF4b25vbXkgPSBjaGVja2JveC5nZXRBdHRyaWJ1dGUoJ3RheG9ub215Jyk7XG5cbiAgICBcdHZhbHVlLmluY2x1ZGVzLnRheG9ub21pZXMgPSBjaGVja2JveC5nZXRBdHRyaWJ1dGUoJ3RheG9ub215Jyk7XG5cbiAgICBcdG91dHB1dC5wdXNoKHZhbHVlKTtcbiAgICB9Ki9cblxuICB9KTtcbn0pKGpRdWVyeSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2RhdGEtbGF5b3V0LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hZG1pbi9zY3NzL19hZG1pbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=