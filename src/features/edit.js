import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { columns, rows } = attributes;

	const onChangeColumns = ( newCols ) => {
		setAttributes( { columns: newCols } );
	};

	const onChangeRows = ( newRows ) => {
		setAttributes( { rows: newRows } );
	};

	useEffect( () => {
		const elementsWithDataAttribute = document.querySelectorAll(
			'[data-type="create-block/features"]'
		);

		if ( elementsWithDataAttribute.length > 0 ) {
			// Loop through each element
			elementsWithDataAttribute.forEach( ( element, index ) => {
				// Apply dynamic styles to the element by targeting its ID and classes
				const dynamicStyles = {
					gridTemplateColumns: `repeat(${ columns }, minmax(0, 1fr))`,
					gridTemplateRows: `repeat(${ rows }, minmax(0, 1fr))`,
				};

				// Target the element using its ID and the desired classes
				const targetSelector = `#${ element.id } .block-editor-inner-blocks .block-editor-block-list__layout`;

				// Get the target element
				const targetElement = document.querySelector( targetSelector );

				// Apply styles to the target element
				if ( targetElement ) {
					Object.assign( targetElement.style, dynamicStyles );
				}
			} );
		} else {
			console.log( 'No elements with data-type attribute found' );
		}
	}, [ columns, rows ] );

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label="Grid Columns"
						min={ 0 }
						max={ 8 }
						defaultValue={ 4 }
						onChange={ onChangeColumns }
						value={ columns }
					/>
				</PanelBody>
				<PanelBody>
					<RangeControl
						label="Grid Rows"
						min={ 0 }
						max={ 8 }
						defaultValue={ 4 }
						onChange={ onChangeRows }
						value={ rows }
					/>
				</PanelBody>
			</InspectorControls>

			<div className="max-w-4xl mx-auto bg-white">
				<div className="text-sm text-emerald-700/80">
					Add a block here (this text will not be shown)
				</div>
				<div className="text-sm text-emerald-700/80">
					{ /* Show the number of columns and rows here */ }
					<p>Columns: { columns }</p>
					<p>Rows: { rows }</p>
				</div>
			</div>
			<div
				// class 'grid' has been removed from the following line to avoid issues in the block editor
				{ ...useBlockProps( {
					className: `mobile-flex max-w-4xl my-12 mx-auto bg-white border-2 border-slate-700/40 gap-4 wb-grid-cols-${ columns } wb-grid-rows-${ rows }`,
				} ) }
			>
				<InnerBlocks
					allowedBlocks={ [ 'create-block/feature-grid-item' ] }
				/>
			</div>
		</>
	);
}
