export default {
  openFile(path, mode, callback) {
    let file = new File(path);
    file.encoding = "UTF8";
    file.lineFeed = "Unix";
    if (file.open("w")) {
      try {
        callback(file);
      } catch (e) {
        throw e;
      } finally {
        file.close();
      }
    } else {
      throw "cannot write material list file. please enable 'Allow Scripts To Write Files And Access Network option'";
    }
  }
}
