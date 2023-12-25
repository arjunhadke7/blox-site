import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { columns, rows } = attributes;

	return (
		<>
			<div
				{ ...useBlockProps.save( {
					className: `mobile-flex max-w-4xl mx-auto my-12 bg-white grid border-2 border-slate-700/40 wb-grid-cols-${ columns } wb-grid-rows-${ rows } gap-4`,
				} ) }
			>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
