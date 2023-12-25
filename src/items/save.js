import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { columns } = attributes;
	return (
		<div
			{ ...useBlockProps.save( {
				className: `has-${ columns }-columns items-box p-2`,
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
