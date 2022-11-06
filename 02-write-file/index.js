const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const pathFile = path.join(__dirname, 'text.txt');
let dataText = '';

stdout.write('Привет, пиши сюда:\n');

fs.writeFile(pathFile, '', err => {
  if(err) console.log(err);
});

stdin.on('data', data => {
  if (data.toString() === 'exit\r\n') {
    console.log('Покеда.');
    process.exit();
  }

  fs.access(pathFile, (err) => {
    if (err) {
      dataText += data.toString();
      fs.writeFile(
        pathFile,
        dataText, (err) => {
          if (err) throw err;
        });
    } else {
      fs.readFile(pathFile, 'utf-8', (err, file) => {
        dataText = file;
        dataText += data.toString();
        if (err) throw err;
        fs.writeFile(
          pathFile,
          dataText, (err) => {
            if (err) throw err;
          });
      });
    }
  });
});
process.on('SIGINT', () => {
  console.log('Покеда.');
  process.exit();
});
