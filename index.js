const mkdirp = require('mkdirp');
const moment = require('moment');
const fs = require('fs');
const { spawn } = require('child_process');

const year = moment().year();
const month = moment().format('MMMM');
const startOfWeek = moment().startOf('week').format('DD');
const endOfWeek = moment().endOf('week').format('DD-MMMM');
const today = moment().format('DD-MMMM');

const currentWeek = `${startOfWeek}-${endOfWeek}`;
const pathToCreate = `${__dirname}/../${year}/${month}/${currentWeek}`;
const filePath = `${pathToCreate}/${today}.todo`;


mkdirp(pathToCreate, err => {
  if (err) console.error(err, "Couldn't create Directory");
  else {
    fs.writeFile(filePath, '', err => {
      if (err) console.error(err, "Couldn't create File");
      else {
        const openFile = spawn('code', [filePath]);

        openFile.stdout.on('data', data => {
          console.log(`stdout: ${data}`);
        });
        
        openFile.stderr.on( 'data', data => {
          console.log(`stderr: ${data}`);
        });
        
        openFile.on( 'close', code => {
          console.log(`Process exited with code ${code}`);
        });
      };
    })
  }
});

