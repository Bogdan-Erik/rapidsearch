
# FS Class

The `FS` class provides a way to manage files in a specified directory using two distinct methods. 

The `store` method takes a filename and content as input, hashes the content, generates a unique name for it through encoding, thus preventing the creation of multiple instances of files with the same content. The provided filename is stored, associated with the hash generated from the content.

The `get` method, on the other hand, retrieves the hash associated with the provided filename and returns the content of the file.

# HashUtility

The `HashUtility` class serves as a helper class designed for code reusability. The `hashingContent` method hashes the provided content and returns it. The `convertFilename` method, on the other hand, transforms the given filename by allowing only alphabetic characters.

# Code Formatting and Validation

Code formatting and validation are performed by `GTS`, which adheres to the `TypeScript style guide`, `formatter`, and `linter provided` by Google. It includes an automatic code fixer. This ensures that code uploaded to the Git repository is always error-free. We run tests using `Husky` before linting automatically. If any errors are detected, it prevents the push.

## Use
- for run tsc and program
  ```
  npm run dev
  ```
- for test
  ```
  npm run test
  ```
- for lint
  ```
  npm run lint
  ```



## Directory Hierarchy
```
|—— .editorconfig
|—— .eslintignore
|—— .eslintrc.json
|—— .gitignore
|—— .husky
|    |—— _
|        |—— .gitignore
|        |—— husky.sh
|    |—— pre-commit
|—— .npmignore
|—— .prettierrc.js
|—— jest.config.ts
|—— package-lock.json
|—— package.json
|—— src
|    |—— index.js
|    |—— index.ts
|    |—— tests
|        |—— FS.test.ts
|—— tsconfig.json
```