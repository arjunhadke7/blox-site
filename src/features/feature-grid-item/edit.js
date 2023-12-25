import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { colSpan, rowSpan } = attributes;
	const onChangeColSpan = ( newColSpan ) => {
		setAttributes( { colSpan: newColSpan } );
	};
	const onChangeRowSpan = ( newRowSpan ) => {
		setAttributes( { rowSpan: newRowSpan } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label="Column Span"
						min={ 1 }
						max={ 6 }
						defaultValue={ 2 }
						onChange={ onChangeColSpan }
						value={ colSpan }
					/>
				</PanelBody>
				<PanelBody>
					<RangeControl
						label="Row Span"
						min={ 1 }
						max={ 6 }
						defaultValue={ 2 }
						onChange={ onChangeRowSpan }
						value={ rowSpan }
					/>
				</PanelBody>
			</InspectorControls>

			<div
				{ ...useBlockProps( {
					className: `border-2 border-slate-700/80 text-black wb-col-span-${ colSpan } wb-row-span-${ rowSpan } rounded-md`,
				} ) }
			>
				<div class="flex items-center mb-2">
					<img
						src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Customer 1"
						class="w-12 h-12 rounded-full"
					/>
					<h2 class="ml-4">Customer 2</h2>
				</div>
				<p class="text-lg text-black mt-2">"Quote from Customer 1."</p>
			</div>
		</>
	);
}