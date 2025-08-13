<?php
namespace SmcoThriftMods\gravityforms;

/**
 * Force a server-side product equal to a custom total so GF validation passes.
 *
 * @param array $product_info Product info GF built from the submitted form.
 * @param array $form         The form object.
 * @param array $entry        The partial entry (may be empty at this point).
 * @return array
 */
function generate_server_side_product( $product_info, $form, $entry ) {
  // Pull raw numeric total from a hidden Number field (ID 22 here).
  $raw = rgar( $_POST, 'input_22' );
  $amount = floatval( preg_replace( '/[^\d.\-]/', '', (string) $raw ) );

  if ( $amount > 0 ) {
    // Inject a 1-qty product so server-side total matches your UI total.
    $product_info['products'][ 'custom_total' ] = array(
      'name'     => 'Services Total',
      'price'    => $amount,
      'quantity' => 1,
      'options'  => array(),
    );
  }

  return $product_info;
}
add_filter( 'gform_product_info_8', __NAMESPACE__ . '\\generate_server_side_product' , 10, 3 );
