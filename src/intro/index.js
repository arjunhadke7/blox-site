import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	supports: {
		// disable edit as html option
		html: false,
		// make sure that the block is not possible to make reusable again or to create a new pattern
		// reusable: false,
		block: true,
		recover: true,
	},
	attributes: {
		title: {
			type: 'string',
			selector: 'h1',
			source: 'html',
		},
		subtitle: {
			type: 'string',
			selector: 'span',
			source: 'html',
		},
		bio: {
			type: 'string',
			selector: 'p',
			source: 'html',
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		imageHeight: {
			type: 'number',
			default: 4,
		},
		imageHeightTablet: {
			type: 'number',
			default: 4,
		},
		imageHeightDesktop: {
			type: 'number',
			default: 4,
		},
	},
	edit: Edit,

	save,
});
