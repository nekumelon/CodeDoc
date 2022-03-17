# CodeDoc
CodeDoc uses OpenAIs GPT-3 AI to generate code documentation with ease.

## Packaging/Building
To package CodeDoc, install vsce. To install vsce, you must have node/npm downloaded from `https://nodejs.org/en/download/`. Once npm is downloaded, run `npm i vsce` in a command line. It should successfully install. \
Download the source code of CodeDoc by clicking the download button on GitHub or by running `git clone https://github.com/nekumelon/CodeDoc`. Once you have the source code, navigate to the folder and run `vsce package` in a command line. If a warning shows up, just press `y` and it shuld create a `.vsix` file in the directory. \
Once you have the `.vsix` file, click the extensions icon in vscode, the 3 dots on the top right and then click `Install from VSIX`. In the file explorer, navigate to the `.vsix` file and open it. It will install CodeDoc and ask you to reload.

### Authenticating
To authenticate, you must have an OpenAI api key. You can generate one from `https://openai.com/api/`. Put the api key in CodeDocs settings.

### Codex
If you have access to the OpenAI Codex API and want to use it's superior code knowledge, you can select the Codex option in the CodeDoc settings. The only downside is that large code may take a little longer to process.

### Usage
First make sure you are authenticated. See above details.
To use CodeDoc, select the function you want to create documentation for and click the `Generate Documentation` icon on the bottom left of the vscode status bar (The icon looks like a document with a code symbol). If you are on a MacBook with a touchbar, you can click the document icon, also on the bottom left.

### FAQ

### Q: When I click the `Generate Documentation` button, why doesn't it document the code or incorrectly changes it?
### A: CodeDoc isn't perfect, especially because of it's use of Ai. To get the best results, make sure you only have 1 function selected at a time and that the function isn't overly complicated. The best way to avoid this is to follow good code practices such as splitting up a large function into many, smaller, functions.

### Q: What Languages are supported?
### A: CodeDoc supports almost every programming language, but some lesser known languages aren't going to have the same results.

### Q: What code editors are supported?
### A: Just vscode.

## LICENSE
See `LICENSE`