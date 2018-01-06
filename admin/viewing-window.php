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
    add_action('admin_init', array( $this, 'KemiSitemap_args_setup') );
    add_shortcode('kemi-sitemap', array( $this, 'KemiSitemap_shortcode') );


  }

  public function KemiSitemap_args_setup() {
    $this->options = get_option( 'KemiSitemap_options' );

    // return '<pre>'. print_r($this->options, false) . '</pre>';

    if($this->KemiSitemap_is_admin_page()){
      $this->args = array(
        'title' => '<h1>Sitemap Page</h1>',
        'paragraph' => '<p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br/>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br />Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem …</p>',
        'cpts' => array()
      );
      foreach($this->options as $key => $value){
        if($value['active']){
          array_push($this->args['cpts'], $key);
        }
      }
    } else {
      $this->args = array(
        'title' => false,
        'paragraph' => false,
        'cpts' => array()
      );
    }
  }

  public function KemiSitemap_shortcode() {
    return $this -> KemiSitemap_template();
  }

  public function KemiSitemap_template() {
    // return print_r($this->args, false);
    $this->output .= '<div id="kemi-sitemap">';
    $this->output .= $this->args['title'];
    $this->output .= $this->args['paragraph'];

    foreach($this->args['cpts'] as $post_type){
      $this->output .= '<div class="kemi-sitemap-pt-block">';
      // $this->output .= $post_type;

      $pt = new WP_Query( array('post_type' => $post_type, 'showposts' => 5) );
      if ( $pt->have_posts() ) {
      	while ( $pt->have_posts() ) { $pt->the_post();
      		$this->output .= '<div>' . get_the_title() . '</div>';
      	}
      	wp_reset_postdata();
      }

      $this->output .= '</div>';
    }

    $this->output .= '';
    $this->output .= '</div>';


    $this->output .= '';
    return $this->output;
  }

}
?>
