const { parentPort, workerData } = require("worker_threads");

const result = filterDrugs(workerData.drugs);
function filterDrugs(drugs) {
  return drugs.filter(
    (drug) => drug["tradename"].toLowerCase().indexOf("Panadol") > -1
  );
}

parentPort.postMessage(result);
