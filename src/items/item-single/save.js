import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, linkText, alt, url, id } = attributes;

	return (
		<>
			<div
				{...useBlockProps.save({
					className: `item-inner-box group mx-auto p-4 rounded-lg cursor-pointer max-w-full`,
				})}
			>
				<div className="not-prose bg-white h-56 p-6 rounded-lg shadow-md relative flex justify-end border-2 border-slate-300 overflow-hidden bg-gradient-to-r from-slate-200/60 to-slate-50/30">
					{ /* Product Details (Title and Learn More button) */}
					<div class="absolute bottom-0 left-0 z-10 transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:translate-x-2">
						<div class="not-prose ml-4 flex flex-col justify-end left-section-item-single">
							<RichText.Content
								className="p-0 not-prose item-single-title text-lg font-semibold mb-2 group-hover:text-2xl duration-300 ease-in-out text-black"
								value={title}
								tagName="h2"
							/>
							<RichText.Content
								className="p-0 not-prose"
								value={linkText}
								tagName="a"
							/>
						</div>
					</div>
					<div className="absolute inset-y-0 overflow-hidden translate-x-12 transition-transform group-hover:translate-x-0 group-hover:scale-110 z-0">
						{url && (
							<img
								src={url}
								alt={alt}
								className={
									id
										? `wp-image-${id} transition duration-500 w-full h-full object-cover rounded-none group-hover:opacity-60`
										: null
								}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
