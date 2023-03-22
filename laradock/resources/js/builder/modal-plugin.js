import grapesjs from 'grapesjs';
import ModalPlugin from './classes/modal-plugin';

//TODO: Refactoring and improve with Business Logic
export default grapesjs.plugins.add('modal-plugin', (editor, options) => new ModalPlugin(editor,options))