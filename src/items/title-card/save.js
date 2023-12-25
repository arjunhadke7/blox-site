import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title } = attributes;

	return (
		<>
			<div
				{...useBlockProps.save({
					className: ``,
				})}
			>
				<div class="group cursor-default">
					<RichText.Content
						className="w-full max-w-full mx-auto md:p-4 py-4 md:mx-3 my-4 shadow-xl rounded-sm text-xl text-center text-gray-800 group-hover:text-gray-700/90 leading-loose tracking-wide"
						value={title}
						tagName="p"
					/>
				</div>
			</div>
		</>
	);
}
