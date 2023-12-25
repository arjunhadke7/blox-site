import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;
	const onChangeColumns = ( newColumns ) => {
		setAttributes( { columns: newColumns } );
	};

	return (
		<div
			{ ...useBlockProps( {
				className: `has-${ columns }-columns items-box p-8 border-2 border-gray-700`,
			} ) }
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label="Columns"
						min={ 1 }
						max={ 4 }
						defaultValue={ 3 }
						onChange={ onChangeColumns }
						value={ columns }
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ [ 'create-block/item-single', 'create-block/title-card'  ] }
				orientation={ 'horizontal' }
			/>
		</div>
	);
}
