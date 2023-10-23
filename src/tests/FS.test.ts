import {FS} from '../index';
import {existsSync, rmSync} from 'fs';

describe('FS class', () => {
  let fileSystem: FS;

  beforeAll(() => {
    fileSystem = new FS('testdir');
  });

  afterAll(() => {
    if (existsSync(fileSystem.directory)) {
      rmSync(fileSystem.directory, {recursive: true, force: true});
    }
  });

  it('should store and retrieve content correctly', () => {
    const content = 'This is a test content';
    const filename = 'testfile';

    fileSystem.store(filename, content);

    const retrievedContent = fileSystem.get(filename);

    expect(retrievedContent).toBe(content);
  });

  it('should handle non-existent files gracefully', () => {
    const nonExistentFile = 'nonexistentfile';
    expect(fileSystem.get(nonExistentFile)).toBe(undefined);
  });
});
