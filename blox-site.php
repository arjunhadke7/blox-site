<?php
/**
 * Plugin Name:       Blox Site
 * Description:       Common Blocks for the site. Main blocks for most of the sections. Site view related blocks in separate plugins.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Arjun Hadke
 * Author URI:		  www.arjunhadke.in
 * Text Domain:       blox-site
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function blox_site_blox_site_block_init() {
	// CTA Block
	register_block_type( __DIR__ . '/build/cta' );
	register_block_type( __DIR__ . '/build/cta/cta-button' );
	register_block_type( __DIR__ . '/build/cta/cta-button-icon' );
	register_block_type( __DIR__ . '/build/cta/cta-link' );
	// Features block
	register_block_type( __DIR__ . '/build/features' );
	register_block_type( __DIR__ . '/build/features/feature-grid-item' );
	// Intro block
	register_block_type( __DIR__ . '/build/intro' );
	// Items block
	register_block_type( __DIR__ . '/build/items' );
	register_block_type( __DIR__ . '/build/items/item-single' );
	register_block_type( __DIR__ . '/build/items/title-card' );
}
add_action( 'init', 'blox_site_blox_site_block_init' );
