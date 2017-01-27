let Actions = require("./actions.js").default;

let ui = `group {
  orientation: 'column',
  alignment: ['fill','top'],
  alignChildren: ['left','top'],
  spacing: 5,
  margins: [0, 0, 0, 0],
  exportId: Button { text: 'Export material id', preferredSize: [200, 23], alignment: ['fill','top'] },
  exportIdWithInfo: Button { text: 'Export material id with info', preferredSize: [200, 23], alignment: ['fill','top'] },
  addCredit: Panel {
    orientation: 'column',
    alignment: ['fill','top'],
    alignChildren: ['left','top'],
    spacing: 5,
    margins: [8, 12, 8, 12],
    text: 'Add Credit',
    format: EditText { text: '%title%\\\\n%url%\\\\n', preferredSize: [200, 23], alignment: ['fill','top'], helpTip: 'credit format' },
    execAdd: Button { text: 'Add credit text layer', preferredSize: [200, 23], alignment: ['fill','top'] }
  }
}`;

NMR.w = (NMR.panel instanceof Panel) ? NMR.panel : new Window("palette", "NicoMaterialRetriever", undefined, { resizeable: true }); // NOTE: use global variable
let w = NMR.w;
w.margins = [10, 10, 10, 10];
w.g = w.add(ui);

w.onResizing = w.onResize = function() { this.layout.resize(); };
w.g.exportId.onClick = () => alert(Actions.exportMaterialIds());
w.g.exportIdWithInfo.onClick = () => alert(Actions.exportMaterialIdsWithInfo());
w.g.addCredit.execAdd.onClick = () => alert(Actions.createCredit(w.g.addCredit.format.text.replace(/\\n/g, "\n")));

if (w instanceof Window) {
  w.show();
} else {
  w.layout.layout(true)
  w.layout.resize();
}

//alert(Actions.createCredit("%title%\n%url%\n%user%\n%id%\n\n"));
