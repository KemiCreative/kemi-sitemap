<?php

final class KemiSitemap_Viewing_Window{

  /**
   * Holds the values to be used in the fields callbacks
   */
  private $options;

  /**
   * Holds the values to be used in the shortcode output
   */
  private $output;

  /**
   *
   */
  private $args;

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
   * Start up
   */
  public function __construct() {

    // add_action('admin_init', array( $this, '') );
    // add_action('admin_init', array( $this, 'KemiSitemap_args_setup') );
    // add_shortcode('shortcode', array( $this, '') );

    return $this -> KemiSitemap_args_setup();

  }

  public function KemiSitemap_args_setup() {
    $this->options = get_option( 'KemiSitemap_options' );

    return '<pre>'. print_r($this->options, false) . '</pre>';

    if(KemiSitemap_is_admin_page()){
      $args = array(
        $title = '<h1>Sitemap Page</h1>',
        $paragraph = '<p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br/>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br />Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem …</p>',

      );
    } else {
      $args = array(
        $title = false,
        $paragraph = false,

      );
    }
  }

  public function KemiSitemap_template() {
    $this->output .= '<div id="kemi-sitemap">';
    $this->output .= '';
    $this->output .= '</div>';




    $this->output .= '';
  }

}
?>
