const fs = require('fs');
const path = require('path');

const thispath = path.join(__dirname, 'styles');
const copyPath = path.join(__dirname, '\\project-dist\\bundle.css');
let dataText = '';

fs.stat(copyPath, err => {
  if(err) {
    err;
  } else {
    fs.unlink(copyPath,
      err => { if(err) console.log(err); });
  }
});

fs.readdir(thispath, (err, files) => {
  for(let item of files) {
    if(item.split('.')[1] == 'css') {
      let onefile = thispath + '\\' + item;
      fs.readFile(onefile, 'utf-8', (err, files) => {
        fs.access(copyPath, (err) => {
          if (err) {
            dataText += files;
            fs.writeFile(copyPath, dataText,
              err => {if(err) console.log(err);});
          } else {
            fs.readFile(copyPath, 'utf-8', (err, file) => {
              dataText = file;
              dataText += files;
              if (err) throw err;
              fs.writeFile(copyPath,dataText,
                err => {if(err) console.log(err);});
            });
          }
        });
      });
    }
  }
});

console.log('\nbundle.css complet.');