import {MD5} from 'crypto-js';
import {writeFileSync, readFileSync, mkdirSync, existsSync} from 'fs';

interface FSInterface {
  directory: string;
  fileMap: Record<string, string>;
  store(filename: string, content: string): void;
  get(filename: string): string | undefined;
}

export class FS implements FSInterface {
  directory: string;
  fileMap: Record<string, string> = {};

  constructor(directory: string) {
    if (!existsSync(directory)) {
      mkdirSync(directory);
    }
    this.directory = directory;
  }

  store(filename: string, content: string): void {
    try {
      const hashedContent = HashUtility.hashingContent(content);
      const hashedFilename = HashUtility.convertFilename(hashedContent);

      const filePath = `${this.directory}/${hashedFilename}`;

      writeFileSync(filePath, content);
      this.fileMap[filename] = hashedFilename;
    } catch {
      throw new Error('An error occurred while saving the file:' + filename);
    }
  }
  get(filename: string): string | undefined {
    const hash = this.fileMap[filename];
    const filePath = `${this.directory}/${hash}`;
    if (hash) {
      const fileContent = readFileSync(filePath, 'utf8');
      if (fileContent) {
        return fileContent;
      }
    }
    return undefined;
  }
}

class HashUtility {
  static hashingContent(content: string): string {
    const hashedString = MD5(content).toString();

    return hashedString;
  }

  static convertFilename(filename: string): string {
    const convertedFilename = filename.replace(/[^a-zA-Z]/g, '');

    return convertedFilename;
  }
}

const fs = new FS('topdir');

fs.store('filename1', 'a very long string1');
fs.store('filename2', 'a very long string1');
fs.store('filename3', 'a very long string3');
const result1 = fs.get('filename1'); // gets 'a very long string1'
const result2 = fs.get('filename2'); // gets 'a very long string1'
const result3 = fs.get('filename3'); // gets 'a very long string3'

console.log(result1);
console.log(result2);
console.log(result3);
