$value = {
	cpts: [
		{
			post_type: 'post',
			active: true,
			label: 'Posts'
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