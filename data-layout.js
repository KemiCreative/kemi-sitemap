/*
$value = {
	cpts: [
		{
			post_type: 'post',
			active: true,
			label: 'Posts',
			includes: {
				taxonomies: true,
				individual_items: true
			},
			list_style: 'combined'
		},
		{
			post_type: 'page',
			active: false,
			label: 'Pages',
			includes: {
				individual_items: true
			},
			list_style: 'seperate'
		},
		{
			post_type: 'event',
			active: true,
			label: 'Events',
			includes: {
				individual_items: true
			},
			list_style: 'seperate'
		}
	]

}
*/

(function($){
  $(document).ready(() => {
  	
  	const cpts = document.getElementsByClassName('KemiSitemap-cpt');
  	const input = document.querySelector('#testing');
  	let output = [];
  	
  	for(let i = 0; i < cpts.length; i++){
  		let value = {};
  		let checkbox = cpts[i].querySelector('input[type=checkbox]');
  		value.post_type = checkbox.value;
  		value.active = checkbox.checked;

  		value.includes = {};

  		value.includes.taxonomy = checkbox.getAttribute('taxonomy');

  		//value.includes.taxonomies = checkbox.getAttribute('taxonomy');

  		output.push(value);
  	}

  	console.log(output);

  });
})(jQuery);