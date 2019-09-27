const fs = require('fs');
const path = require('path');

const distFolder = './dist';
const template = './VakkenBeheer-template.ascx';
const ascx = './VakkenBeheer.ascx';
const matcher = /(styles|polyfills-es5|polyfills-es2015|runtime-es2015|main-es2015|runtime-es5|main-es5).*/g;

let templateFileData;

function process() {
  templateFileData = fs.readFileSync(template, 'utf-8');
  fs.readdirSync(distFolder).forEach((file) => {
    if (file.match(matcher)) {
      replace(file);
    }
  });
  fs.writeFileSync(ascx, templateFileData, 'utf-8');
  copyFiles();
}

function replace(fileName) {
  const type = fileName.match(matcher);

  if (type[0] !== undefined) {
    const fileType = type[0].substring(0, type[0].indexOf('.'));
    const expression = `\/${fileType}..[css|js]{2,3}`;
    const regex = new RegExp(expression, 'g');
    templateFileData = templateFileData.replace(regex, `/${fileName}`);
  }
}

function copyFiles() {
  const files = [
    './DownloadFile.ashx',
    './VakkenBeheer.dnn',
    './VakkenBeheer.ascx',
  ];
  files.map((file) => {
    fs.copyFileSync(file, path.resolve('./dist', file));
  });
}

process();
