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
registerBlockType( metadata.name, {
	parent: [ 'create-block/features' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		colSpan: {
			type: 'number',
			default: 2,
		},
		rowSpan: {
			type: 'number',
			default: 2,
		},
	},
	edit: Edit,
	save,
} );
