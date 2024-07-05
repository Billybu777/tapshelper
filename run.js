const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Script is running !`);
});

app.get('/', (req, res) => {
  res.send(`<body>
  <center><h1>Script is running !</h1></center
  </body>`);
});

const { exec } = require('child_process');


function runScript(scriptName) {
  const command = `node ${scriptName}.js`;

  const childProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing ${scriptName}: ${error}`);
      return;
    }

    console.log(`${scriptName} output:\n${stdout}`);
  });

  childProcess.stdout.on('data', (data) => {
    console.log(`${scriptName} stdout: ${data}`);
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`${scriptName} stderr: ${data}`);
  });
}


runScript('perm');
runScript('rej');
runScript('claimowner');
runScript('lockunlock');
runScript('hideshow');
runScript('wlbl');
runScript('name');
runScript('cowner');
