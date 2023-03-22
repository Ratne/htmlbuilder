import grapesjs from 'grapesjs';
import IconListPlugin from './classes/icon-list-plugin';

//TODO: Refactoring and improve with Business Logic
export default grapesjs.plugins.add('icon-list-plugin', (editor, options) => new IconListPlugin(editor,options))