import * as fs from 'fs';

export class FileOperations {
  private srcDir: fs.Dir;
  private newDir: string | undefined;

  public constructor() {
    try {
      this.srcDir = fs.opendirSync('src');
    } catch (exc) {
      throw new Error('Unable to open src directory');
    }
  }

  public addDirectory(directoryName: string): void {
    const wantedDirectory = `${this.srcDir.path}/${directoryName}`;
    const wantedDirectoryExists = fs.existsSync(wantedDirectory);

    if (wantedDirectoryExists) {
      throw new Error('Problem already exists');
    }

    try {
      fs.mkdirSync(wantedDirectory);
    } catch (exc) {
      throw new Error('Unable to create directory for the problem');
    }

    this.newDir = wantedDirectory;
  }

  public addDirectoryContent(): void {
    if (!this.newDir) {
      throw new Error('New directory has not been created');
    }

    const fileName = `${this.newDir}/index.ts`;
    const fileContents = 'console.log(\'Hello world\');\n';
    try {
      fs.writeFileSync(fileName, fileContents);
    } catch (exc) {
      throw new Error('Unable to create file');
    }
  }

  public addStartScript(name: string): void {
    // There are way better automated ways to do this
    const packageJsonContents = fs.readFileSync('package.json', { encoding: 'utf8' });
    const scripts = packageJsonContents.indexOf('scripts');
    const scriptsStart = packageJsonContents.indexOf('{', scripts);
    const scriptsEnd = packageJsonContents.indexOf('}', scriptsStart);
    const lastScriptPos = packageJsonContents.slice(scriptsStart, scriptsEnd).lastIndexOf('"') + scriptsStart;

    const scriptToInsert = `,\n    "${name}": "tsc && node dist/${name}/index.js"`;
    const newPackageJson = packageJsonContents.substring(0, lastScriptPos + 1)
      + scriptToInsert
      + packageJsonContents.substring(lastScriptPos + 1);

    fs.writeFileSync('package.json', newPackageJson, { encoding: 'utf8' });
  }
}
