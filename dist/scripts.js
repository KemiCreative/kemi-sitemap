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

__webpack_require__(2);
module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);


/***/ }),
/* 3 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjIyYjdjODYxZDNlMzVkMjI4MDIiLCJ3ZWJwYWNrOi8vLy4vYWRtaW4vc2Nzcy9fYWRtaW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZGF0YS1sYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3REEseUM7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUwsR0FBRztBQUNILENBQUMsVSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjIyYjdjODYxZDNlMzVkMjI4MDIiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYWRtaW4vc2Nzcy9fYWRtaW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2RhdGEtbGF5b3V0LmpzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuY29uc3QgJHZhbHVlID0gW1xuXHRwb3N0cyA9IHtcblx0XHRhY3RpdmU6IHRydWUsXG5cdFx0bGFiZWw6ICdQb3N0cycsXG5cdFx0dGF4b25vbWllczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0YXhvbm9teTogJ3Bvc3RfdGFnJyxcblx0XHRcdFx0YWN0aXZlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0YXhvbm9teTogJ3Bvc3RfY2F0ZWdvcnknLFxuXHRcdFx0XHRhY3RpdmU6IHRydWVcblx0XHRcdH1cblx0XHRdLFxuXHRcdGluZGl2aWR1YWxfaXRlbXM6IHRydWUsXG5cdFx0bGlzdF9zdHlsZTogJ2NvbWJpbmVkJyxcblx0XHRleGNsdWRlczogJzEsMiwxMiwxNDUnLFxuXHR9LFxuXHRwYWdlID0ge1xuXHRcdGFjdGl2ZTogZmFsc2UsXG5cdFx0bGFiZWw6ICdQYWdlcycsXG5cdFx0dGF4b25vbWllczogW10sXG5cdFx0aW5kaXZpZHVhbF9pdGVtczogdHJ1ZSxcblx0XHRsaXN0X3N0eWxlOiAnc2VwZXJhdGUnLFxuXHRcdGV4Y2x1ZGVzOiAnMSwyLDEyLDE0NScsXG5cdH0sXG5dO1xuKi9cblxuKGZ1bmN0aW9uKCQpIHtcbiAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXG4gICAgY29uc3Qga2VtaV9zaXRlbWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmtlbWlzaXRlbWFwX2NwdHMnKTtcbiAgICBjb25zdCBjcHRfYmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmtlbWktc2l0ZW1hcC1wdC1ibG9jaycpO1xuICAgIGNvbnN0IGNwdF9ibG9ja3Nfd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNrZW1pLXNpdGVtYXAnKTtcblxuICAgIGxldCBsYWJlbFByZXYgPSAnJztcblxuXG4gICAgLypcbiAgICAgKiBEZXNjcmlwdGlvbjogRnVuY3Rpb24gdG8gVG9nZ2xlIHRoZSBDUFQgaW4gVmlld2luZyBXaW5kb3dcbiAgICAgKi9cbiAgICBjb25zdCB0b2dnbGVDUFQgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT0gJ3N3aXRjaCcpIHtcblxuICAgICAgICBsZXQga2V5ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgncG9zdC10eXBlJyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgQ1BUIGluIHRoZSBWaWV3aW5nIFdpbmRvd1xuICAgICAgICAgIC8vY29uc29sZS5sb2coJ2NoZWNrZWQnKTtcbiAgICAgICAgICBsZXQgbGFiZWwgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkTm9kZXNbM10udmFsdWU7XG4gICAgICAgICAgYWpheFRvZ2dsZUNQVChrZXksIGxhYmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBSZW1vdmUgdGhlIENQVCBmcm9tIHRoZSBWaWV3aW5nIFdpbmRvd1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1bmNoZWNrZWQnKTtcbiAgICAgICAgICB2YXIgZWxlbWVudCA9IGNwdF9ibG9ja3Nfd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcua2VtaS1zaXRlbWFwLXB0LWJsb2NrW3Bvc3QtdHlwZT0nICsga2V5ICsgJ10nKTtcbiAgICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIERlc2NyaXB0aW9uOiBGdW5jdGlvbiB0byBydW4gQUpBWCB0aGF0IFRvZ2dsZXMgdGhlIENQVCBpbiBWaWV3aW5nIFdpbmRvd1xuICAgICAqL1xuICAgIGNvbnN0IGFqYXhUb2dnbGVDUFQgPSAoa2V5LCBsYWJlbCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYWN0aW9uOiAnS2VtaVNpdGVtYXBfdGVtcGxhdGVfYmxvY2tfc2V0dXAnLFxuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHBvc3RfdHlwZToge1xuICAgICAgICAgICAgJ2xhYmVsJzogbGFiZWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXJsOiBrZW1pU2l0ZW1hcExvY2FsU2NyaXB0LmFqYXhfdXJsLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHRoaXMgaXMgYSB0ZXN0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzIHRoaXMgaXMgYSB0ZXN0Jyk7XG4gICAgICAgICAgJCgnI2tlbWktc2l0ZW1hcCcpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogRGVzY3JpcHRpb246IEZ1bmN0aW9uIHRvIHNldCB0aGUgY3VycmVudCBsYWJlbCB2YWx1ZSBiZWZvcmUgY2hhbmdlXG4gICAgICovXG4gICAgY29uc3QgbGFiZWxGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgbGFiZWxQcmV2ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogRGVzY3JpcHRpb246IEZ1bmN0aW9uIHRvIGNoYW5nZSB0aGUgQ1BUIGxhYmVsIGluIHRoZSBWaWV3aW5nIFdpbmRvd1xuICAgICAqL1xuICAgIGNvbnN0IGxhYmVsQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAvLyBGaW5kIHRoZSBWSUVXSU5HIFdJTkRPVyBDUFQgYmFzZWQgb24gbGFiZWxQcmV2IHZhcmlhYmxlXG4gICAgICAvLyAnVklFV0lORyBXSU5ET1cgQ1BUJyA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT0gJycpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gZXZlbnQudGFyZ2V0LnBsYWNlaG9sZGVyO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcHRfYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBibG9jayA9IGNwdF9ibG9ja3NbaV0ucXVlcnlTZWxlY3RvcignaDMnKTtcbiAgICAgICAgaWYgKGJsb2NrLnRleHRDb250ZW50ID09IGxhYmVsUHJldikge1xuICAgICAgICAgIGJsb2NrLnRleHRDb250ZW50ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAkKCcua2VtaXNpdGVtYXBfY3B0cyAuc3dpdGNoIGlucHV0Jykub24oJ2NsaWNrJywgdG9nZ2xlQ1BUKTtcbiAgICAkKCcua2VtaXNpdGVtYXAtY3B0LWxhYmVsJykub24oJ2ZvY3VzJywgbGFiZWxGb2N1cyk7XG4gICAgJCgnLmtlbWlzaXRlbWFwLWNwdC1sYWJlbCcpLm9uKCdjaGFuZ2UnLCBsYWJlbENoYW5nZSk7XG5cbiAgICAvKlxuICAgIGxldCBvdXRwdXQgPSBbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjcHRzLmxlbmd0aDsgaSsrKXtcbiAgICBcdGxldCB2YWx1ZSA9IHt9O1xuICAgIFx0bGV0IGNoZWNrYm94ID0gY3B0c1tpXS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpO1xuICAgIFx0dmFsdWUucG9zdF90eXBlID0gY2hlY2tib3gudmFsdWU7XG4gICAgXHR2YWx1ZS5hY3RpdmUgPSBjaGVja2JveC5jaGVja2VkID8gMSA6IDA7XG5cbiAgICBcdHZhbHVlLmluY2x1ZGVzID0ge307XG5cbiAgICBcdHZhbHVlLmluY2x1ZGVzLnRheG9ub215ID0gY2hlY2tib3guZ2V0QXR0cmlidXRlKCd0YXhvbm9teScpO1xuXG4gICAgXHR2YWx1ZS5pbmNsdWRlcy50YXhvbm9taWVzID0gY2hlY2tib3guZ2V0QXR0cmlidXRlKCd0YXhvbm9teScpO1xuXG4gICAgXHRvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgfSovXG5cbiAgfSk7XG59KShqUXVlcnkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvZGF0YS1sYXlvdXQuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==