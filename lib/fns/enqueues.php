<?php

namespace SmcoThriftMods\enqueues;

/**
 * Enqueues plugin CSS
 */
function enqueue_scripts(){
  $css_dir = ( stristr( site_url(), '.local' ) || SCRIPT_DEBUG )? 'css' : 'dist' ;
  wp_register_style( 'smcothrift-mods', plugin_dir_url( __FILE__ ) . '../' . $css_dir  . '/main.css', null, filemtime( plugin_dir_path( __FILE__ ) . '../'. $css_dir .'/main.css' ) );

  wp_register_script( 'thrifttrac-pricing', plugin_dir_url( __FILE__ ) . '../js/pricing.thrifttrac.js', ['jquery'], filemtime( plugin_dir_path( __FILE__ ) . '../js/pricing.thrifttrac.js'), true );
  wp_register_script( 'thriftpoints-pricing', plugin_dir_url( __FILE__ ) . '../js/pricing.thriftpoints.js', ['jquery'], filemtime( plugin_dir_path( __FILE__ ) . '../js/pricing.thriftpoints.js'), true );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts', 99999999 );

/**
 * Removes WordPress Emoji.
 */
function remove_wp_emoji(){
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('wp_print_styles', 'print_emoji_styles');

  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
}
add_action( 'init', __NAMESPACE__ . '\\remove_wp_emoji' );
