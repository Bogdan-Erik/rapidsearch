import {MD5} from 'crypto-js';

export class HashUtility {
  static hashingContent(content: string): string {
    const hashedString = MD5(content).toString();

    return hashedString;
  }

  static convertFilename(filename: string): string {
    const convertedFilename = filename.replace(/[^a-zA-Z]/g, '');

    return convertedFilename;
  }
}
