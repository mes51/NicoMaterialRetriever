// patch for ExtendScript

function bind(thisObj) {
  $.global.NMR = { panel: thisObj };
}
bind(this);
