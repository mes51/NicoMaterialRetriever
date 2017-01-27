let getMaterialInfo = require("./getMaterialInfo.js").default;
let Utils = require("./utils.js").default;

function findMaterials() {
  return _(app.project.items.length + 1).chain()
    .range()
    .drop(1)
    .map((i) => app.project.items[i].name)
    .map((n) => n.match(/(^|_|\s|\/)(sm|im|nc|lv|td|gm)[0-9]+/g) || [])
    .flatten()
    .compact()
    .map((n) => n.replace(/^[^a-z]/, ""))
    .uniq()
    .value();
}

function writeInfo(text) {
  writeLn("NicoMaterialRetriever");
  writeLn(text);
  writeLn("");
}

export default {
  exportMaterialIds() {
    if (app.project.file) {
      try {
        let path = app.project.file.fsName.replace(/[^\\\/]+$/, "");
        Utils.openFile(path + "materials.txt", "w", (file) => {
          findMaterials().forEach((m) => file.writeln(m));
        });
        return "success";
      } catch (e) {
        return e;
      }
    } else {
      return "project file is not found. please save project.";
    }
  },

  exportMaterialIdsWithInfo() {
    if (app.project.file) {
      try {
        let path = app.project.file.fsName.replace(/[^\\\/]+$/, "");
        Utils.openFile(path + "materials.csv", "w", (file) => {
          let materials = findMaterials();
          materials.forEach((m, i) => {
            writeInfo(`exporting ${i + 1} / ${materials.length}`);
            let info = getMaterialInfo(m);
            file.writeln(_.values(info).join(","));
          });
        });
        return "success";
      } catch (e) {
        return e;
      }
    } else {
      return "project file is not found. please save project.";
    }
  },

  createCredit(format) {
    if (app.project.activeItem instanceof CompItem) {
      let materials = findMaterials();
      let text = _(materials).chain()
        .map((m, i) => {
          writeInfo(`fetching ${i + 1} / ${materials.length}`);
          return getMaterialInfo(m);
        })
        .map((m) => format.replace("%title%", m.title).replace("%user%", m.userName).replace("%url%", m.url).replace("%id%", m.id))
        .value()
        .join("\n");
      app.project.activeItem.layers.addText(text);
      return "success";
    } else {
      return "please open target composition";
    }
  }
};
