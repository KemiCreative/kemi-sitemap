<?php
/*
Plugin Name:  Kemi Sitemap
Plugin URI:   https://www.KemiCreative.com
Description:  Sitemap plugin
Version:      20171203
Author:       Kevin Stalder & Mike Schut
Author URI:   https://www.sanctuarymg.com
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  KemiCreative
Domain Path:  /languages
*/

/* only run this on admin init */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Don't allow multiple versions to be active
if ( class_exists( 'KemiSitemap' ) ) {
  /**
  * Deactivate if KCsitemap is already activated.
  *
  * @since 1.0.0
  */
  function KemiSitemap_deactivate(){
    deactivate_plugins( plugin_basename( __FILE__ ) );
  }
  add_action( 'admin_init', 'KemiSitemap_deactivate');

  /**
  * Display notice after deactivation.
  *
  * @since 1.0.0
  */
  function KemiSitemap_notice(){
    echo '<div class="notice notice-warning"><p>' . __( 'Please deactivate Kemi Sitemap before activting Kemi Sitemap.', 'KemiSitemap' ) . '</p></div>';

    if( isset( $_GET['activate'] ) ) {
      unset( $_GET['activate'] );
    }
  }
  add_action( 'admin_notices', 'KemiSitemap_notice' );
} else{

  /**
  * Main KemiCreative class.
  *
  * @since 1.0.0
  *
  * @package KemiSitemap
  */
  final class KemiSitemap {

    /**
		 * One is the loneliest number that you'll ever do.
		 *
		 * @since 1.0.0
		 *
		 * @var object
		 */
		private static $instance;

    /**
		 * Plugin version for enqueueing, etc.
		 *
		 * @since 1.0.0
		 *
		 * @var string
		 */
		public $version = '1.0.0';

    /**
		 * The Sitemap data handler instance.
		 *
		 * @since 1.0.0
		 *
		 * @var object kcs_Sitemap_Handler
		 */
		public $sitemap;

    /**
    * Main KemiSitemap Instance
    *
    * Insures that only one instance of KemiSitemap exists in memory at any one time. Also prevents needing to define globals all over the place.
    *
    * @since 1.0.0
    *
    * @return KemiSitemap
    */
    public static function instance() {
      if( ! isset( self::$instance ) && ! ( self::$instance instanceof KemiSitemap ) ){

        self::$instance = new KemiSitemap;
        self::$instance->constants();
        self::$instance->includes();
      }
    }

    /**
    * Setup plugin constants.
    *
    * @since 1.0.0
    */
    private function constants() {

      // Plugin version
      if ( ! defined( 'KEMISITEMAP_VERSION' ) ){
        define( 'KEMISITEMAP_VERSION', $this->version );
      }
      // Plugin Folder Path.
			if ( ! defined( 'KEMISITEMAP_PLUGIN_DIR' ) ) {
				define( 'KEMISITEMAP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
			}

			// Plugin Folder URL.
			if ( ! defined( 'KEMISITEMAP_PLUGIN_URL' ) ) {
				define( 'KEMISITEMAP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
			}

			// Plugin Root File.
			if ( ! defined( 'KEMISITEMAP_PLUGIN_FILE' ) ) {
				define( 'KEMISITEMAP_PLUGIN_FILE', __FILE__ );
			}

    }
    /**
		 * Include files.
		 *
		 * @since 1.0.0
		 */
		private function includes() {
      if ( is_admin() ) {
        require_once KEMISITEMAP_PLUGIN_DIR . 'admin/admin-page.php';
      }
    }

  }
  /**
	 * The function which returns the one KemiSitemap instance.
	 *
	 * @since 1.0.0
	 * @return object
	 */
	function kemisitemap() {

		return KemiSitemap::instance();
	}
	kemisitemap();
}
