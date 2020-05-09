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
    const packageJson = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf8' }));
    packageJson.scripts[name] = `tsc && node dist/${name}/index.js`;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, '  '), { encoding: 'utf8' });
  }
}
