const fs = require("fs");
const drugs = JSON.parse(fs.readFileSync("./drugs.json")).drugs;
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js", { workerData: { drugs } });


function filterDrugs(drugs) {
    return drugs.filter(drug => drug.id === 2328)
}
console.time("searchDrugsMainThread");
filterDrugs(drugs)
console.timeEnd("searchDrugsMainThread");

//Listen for a message from worker
console.time("searchDrugsWorkerThread");
worker.once("message", (result) => {
  console.timeEnd("searchDrugsWorkerThread");
});

// worker.on("error", (error) => {
//   console.log(error);
// });

// worker.on("exit", (exitCode) => {
//   console.log(exitCode);
// });

console.log("Executed in the parent thread");
