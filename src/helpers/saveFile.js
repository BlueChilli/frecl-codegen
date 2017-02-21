const fs = require('fs');
import path from 'path';
const mkdirp = require('mkdirp');

export default (targetPath, data)=> {

  const pathOfFile = path.dirname(targetPath);

  mkdirp(pathOfFile, (err)=> {
    if (err) console.error(err)
  });

  fs.writeFile(targetPath, data, (err) => {
    if (err) console.log(err);
  });
};