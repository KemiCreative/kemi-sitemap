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

          }
        }

      } else {
        console.log('unchecked');
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
