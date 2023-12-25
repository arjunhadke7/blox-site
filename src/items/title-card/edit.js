import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import './editor.scss';


export default function Edit({ attributes, setAttributes }) {
	const { title } = attributes;

	// Title and links related functions
	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};


	return (
		<>
			<div
				{...useBlockProps({
					className: ``,
				})}
			>
				<div class="group cursor-default">
					<RichText
						className="w-full max-w-full p-4 mx-3 my-4 shadow-xl rounded-sm text-xl text-center text-gray-800 group-hover:text-gray-700/90 leading-loose tracking-wide"
						placeholder="Title"
						tagName="p"
						value={title}
						onChange={onChangeTitle}
						allowedFormats={['core/italic', 'core/bold']}
					/>
				</div>
			</div>
		</>
	);
}