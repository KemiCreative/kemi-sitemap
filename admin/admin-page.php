<?php

final class KemiSitemap_Admin
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    private $main;

    /**
     * Function to determine if viewing a KemiSitemap admin Page.
     *
     * @since 1.0.0
     * @return boolean
     */
    public function KemiSitemap_is_admin_page()
    {
        if (get_current_screen()->base == 'settings_page_'.KEMISITEMAP_SLUG) {
            return 'true';
        }
        return 'false';
    }

    /**
    * Load styles for all WPForms-related admin screens.
    *
    * @since 1.0.0
    */
    public function KemiSitemap_admin_styles($hook_suffix)
    {
        // jQuery confirm.
        // wp_enqueue_script('jQuery');
        if ($hook_suffix == 'settings_page_'.KEMISITEMAP_SLUG) {
            wp_enqueue_script('data-layout', KEMISITEMAP_PLUGIN_URL . 'dist/data-layout.js', array('jquery'));

            wp_enqueue_style(
            'admin_page',
            KEMISITEMAP_PLUGIN_URL . 'dist/app.css',
            array(),
            KEMISITEMAP_VERSION
        );

            wp_localize_script('data-layout', 'kemiSitemapLocalScript', array(
            'ajax_url' => admin_url('admin-ajax.php')
        ));
        }
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
    public function KemiSitemap_admin_body_class($classes)
    {
        if (! $this->KemiSitemap_is_admin_page()) {
            return $classes;
        }

        return "$classes kemisitemap-admin-page";
    }


    /**
     * Start up
     */
    public function __construct()
    {
        $this->main = new KemiSitemap_Viewing_Window;

        add_action('admin_enqueue_scripts', array( $this, 'KemiSitemap_admin_styles' ));
        add_action('admin_menu', array( $this, 'KemiSitemap_add_menu_page' ));
        add_action('admin_init', array( $this, 'KemiSitemap_settings' ));
        add_action('admin_init', array( $this, 'KemiSitemap_settings_fields' ));
        add_filter('admin_body_class', array( $this, 'KemiSitemap_admin_body_class' ), 10, 1);
    }

    /**
     * Register Options Page in Admin Menu
     */
    public function KemiSitemap_add_menu_page()
    {
        add_options_page(
        'Kemi Creative Sitemap',
        'Kemi Sitemap',
        'manage_options',
        KEMISITEMAP_SLUG,
      array( $this, 'KemiSitemap_options_page' )
    );
    }

    /**
     * Register Options Page Settings and Sections
     */
    public function KemiSitemap_settings()
    {

    // Register new settings for "KemiSitemap_options" page
        register_setting('KemiSitemap_group', 'KemiSitemap_options');

        // Register a new section in the "KemiSitemap_options" page
        add_settings_section(
      'KemiSitemap_options',
      __('Kemi Sitemap', 'KemiSitemap'),
      array( $this, 'KemiSitemap_description' ),
      'KemiSitemap_group'
    );
    }

    /**
     * The description for under the "KemiSitemap_section" Title
     */
    public function KemiSitemap_description()
    {
        echo '<p>Kemi Sitemap Description</p>';
    }

    /**
     * Register Fields by Section
     */
    public function KemiSitemap_settings_fields()
    {
        // Section: KemiSitemap_section
        add_settings_field(
      'KemiSitemap_cpt',
      __('', 'KemiSitemap'),
      array( $this, 'KemiSitemap_cpt_output' ),
      'KemiSitemap_group',
      'KemiSitemap_options',
      ''
    );
    }

    public function KemiSitemap_cpt_output()
    {
        $post_types = get_post_types(array('public'=>true), 'object');
        // global $wp_taxonomies;
        // echo '<pre>';
        // print_r($wp_taxonomies);
        // echo '</pre>';

        $data = json_decode($this->options['data']);

        echo '<div class="kemisitemap_cpts">';
        echo '<h2>Current Custom Post Types</h2>';
        echo '<p class="kemisitemap-cpts-errors" class="description"></p>';
        foreach ($post_types as $post_type) {
          // print_r($post_type);

          $taxonomies = get_object_taxonomies($post_type->name);
          // echo '<pre>';
          // print_r($taxonomies);
          // echo '</pre>';

          // echo '<pre>';
          // print_r($post_type->name);
          // echo '</pre>';

          $checked = (empty($this->options[$post_type->name]['active']) ? 0 : 1);
          $label = (empty($this->options[$post_type->name]['label']) ? $post_type->label : $this->options[$post_type->name]['label']); ?>
          <div class="kemisitemap-cpt-toggle" post-type="<?php echo $post_type->name; ?>">
            <div class="kemisitemap-cpt-title">
              <strong><?php echo $post_type->label; ?></strong>
              <input class="kemisitemap-cpt-label" type="input" name="KemiSitemap_options[<?php echo $post_type->name; ?>][label]" value="<?php echo $label; ?>" placeholder="<?php echo $label; ?>" />
              <label class="switch">
                <input class="kemisitemap-cpt-active" type="checkbox" name="KemiSitemap_options[<?php echo $post_type->name; ?>][active]" value="1" <?php echo checked($checked, 1, 1); ?> />
                <span class="slider round"></span>
              </label>
            </div><!-- Rounded switch -->
            <div class="kemisitemap-cpt-content">
              <div class="kemisitemap-includes">
                <?php if (!empty($taxonomies)) {
                  ?>
                  <span>
                    <strong><?php _e('Includes', 'KemiSitemap'); ?></strong>
                  </span>
                  <?php
                  $category = (empty($this->options[$post_type->name]['cat']) ? 0 : 1);
                  $ind = (empty($this->options[$post_type->name]['ind']) ? 0 : 1); ?>
                  <label><input class="kemisitemap-cpt-cat" type="checkbox" name="KemiSitemap_options[<?php echo $post_type->name; ?>][cat]" value="1" <?php echo checked($category, 1, 1); ?> /><?php echo $post_type->label; ?> <?php _e('Categories', 'KemiSitemap'); ?></label>
                  <label><input class="kemisitemap-cpt-ind" type="checkbox" name="KemiSitemap_options[<?php echo $post_type->name; ?>][ind]" value="1" <?php echo checked($ind, 1, 1); ?> /><?php _e('Individual ', 'KemiSitemap'); ?> <?php echo $post_type->label; ?> </label>
                  <?php
                } ?>
              </div>
              <div class="kemisitemap-list-style">
                <?php if (!empty($taxonomies)) {
                  $style = (empty($this->options[$post_type->name]['style']) ? 0 : 1); ?>
                  <span>
                    <strong><?php _e('List Style', 'KemiSitemap'); ?></strong>
                  </span>
                  <label>
                    <input class="kemisitemap-cpt-style" type="checkbox" name="KemiSitemap_options[<?php echo $post_type->name; ?>][style]" value="1" <?php echo checked($style, 1, 1); ?> /><?php echo $post_type->label; ?> <?php _e('Combined Post Categories and Individual Posts', 'KemiSitemap'); ?>
                  </label>
                  <?php
                } ?>
              </div>
              <div class="kemisitemap-excludes">
                <span>
                  <strong><?php _e('Excluded ', 'KemiSitemap'). $post_type->label; ?></strong>
                </span>
                <label>
                  <input class="kemisitemap-cpt-excludes" type="text" name="KemiSitemap_options[<?php echo $post_type->name; ?>][excludes]" value="<?php echo $this->options[$post_type->name]['excludes']; ?>" /> <?php _e('Please add comma separated list of Post IDs', 'KemiSitemap'); ?>
                </label>
              </div>
            </div>
          </div>
        <?php
        }
        echo '<pre>';
        print_r($data);
        echo '</pre>';
        echo '</div>';

        submit_button();
    }

    public function KemiSitemap_options_page()
    {
        ?>
  	<form action='options.php' method='post'>
  		<?php

      $this->options = get_option('KemiSitemap_options');
        print_r($this->options);
        settings_fields('KemiSitemap_group');
        do_settings_sections('KemiSitemap_group'); ?>

  	</form>
  	<?php
        echo $this->main -> KemiSitemap_template();
    }
}

new KemiSitemap_Admin;
