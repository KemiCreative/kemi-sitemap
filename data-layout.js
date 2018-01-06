/**/
const $value = {
	cpts: [
		{
			post_type: 'post',
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
		{
			post_type: 'page',
			active: false,
			label: 'Pages',
			taxonomies: [],
			individual_items: true,
			list_style: 'seperate',
			excludes: '1,2,12,145',
		},
		{
			post_type: 'event',
			active: true,
			label: 'Events',
			taxonomies: [],
			individual_items: true,
			list_style: 'seperate',
			excludes: '1,2,12,145',
		}
	]

};
/**/

(function($){
  $(document).ready(() => {
  	
  	const cpts = document.getElementsByClassName('KemiSitemap-cpt');
  	const input = document.querySelector('#testing');
  	let output = [];
  	
  	for(let i = 0; i < cpts.length; i++){
  		let value = {};
  		let checkbox = cpts[i].querySelector('input[type=checkbox]');
  		value.post_type = checkbox.value;
  		value.active = checkbox.checked ? 1 : 0;

  		value.includes = {};

  		value.includes.taxonomy = checkbox.getAttribute('taxonomy');

  		//value.includes.taxonomies = checkbox.getAttribute('taxonomy');

  		output.push(value);
  	}

  	console.log(output);

  	input.value = JSON.stringify($value);

  	console.log($value);

  });
})(jQuery);