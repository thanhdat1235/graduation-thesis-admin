import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImagePicture from './icons/iconmonstr-picture-thin.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class Image extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'image', locale => {
            const view = new ButtonView( locale );
            view.set({
                label: 'Tải lên hình ảnh',
                icon: ImagePicture,
                tooltip: true
            });

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                window.dispatchEvent(new Event('uploadImage'));                
            } );

            return view;
        } );
    }
}
