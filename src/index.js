import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
var Virastar = require('virastar');
var virastar = new Virastar();

registerPlugin('wpp-virastar', {
	render() {
		const { createWarningNotice, createSuccessNotice } = useDispatch(noticesStore);
		const handleVirastar = (e) => {
			const WppOptions = parseWPLocalizedOptions()
			e.target.classList.add('disabled')

			let title = wp.data.select('core/editor').getEditedPostAttribute('title');
			let excerpt = wp.data.select('core/editor').getEditedPostAttribute('excerpt');

			wp.data.dispatch('core/editor').editPost({ title: virastar.cleanup(title, WppOptions) });
			wp.data.dispatch('core/editor').editPost({ excerpt: virastar.cleanup(excerpt, WppOptions) });

			const blocks = wp.data.select('core/block-editor').getBlocks();

			blocks.forEach(wppVirastarReviewBlock)

			virastarSuccess();

			e.target.classList.remove('disabled')
		};
		const virastarError = () => (
			createWarningNotice(__('Virastar reviewed content successfully!'), {
				type: 'snackbar',
				icon: '😵‍💫',
			})
		);
		const virastarSuccess = () => (
			createSuccessNotice(__('Virastar reviewed content successfully!'), {
				type: 'snackbar',
				icon: '😍',
			})
		);
		return (
			<PluginDocumentSettingPanel
				title={__('✍️ Parsi Virastar', 'wp-parsidate')}
				className="wpp-virastar-panel"
				initialOpen="true"
			>
				<Button variant="primary" className="wpp-run-virastar" onClick={handleVirastar}>
					{__('Run Virastar', 'wp-parsidate')}
				</Button>
			</PluginDocumentSettingPanel>
		);
	}
});

const wppVirastarReviewBlock = (block) => {
	const WppOptions = parseWPLocalizedOptions()

	if (!!block.attributes.content && !!block.attributes.content.length) {
		wp.data.dispatch('core/block-editor').updateBlockAttributes(block.clientId, {
			content: virastar.cleanup(block.attributes.content, WppOptions)
		});
	}

	if (!!block.innerBlocks.length) {
		let innerBlocks = block.innerBlocks
		innerBlocks.forEach(wppVirastarReviewBlock)
	}
};

function parseWPLocalizedOptions() {
	if (WPPVirastarOptions === "undefined") {
		return {}
	} else {
		let parsedArr = {};
		let injectedOptions = Object.keys(WPPVirastarOptions)
		injectedOptions.forEach((item, index) => parsedArr[item] = !!+WPPVirastarOptions[item]);

		return parsedArr;
	}
}