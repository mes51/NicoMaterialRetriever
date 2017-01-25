let materials = _(app.project.items.length + 1).chain()
    .range()
    .drop(1)
    .map((i) => app.project.items[i].name)
    .map((n) => n.match(/(^|_|\s|\/)(sm|im|nc|lv|td|gm)[0-9]+/g) || [])
    .flatten()
    .compact()
    .map((n) => n.replace(/^[^a-z]/, ""))
    .uniq()
    .value();


if (!app.project.file) {
  alert("project file is not found. please save project.");
}

try {
  let path = app.project.file.fsName.replace(/[^\\\/]+$/, "");
  let file = new File(path + "materials.txt");
  file.encoding = "UTF8";
  file.lineFeed = "Unix";
  if (file.open("w")) {
    materials.forEach((m) => file.writeln(m));
    file.close();
  }
} catch (e) {
  alert("cannot write material list file. please enable 'Allow Scripts To Write Files And Access Network option'");
}
