'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.FS = void 0;
const crypto_js_1 = require('crypto-js');
const fs_1 = require('fs');
class FS {
  constructor(directory) {
    this.fileMap = {};
    if (!(0, fs_1.existsSync)(directory)) {
      (0, fs_1.mkdirSync)(directory);
    }
    this.directory = directory;
  }
  store(filename, content) {
    try {
      const hashedContent = HashUtility.hashingContent(content);
      const hashedFilename = HashUtility.convertFilename(hashedContent);
      const filePath = `${this.directory}/${hashedFilename}`;
      (0, fs_1.writeFileSync)(filePath, content);
      this.fileMap[filename] = hashedFilename;
    } catch (_a) {
      throw new Error('An error occurred while saving the file:' + filename);
    }
  }
  get(filename) {
    const hash = this.fileMap[filename];
    if (hash) {
      try {
        const filePath = `${this.directory}/${hash}`;
        return (0, fs_1.readFileSync)(filePath, 'utf8');
      } catch (_a) {
        throw new Error(
          'An error occurred while reading the file: ' + filename
        );
      }
    }
    return undefined;
  }
}
exports.FS = FS;
class HashUtility {
  static hashingContent(content) {
    const hashedString = (0, crypto_js_1.MD5)(content).toString();
    return hashedString;
  }
  static convertFilename(filename) {
    const convertedFilename = filename.replace(/[^a-zA-Z]/g, '');
    return convertedFilename;
  }
}
const fs = new FS('/Users/bogdanerik/Erik/rapidsearch/topdir');
fs.store('filename1', 'a very long string1');
fs.store('filename2', 'a very long string1');
fs.store('filename3', 'a very long string3');
const result1 = fs.get('filenamgdfgfde1'); // gets 'a very long string1'
const result2 = fs.get('filename2'); // gets 'a very long string1'
const result3 = fs.get('filename3'); // gets 'a very long string3'
console.log(result1);
console.log(result2);
console.log(result3);
