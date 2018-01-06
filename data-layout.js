/**/
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
/**/

(function($){
  $(document).ready(() => {

  	// const cpts = document.querySelectorAll('.kemiSitemap-cpt');
  	// const checkbox = cpts.querySelector('input[type=checkbox]');
		// const label = cpts.querySelector('.kemiSitemap-cpt-label');
  	const input = document.querySelector('#testing');

		input.value = JSON.stringify($value);

  	console.log($value);


		// ********* let labelPrev = '';


  	// ********* checkbox.addEventListener('click', toggleCPT);
		// ********* label.addEventListener('focus', labelFocus);
		// ********* label.addEventListener('change', labelChange);



		/*
		 * Description: Function to Toggle the CPT in Viewing Window
		 */
		// ********* const toggleCPT = (event) => {
			// ********* if(event.target.checked){
				// Show the CPT in the Viewing Window
			// ********* } else {
				// Remove the CPT from the Viewing Window
			// ********* }
		// ********* }

		/*
		 * Description: Function to set the current label value before change
		 */
		// ********* const labelFocus = (event) => {
			// ********* labelPrev = event.target.value;
		// ********* }

		/*
		 * Description: Function to change the CPT label in the Viewing Window
		 */
		// *********** const labelChange = (event) => {
			// Find the VIEWING WINDOW CPT based on labelPrev variable
			// *********** 'VIEWING WINDOW CPT' = event.target.value;

		// *********** }

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
  	}

  	console.log(output);

  	input.value = JSON.stringify($value);

  	console.log($value);
  	*/

  });
})(jQuery);
