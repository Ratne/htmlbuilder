import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grid-plugin',(editor, config) => {
  const bm = editor.BlockManager;
  bm.getAll().reset();

  // Layouts
  const stylePrefix = 'gjs-';
  const flexGrid = 1;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const styleRow = flexGrid ? `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }` : `
    .${clsRow} {
      display: table;
      padding: 10px;
      width: 100%;
    }
    @media (max-width: 768px) {
      .${stylePrefix}cell, .${stylePrefix}cell30, .${stylePrefix}cell70 {
        width: 100%;
        display: block;
      }
    }`;

  const styleClm =
  `.${clsCell} {
      width: 8%;
      display: table-cell;
      height: 75px;
    }`;

  const minDim = 1;
  const resizerBtm = { tl: 0, tc: 0, tr: 0, cl: 0, cr: 0, bl: 0, br: 0, minDim };

  const rowAttr = {
    'class': clsRow,
    'data-gjs-droppable': `.${clsCell}`,
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': 'Row',
  };

  const colAttr = {
    'class': clsCell,
    'data-gjs-draggable': `.${clsRow}`,
    // 'data-gjs-resizable': false,
    'data-gjs-name': 'Cell',
  };


  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`];
  editor.on('selector:add', selector =>
    privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1));

  const attrsToString = attrs => {
    const result = [];
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        let value = attrs[key];
        const toParse = value instanceof Array || value instanceof Object;
        value = toParse ? JSON.stringify(value) : value;
        result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`);
      }
    }
    return result.length ? ` ${result.join(' ')}` : '';
  };

  // const toAdd = name => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z"/></svg>'

  bm.add('column1', {
    label: '1 Section',
    category: 'Layout',
    attributes: {class: 'gjs-fonts'},
    media: icon,
    content:
    `<div ${attrsRow}>
      <div ${attrsCell}></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  bm.add('column2', {
    label: '2 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content: `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 50%' : 'width: 50%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 50%' : 'width: 50%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  bm.add('column3', {
    label: '3 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content: `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 33.33%' : 'width: 33.33%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 33.33%' : 'width: 33.33%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 33.33%' : 'width: 33.33%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  bm.add('column4', {
    label: '4 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content: `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width: 25%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width: 25%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width: 25%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width: 25%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  bm.add('column8-4', {
    label: '8-4 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content:
      `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 33.33%' : 'width: 33.33%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 66.66%' : 'width: 66.66%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  bm.add('column4-8', {
    label: '4-8 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content:
      `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 66.66%' : 'width: 66.66%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 33.33%' : 'width: 33.33%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  bm.add('column3-9', {
    label: '3-9 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content:
      `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width: 25%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 75%' : 'width: 75%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });

  bm.add('column9-3', {
    label: '9-3 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content:
      `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 75%' : 'width: 75%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width: 25%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });
  bm.add('column3-6-3', {
    label: '3-6-3 Section',
    category: 'Layout',
    media: icon,
    attributes: {class: 'gjs-fonts'},
    content:
      `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width_ 25%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 50%' : 'width: 50%'};"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex: 0 0 25%' : 'width: 25%'};"></div>
      </div>
      <style>
        ${styleRow}
        ${styleClm}
      </style>`
  });
});