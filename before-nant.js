const fs = require('fs');

const distFolder = './dist';
const template = './VakkenBeheer-template.ascx';
const ascx = './VakkenBeheer.ascx';
const matcher = /[0|1|2|styles|inline|polyfills|vendor|main].*.bundle/g;

let templateFileData;

function process() {
  templateFileData = fs.readFileSync(template, 'utf-8');
  fs.readdirSync(distFolder).forEach((file) => {
    if (file.match(matcher)) {
      replace(file);
    }
  });
  fs.writeFileSync(ascx, templateFileData, 'utf-8');
}

function replace(fileName) {
  const type = fileName.match(matcher);
  if (type[0] !== undefined) {
    const fileType = type[0].substring(0, type[0].indexOf('.'));
    const expression = `\/${fileType}..*bundle.[css|js]{2,3}`;
    const regex = new RegExp(expression, 'g');
    templateFileData = templateFileData.replace(regex, `/${fileName}`);
  }
}

process();
