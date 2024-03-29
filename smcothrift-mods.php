<?php
/**
 * Plugin Name:     SMCo Thirft Mods
 * Plugin URI:      https://github.com/mwender/smcothrift-mods
 * Description:     Modifications for the SMCo Thrift Elementor-powered site.
 * Author:          Michael Wender
 * Author URI:      https://mwender.com
 * Text Domain:     smcothrift-mods
 * Domain Path:     /languages
 * Version:         1.6.4
 *
 * @package         SmcoThriftMods
 */

// Include required files
require_once( 'lib/fns/enqueues.php' );
require_once( 'lib/fns/shortcodes.smcothrift.php' );
require_once( 'lib/fns/shortcodes.thriftpoints.php' );
require_once( 'lib/fns/shortcodes.thrifttrac.php' );

/**
 * Enhanced error logging
 *
 * @param      string  $message  The message
 */
function uber_log( $message = null ){
  static $counter = 1;

  $bt = debug_backtrace();
  $caller = array_shift( $bt );

  if( 1 == $counter )
    error_log( "\n\n" . str_repeat('-', 25 ) . ' STARTING DEBUG [' . date('h:i:sa', current_time('timestamp') ) . '] ' . str_repeat('-', 25 ) . "\n\n" );
  error_log( $counter . '. ' . basename( $caller['file'] ) . '::' . $caller['line'] . ' ' . $message );
  $counter++;
}
