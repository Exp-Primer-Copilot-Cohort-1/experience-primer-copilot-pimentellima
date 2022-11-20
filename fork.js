/* eslint-disable global-require */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
const os = require('os');
const cluster = require('cluster');

const runPrimaryProcess = () => {
  const cpus = os.cpus().length * 2;

  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking Server with ${cpus} processes\n`);

  for (let index = 0; index < cpus; index++) { cluster.fork(); }

  // When Worker process has died, Log the worker
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
};

const runWorkerProcess = async () => {
  // if Worker process, master is false, cluster.isWorker is true
  // worker starts server for individual cpus
  // the worker created above is starting server
  require('./server');
};

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
