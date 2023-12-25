import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, subtitle, bio, alt, url, id, imageHeight,imageHeightTablet, imageHeightDesktop } = attributes;

	return (
		<div {...useBlockProps.save({ className: 'relative' })}>
			<div className={`has-${imageHeight}-height has-${imageHeightTablet}-heightTablet has-${imageHeightDesktop}-heightDesktop`}>
				{url && (
					<img
						src={url}
						alt={alt}
						className={
							id
								? `wp-image-${id} object-cover md:object-cover w-full has-${imageHeight}-height has-${imageHeightTablet}-height has-${imageHeightDesktop}-height`
								: null
						}
					/>
				)}
			</div>

			<div className="not-prose overlay-gradient absolute inset-0 bg-transparent sm:bg-gradient-to-r sm:from-black/95 sm:to-black/25 bg-gradient-to-t from-black/70 via-black/50 to-black/20">
				{/* top-auto */}
				<div className="text-posng absolute h-auto  max-w-screen-xl px-4 sm:px-6 box-content">
					<div className="max-w-xl text-formatting">
						<RichText.Content
							className="text-5xl font-[600] sm:text-5xl lg:text-7xl mb-1 text-white"
							value={title}
							tagName="h1"
						/>
						<RichText.Content
							className="block text-left font-[300] text-white text-2xl sm:text-2xl lg:text-2xl mb-3"
							value={subtitle}
							tagName="span"
						/>
						<RichText.Content
							className="ml-0 text-left pl-0 mt-4 max-w-lg text-md sm:leading-relaxed text-white pb-4"
							value={bio}
							tagName="p"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
