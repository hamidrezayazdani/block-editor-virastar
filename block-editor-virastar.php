<?php
/**
 * Plugin Name:       Block Editor Parsi Virastar
 * Description:       Parsi Virastar helps to write Persian a little more correctly.
 * Requires at least: 5.5
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            HamidReza Yazdani
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       parsi-virastar
 *
 * @package           parsi-virastar
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function ywp_create_parsi_virastar_block() {
	register_block_type(
		__DIR__ . '/build',
	);
}

add_action( 'init', 'ywp_create_parsi_virastar_block' );

/**
 * Enqueue Parsi Virastar assets to block editor admin area
 *
 * @since 0.1.0
 */
function ywp_enqueue_virastar_assets() {
	$suffix          = defined( 'SCRIPT_DEBUG' ) ? '' : '.min';
	$default_options = ywp_init_parsi_virastar_options();
	$options         = apply_filters( 'wpp_virastar_options', $default_options );

	wp_enqueue_style( 'wpp_virastar', plugin_dir_url( __FILE__ ) . "src/virastar$suffix.css", array( 'wp-edit-blocks' ), '0.1.0' );
	wp_enqueue_script( 'wpp_virastar_core', plugin_dir_url( __FILE__ ) . "src/virastar$suffix.js", array(), '0.1.0', true );
	wp_localize_script( 'wpp_virastar_core', 'WPPVirastarOptions', $options );
}

add_action( 'enqueue_block_editor_assets', 'ywp_enqueue_virastar_assets' );

function ywp_init_parsi_virastar_options( $args = array() ) {
	$defaults = array(
		'cleanup_begin_and_end'                          => true,
		'cleanup_extra_marks'                            => true,
		'cleanup_kashidas'                               => true,
		'cleanup_line_breaks'                            => true,
		'cleanup_rlm'                                    => true,
		'cleanup_spacing'                                => true,
		'cleanup_zwnj'                                   => true,
		'decode_html_entities'                           => true,
		'wpp_fix_arabic_numbers'                         => true,
		'fix_dashes'                                     => true,
		'fix_diacritics'                                 => true,
		'fix_english_numbers'                            => true,
		'fix_english_quotes_pairs'                       => true,
		'fix_english_quotes'                             => true,
		'fix_hamzeh'                                     => true,
		'fix_hamzeh_arabic'                              => false,
		'fix_misc_non_persian_chars'                     => true,
		'fix_misc_spacing'                               => true,
		'fix_numeral_symbols'                            => true,
		'fix_prefix_spacing'                             => true,
		'fix_persian_glyphs'                             => true,
		'fix_punctuations'                               => true,
		'fix_question_mark'                              => true,
		'fix_spacing_for_braces_and_quotes'              => true,
		'fix_spacing_for_punctuations'                   => true,
		'fix_suffix_misc'                                => true,
		'fix_suffix_spacing'                             => true,
		'fix_three_dots'                                 => true,
		'kashidas_as_parenthetic'                        => true,
		'markdown_normalize_braces'                      => true,
		'markdown_normalize_lists'                       => true,
		'normalize_dates'                                => true,
		'normalize_ellipsis'                             => true,
		'normalize_eol'                                  => true,
		'preserve_braces'                                => false,
		'preserve_brackets'                              => false,
		'preserve_comments'                              => true,
		'preserve_entities'                              => true,
		'preserve_frontmatter'                           => true,
		'preserve_HTML'                                  => true,
		'preserve_nbsp'                                  => true,
		'preserve_URIs'                                  => true,
		'remove_diacritics'                              => false,
		'skip_markdown_ordered_lists_numbers_conversion' => false
	);

	return wp_parse_args( $args, $defaults );
}