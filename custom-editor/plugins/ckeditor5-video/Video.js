import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageVideo from './icons/iconmonstr-video-2.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class Video extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'video', locale => {
            const view = new ButtonView( locale );
            view.set({
                label: 'Tải lên video',
                icon: ImageVideo,
                tooltip: true
            });

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                window.dispatchEvent(new Event('uploadVideo'));                
            } );

            return view;
        } );
    }
}
