import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls
} from '@wordpress/block-editor';
import {
	withNotices,
	Spinner,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	RangeControl
} from '@wordpress/components';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useEffect, useState } from '@wordpress/element';

import './editor.scss';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { title, subtitle, bio, alt, url, id, imageHeight,imageHeightTablet, imageHeightDesktop } = attributes;
	const [blobURL, setBlobURL] = useState();



	const onChangeImageHeight = ( newImageHeight ) => {
		setAttributes( { imageHeight: newImageHeight } );
	};
	const onChangeImageHeightTablet = ( newImageHeightTablet ) => {
		setAttributes( { imageHeightTablet: newImageHeightTablet } );
	};
	const onChangeImageHeightDesktop = ( newImageHeightDesktop ) => {
		setAttributes( { imageHeightDesktop: newImageHeightDesktop } );
	};

	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};

	const onChangeSubtitle = (newSubtitle) => {
		setAttributes({ subtitle: newSubtitle });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

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

	return (
		<>
			{ /* Image settings */}

			<InspectorControls>
				<PanelBody title="Image Settings">
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

				<PanelBody title='Image Height'>
					<RangeControl
						label="Phone Screen"
						min={ 1 }
						max={ 10 }
						defaultValue={ 4 }
						onChange={ onChangeImageHeight }
						value={ imageHeight }
					/>
					<RangeControl
						label="Tablet Screen"
						min={ 1 }
						max={ 10 }
						defaultValue={ 4 }
						onChange={ onChangeImageHeightTablet }
						value={ imageHeightTablet }
					/>
					<RangeControl
						label="Desktop Screen"
						min={ 1 }
						max={ 10 }
						defaultValue={ 4 }
						onChange={ onChangeImageHeightDesktop }
						value={ imageHeightDesktop }
					/>
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

			{ /* End of Image settings */}

			<div {...useBlockProps()}>
				<div className="p-6 relative border-2 border-slate-200">
					{url && (
						// Outer most div, image div
						<div
							className={` ${isBlobURL(url) ? ' is-loading' : ''
								} `}
						>
							<img src={url} alt={alt} className="" />
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
					<RichText
						className="text-5xl font-[600] sm:text-5xl lg:text-7xl mb-1"
						placeholder="Title"
						tagName="h1"
						value={title}
						onChange={onChangeTitle}
						allowedFormats={['core/italic']}
					/>
					<RichText
						className="block font-[300] text-2xl sm:text-2xl lg:text-2xl mb-3"
						placeholder="Subtitle"
						tagName="span"
						value={subtitle}
						onChange={onChangeSubtitle}
						allowedFormats={['core/italic', 'core/bold']}
					/>
					<RichText
						className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed pb-4"
						placeholder="Bio"
						tagName="p"
						value={bio}
						onChange={onChangeBio}
						allowedFormats={['core/italic', 'core/bold']}
					/>
				</div>
			</div>
		</>
	);
}

export default withNotices(Edit);
