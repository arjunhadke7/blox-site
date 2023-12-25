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
	parent: [ 'create-block/cta-block' ],
	attributes: {
		linkText: {
			type: 'string',
			default: 'Learn More',
		},
	},
	edit: Edit,

	save,
} );
