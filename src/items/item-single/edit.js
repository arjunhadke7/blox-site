import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
} from '@wordpress/components';
import './editor.scss';

import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { title, linkText, alt, url, id } = attributes;
	const [blobURL, setBlobURL] = useState();

	// Title and links related functions
	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};
	const onChangeLink = (newLinkText) => {
		setAttributes({ linkText: newLinkText });
	};

	// For changing the size of image
	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select('core');
			return id ? getMedia(id) : null;
		},
		[id]
	);

	const imageSizes = useSelect((select) => {
		return select(blockEditorStore).getSettings().imageSizes;
	}, []);

	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find((s) => s.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}
		return options;
	};
	// End of the code for changing the image size

	// Image related functions

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: '' });
			return;
		}
		setAttributes({ url: image.url, id: image.id, alt: image.alt });
	};
	const onSelectURL = (newURL) => {
		setAttributes({ url: newURL, id: undefined, alt: '' });
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	const removeImage = () => {
		setAttributes({
			url: undefined,
			alt: '',
			id: undefined,
		});
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ alt: newAlt });
	};

	const onChangeImageSize = (newURL) => {
		setAttributes({ url: newURL });
	};

	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({
				url: undefined,
				alt: '',
			});
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [url]);
	// End of Image related functions

	return (
		<>
			{ /* Image settings */}
			<InspectorControls>
				<PanelBody title="Image Settings">
					{id && (
						<SelectControl
							label={__('Image Size', 'team-members')}
							options={getImageSizeOptions()}
							value={url}
							onChange={onChangeImageSize}
						/>
					)}
					{url && !isBlobURL(url) && (
						<TextareaControl
							label="Alt text"
							value={alt}
							onChange={onChangeAlt}
							help={
								'Alt text is good to explain search engines and for people who can not read it'
							}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={['image']}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={removeImage}>
						Remove Image
					</ToolbarButton>
				</BlockControls>
			)}
			{ /* End of Image Settings */}
			<div
				{...useBlockProps({
					className: ` item-inner-box group mx-auto p-4 rounded-lg`,
				})}
			>
				<div className="h-[350px] bg-white p-6 rounded-lg shadow-md relative flex justify-end border-2 border-slate-300 overflow-hidden bg-gradient-to-r from-slate-200/60 to-slate-50/30">
					<div className="absolute bottom-0 left-0 z-10 transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:translate-x-2">
						<div class="ml-4 flex flex-col justify-end left-section-item-single">
							<RichText
								className=" item-single-title text-lg font-semibold mb-2 hover:text-2xl duration-300 ease-in-out"
								placeholder="Title"
								tagName="h2"
								value={title}
								onChange={onChangeTitle}
								allowedFormats={['core/italic', 'core/bold']}
							/>
							<RichText
								placeholder="Link text"
								tagName="a"
								value={linkText}
								onChange={onChangeLink}
							/>
						</div>
					</div>
					<div className="absolute inset-y-0 overflow-hidden translate-x-12 transition-transform group-hover:translate-x-0 group-hover:scale-110 z-0">
						{url && (
							<div
								className={`${isBlobURL(url) ? ' is-loading' : ''
									}`}
							>
								<img
									src={url}
									alt={alt}
									className={
										id
											? `wp-image-${id} transition duration-500 w-full h-full object-cover rounded-none group-hover:opacity-60`
											: null
									}
								/>
								{isBlobURL(url) && <Spinner />}
							</div>
						)}

						<MediaPlaceholder
							onSelect={onSelectImage}
							onSelectURL={onSelectURL}
							onError={onUploadError}
							accept="image/*"
							allowedTypes={['image']}
							disableMediaButtons={url}
							notices={noticeUI}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default withNotices(Edit);
