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
  public function KemiSitemap_is_admin_page() {
    if( get_current_screen()->base == 'settings_page_'.KEMISITEMAP_SLUG ){
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
        'showposts' => 5,
        'cpts' => array(),
      );
      foreach($this->options as $key => $value){
        if($value['active']){
          //array_push($this->args['cpts'], array($key, 'label' => $value['label']));
          $this->args['cpts'][$key]['label'] = $value['label'];
          if($value['cat']){
            $this->args['cpts'][$key]['cat'] = $value['cat'];
          }
          if($value['ind']){
            $this->args['cpts'][$key]['ind'] = $value['ind'];
          }
          if($value['style']){
            $this->args['cpts'][$key]['style'] = $value['style'];
          }
          if($value['excludes']){
            $this->args['cpts'][$key]['excludes'] = $value['excludes'];
          }
        }
      }
    } else {
      $this->args = array(
        'title' => false,
        'paragraph' => false,
        'showposts' => -1,
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
    print_r($this->args['cpts']);
    foreach($this->args['cpts'] as $key => $post_type){
      $this->output .= '<div class="kemi-sitemap-pt-block">';
      //return $post_type[0];
      $this->output .= '<h3>' . $post_type['label'] . '</h3>';

      $pt = new WP_Query( array('post_type' => $key, 'showposts' => $showpost) );
      if ( $pt->have_posts() ) {
      	while ( $pt->have_posts() ) { $pt->the_post();
      		$this->output .= '<div><a href="'.get_the_permalink().'">' . get_the_title() . '</a></div>';
      	}
      	wp_reset_postdata();
      }

      $this->output .= '</div>';
    }

    $this->output .= '';
    $get_current_screen = get_current_screen();
    $this->output .= '</div>';


    $this->output .= '';
    return $this->output;
  }

}
?>
