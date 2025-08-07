<?php

namespace ThriftTrac\shortcodes;

/**
 * Render the ThriftTrac pricing form shortcode.
 *
 * This shortcode loads a static HTML file and injects a Gravity Form into it.
 * It also enqueues associated styles and scripts, and passes localized variables to JS.
 *
 * @since 1.3.0
 *
 * @param array $atts {
 *     Array of shortcode attributes.
 *
 *     @type int    $gravityform                    The ID of the Gravity Form to embed.
 *     @type int    $gf_form_price_display_field_id The field ID used to display pricing in the form.
 * }
 * @return string HTML output for the pricing form or an error message.
 */
function thrifttrac_pricing_form( $atts ){
  $args = shortcode_atts([
    'gravityform'                    => null,
    'gf_form_price_display_field_id' => null,
    ''
  ], $atts);

  $file = dirname( __FILE__ ) . '/../html/pricing.thrifttrac.html';
  $html = ( file_exists( $file ) )? file_get_contents( $file ) : '<p class="alert"><strong>ERROR:</strong> I could not find <code>' . basename( $file ) . '</code>.</p>' ;

  if( is_numeric( $args['gravityform'] ) ){
    $form = gravity_form( $args['gravityform'], false, false, false, null, true, 99, false );
    $html = str_replace( '{{form}}', $form, $html );
  }

  wp_enqueue_style( 'smcothrift-mods' );
  wp_enqueue_script( 'thrifttrac-pricing' );
  wp_localize_script( 'thrifttrac-pricing', 'wpvars', [
    'formId'          => $args['gravityform'],
    'pricingFieldId'  => $args['gf_form_price_display_field_id'],
  ]);

  return $html;
}
add_shortcode( 'thrifttrac_pricing', __NAMESPACE__ . '\\thrifttrac_pricing_form' );