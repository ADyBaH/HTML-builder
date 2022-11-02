const fs = require("fs");
const path = require("path");


const rstream = fs.ReadStream(
  path.join(__dirname, 'text.txt'),'utf-8');

rstream.on('readable', function(){
  const dataontxt = rstream.read();
  if(dataontxt) console.log(dataontxt.toString());
})
