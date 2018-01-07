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

(function($){
  $(document).ready(() => {

		const kemi_sitemap = document.querySelector('.kemisitemap_cpts');
		const cpt_blocks = document.querySelectorAll('.kemi-sitemap-pt-block');

		let labelPrev = '';


		/*
		 * Description: Function to Toggle the CPT in Viewing Window
		 */
		const toggleCPT = (event) => {
			if(event.target.parentNode.className == 'switch'){
				if(event.target.checked){
					// Show the CPT in the Viewing Window
					console.log('checked');
				} else {
					// Remove the CPT from the Viewing Window
					console.log('unchecked');
				}
			}
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
			for(let i = 0; i < cpt_blocks.length; i++){
				let block = cpt_blocks[i].querySelector('h3');
				if(block.textContent == labelPrev){
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
