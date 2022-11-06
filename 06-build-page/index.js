const fs = require('fs');
const path = require('path');

const assets = path.join(__dirname, 'assets');
const mainPage = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');

const style = path.join(__dirname, 'project-dist\\style.css');
const html = path.join(__dirname, 'project-dist\\index.html');

const stylePath = path.join(__dirname, 'styles');
const htmlPath = path.join(__dirname, 'components');

async function makeFolder() {

  await fs.promises.mkdir('./06-build-page/project-dist');
  await fs.promises.mkdir('./06-build-page/project-dist/assets');
  await fs.promises.copyFile(template, `${mainPage}\\index.html`);
  await fs.promises.writeFile(style, '');

}

async function makeHtml() {
  await fs.promises.copyFile(template, `${mainPage}\\index.html`);
  let box = await fs.promises.readdir(htmlPath);
  let index = await fs.promises.readFile(html, 'utf-8');

  for await (let item of box) {
    let atribute = item.split('.')[0];
    let toReplase = `{{${atribute}}}`;
    let object = await fs.promises.readFile(`${htmlPath}\\${item}`, 'utf-8');
    index = index.replace(toReplase, object);
  }

  await fs.promises.writeFile(html, index);
}

async function makeCss() {
  await fs.promises.writeFile(style, '');
  let readStyle = await fs.promises.readFile(style, 'utf-8');

  let object = await fs.promises.readdir(stylePath);
  object = object.reverse();
  [object[0],object[1]] = [object[1], object[0]];

  for await (let item of object) {
    let styleText = await fs.promises.readFile(`${stylePath}\\${item}`, 'utf-8');
    readStyle += '\n' + styleText;
  }

  await fs.promises.writeFile(style, readStyle);
}

async function makeAssets() {
  const boxAsset = await fs.promises.readdir(assets);
  for await (let path of boxAsset) {
    fs.stat(`${mainPage}\\assets\\${path}`, err => {
      if (err) {
        fs.promises.mkdir(`${mainPage}\\assets\\${path}`);
      }
    });

    let fileInPath = await fs.promises.readdir(`${assets}\\${path}`);
    for await (let file of fileInPath) {
      if(file.split('.')[1]) {
        await fs.promises.copyFile(`${assets}\\${path}\\${file}`, `${mainPage}\\assets\\${path}\\${file}`);
      }
    }
  }
}

fs.stat(mainPage, err => {
  if (err) {
    makeFolder().then(() => {
      makeHtml();
      makeCss();
      makeAssets();
    });
  } else {
    makeHtml();
    makeCss();
    makeAssets();
  }
});
