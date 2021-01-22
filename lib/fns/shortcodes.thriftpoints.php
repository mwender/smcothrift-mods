<?php

namespace ThriftPoints\shortcodes;

function pricing_form( $atts ){
  $args = shortcode_atts([
    'gravityform'                    => null,
    'gf_form_price_display_field_id' => null,
    ''
  ], $atts);

  $file = dirname( __FILE__ ) . '/../html/pricing.thriftpoints.html';
  $html = ( file_exists( $file ) )? file_get_contents( $file ) : '<p class="alert"><strong>ERROR:</strong> I could not find <code>' . basename( $file ) . '</code>.</p>' ;

  if( is_numeric( $args['gravityform'] ) ){
    $form = gravity_form( $args['gravityform'], false, false, false, null, true, 99, false );
    $html = str_replace( '{{form}}', $form, $html );
  }

//  gravity_form_enqueue_scripts( $args['gravityform'], true );
  wp_enqueue_style( 'smcothrift-mods' );
  wp_enqueue_script( 'thriftpoints-pricing' );
  wp_localize_script( 'thriftpoints-pricing', 'wpvars', [
    'formId'          => $args['gravityform'],
    'pricingFieldId'  => $args['gf_form_price_display_field_id'],
  ]);

  return $html;
}
add_shortcode( 'thriftpoints_pricing', __NAMESPACE__ . '\\pricing_form' );