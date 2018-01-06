<?php

final class KemiSitemap_Admin{
  /**
   * Holds the values to be used in the fields callbacks
   */
  private $options;

  /**
   * Function to determine if viewing a KemiSitemap admin Page.
   *
   * @since 1.0.0
   * @return boolean
   */
  function KemiSitemap_is_admin_page() {
     if( ! is_admin() ){
       return false;
     }
     return true;
   }

   /**
   * Load styles for all WPForms-related admin screens.
   *
   * @since 1.0.0
   */
  public function KemiSitemap_admin_styles() {
  	// jQuery confirm.
    // wp_enqueue_script('jQuery');
    wp_enqueue_script('data-layout', KEMISITEMAP_PLUGIN_URL. 'data-layout.js',  array('jquery') );

  	wp_enqueue_style(
  		'admin_page',
  		KEMISITEMAP_PLUGIN_URL . 'admin/css/admin.css',
  		array(),
  		KEMISITEMAP_VERSION
  	);
  }

   /**
   * Add body class to KemiSitemap admin pages for easy reference.
   *
   * @since 1.0.0
   *
   * @param string $classes
   *
   * @return string
   */
  private function KemiSitemap_admin_body_class( $classes ) {

  	if ( ! KemiSitemap_is_admin_page() ) {
  		return $classes;
  	}

  	return "$classes kemisitemap-admin-page";
  }


  /**
   * Start up
   */
  public function __construct() {

    add_action( 'admin_enqueue_scripts', array( $this, 'KemiSitemap_admin_styles' ) );
    add_action( 'admin_menu', array( $this, 'KemiSitemap_add_menu_page' ) );
    add_action( 'admin_init', array( $this, 'KemiSitemap_settings' ) );
    add_action( 'admin_init', array( $this, 'KemiSitemap_settings_fields' ) );
    add_filter( 'admin_body_class', array( $this, 'KemiSitemap_admin_body_class' ), 10, 1 );
  }

  /**
   * Register Options Page in Admin Menu
   */
  public function KemiSitemap_add_menu_page() {
    add_options_page(
    	'Kemi Creative Sitemap',
    	'Kemi Sitemap',
    	'manage_options',
    	'kemi-sitemap',
      array( $this, 'KemiSitemap_options_page' )
    );
	}

  /**
   * Register Options Page Settings and Sections
   */
  public function KemiSitemap_settings(){

    // Register new settings for "KemiSitemap_options" page
    register_setting( 'KemiSitemap_group', 'KemiSitemap_options' );

    // Register a new section in the "KemiSitemap_options" page
    add_settings_section(
      'KemiSitemap_options',
      __( 'Kemi Sitemap', 'KemiSitemap' ),
      array( $this, 'KemiSitemap_description' ),
      'KemiSitemap_group'
    );

  }

  /**
   * The description for under the "KemiSitemap_section" Title
   */
  public function KemiSitemap_description() {

    echo '<p>Kemi Sitemap Description</p>';

  }

  /**
   * Register Fields by Section
   */
  public function KemiSitemap_settings_fields(){
    // Section: KemiSitemap_section
    add_settings_field(
      'KemiSitemap_cpt',
      __( '', 'KemiSitemap' ),
      array( $this, 'KemiSitemap_cpt_output' ),
      'KemiSitemap_group',
      'KemiSitemap_options',
      ''
    );

  }

  public function KemiSitemap_cpt_output(){
    $post_types = get_post_types('', 'object');
    // global $wp_taxonomies;
    // echo '<pre>';
    // print_r($wp_taxonomies);
    // echo '</pre>';

    $data = json_decode($this->options['data']);
    echo '<pre>';
    print_r($data);
    echo '</pre>';

    echo '<div class="KemiSitemap_cpts">';
      echo '<h2>Current Custom Post Types</h2>';
      echo '<p class="KemiSitemap-cpts-errors" class="description"></p>';
      foreach($post_types as $post_type){
        // print_r($post_type);

        $taxonomies = get_object_taxonomies($post_type->name);
        // echo '<pre>';
        // print_r($taxonomies);
        // echo '</pre>';
        $checked = (empty($this->options[$post_type->name]) ? 1 : $this->options[$post_type->name]);
        ?>
        <div class="KemiSitemap-cpt">
          <div class="KemiSitemap-cpt-title"><?php echo $post_type->label; ?></div><!-- Rounded switch -->
          <label class="switch">
            <input type="checkbox" name="KemiSitemap_options[<?php echo $post_type->name; ?>]" value="<?php echo $post_type->name; ?>" taxonomy="<?php echo $post_type->taxonomies; ?>" <?php echo checked( $checked, $post_type->name, 0 ); ?> />
            <span class="slider round"></span>
          </label>
        </div>
        <?php
      }

      echo '<input type="hidden" name="KemiSitemap_options[data]" id="testing" value="<?php $this->options["data"]; ?>" />';
    echo '</div>';

    submit_button();
  }

  public function KemiSitemap_options_page() {
  	?>
  	<form action='options.php' method='post'>
  		<?php

      $this->options = get_option( 'KemiSitemap_options' );
      print_r($this->options);
  		settings_fields( 'KemiSitemap_group' );
  		do_settings_sections( 'KemiSitemap_group' );


  		?>

  	</form>
  	<?php
  }

}

new KemiSitemap_Admin;