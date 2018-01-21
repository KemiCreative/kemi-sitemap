<?php

final class KemiSitemap_Viewing_Window
{

  /**
   * Holds the values to be used in the fields callbacks
   */
    private $options;

    /**
     * Holds the values to be used in the shortcode output
     */
    private $output;
    private $block;

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
    public function KemiSitemap_is_admin_page()
    {
        if (get_current_screen()->base == 'settings_page_'.KEMISITEMAP_SLUG) {
            return false;
        }
        return true;
    }

    /**
     * Start up
     */
    public function __construct()
    {

    // add_action('admin_init', array( $this, '') );
        add_action('admin_init', array( $this, 'KemiSitemap_args_setup'));
        add_shortcode('kemi-sitemap', array( $this, 'KemiSitemap_shortcode'));

        add_action('wp_ajax_nopriv_KemiSitemap_template_block_setup', array( $this, 'AJAX_function' ));
        add_action('wp_ajax_KemiSitemap_template_block_setup', array( $this, 'AJAX_function' ));
    }

    public function KemiSitemap_args_setup()
    {
        $this->options = get_option('KemiSitemap_options');

        // return '<pre>'. print_r($this->options, false) . '</pre>';
        if ($this->KemiSitemap_is_admin_page()) {
            $this->args = array(
        'title' => '<h1>Sitemap Page</h1>',
        'paragraph' => '<p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br/>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br />Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem …</p>',
        'showposts' => 5,
        'cpts' => array(),
      );
            foreach ($this->options as $key => $value) {
                if ($value['active']) {
                    //array_push($this->args['cpts'], array($key, 'label' => $value['label']));
                    $this->args['cpts'][$key]['label'] = $value['label'];
                    if ($value['cat']) {
                        $this->args['cpts'][$key]['cat'] = $value['cat'];
                    }
                    if ($value['ind']) {
                        $this->args['cpts'][$key]['ind'] = $value['ind'];
                    }
                    if ($value['style']) {
                        $this->args['cpts'][$key]['style'] = $value['style'];
                    }
                    if ($value['excludes']) {
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

    public function KemiSitemap_shortcode()
    {
        return $this -> KemiSitemap_template();
    }

    public function KemiSitemap_template()
    {
        // return print_r($this->args, false);

        $this->output .= '<div id="kemi-sitemap">';
        $this->output .= $this->args['title'];
        $this->output .= $this->args['paragraph'];
        // print_r($this->args['cpts']);
        foreach ($this->args['cpts'] as $key => $post_type) {
            $this->block .= $this->KemiSitemap_template_block($key, $post_type);
        }
        $this->output .= $this->block;
        $this->output .= $test .'</div>';


        $this->output .= '';
        return $this->output;
    }
    public function KemiSitemap_template_block($key, $post_type, $ajax = false)
    {
        //$output = '';

        // echo '<br>' . print_r($key, 1) . '<br>';
        // echo print_r($post_type, 1) . '<br>';

        $output .= '<div post-type="'.$key.'" class="kemi-sitemap-pt-block">';
        $output .= '<h3>' . $post_type['label'] . '</h3>';

        $pt = new WP_Query(array('post_type' => $key, 'showposts' => 3 /* USED TO BE $showpost */));
        if ($pt->have_posts()) {
            while ($pt->have_posts()) {
                $pt->the_post();
                $output .= '<div><a href="'.get_the_permalink().'">' . get_the_title() . '</a></div>';
            }
            wp_reset_postdata();
        }

        $output .= '</div>';

        if ($ajax) {
            echo $output;
            die();
        } else {
            $this->block .= $output;
        }
    }

    public function testing_only($key, $post_type)
    {
        // echo 'this is michael';
        // echo $key;
        // echo $post_type;
        // print_r($post_type);

        echo $post_type['label'];
        die();
    }

    public function AJAX_function()
    {
        $key = $_POST['key'];
        $post_type = $_POST['post_type'];
        $this->KemiSitemap_template_block($key, $post_type, true);
    }
}
