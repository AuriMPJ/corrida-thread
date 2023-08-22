const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const inicioMain = Date.now(); // Início do contador para a thread principal

  const worker = new Worker(__filename);

  worker.on('message', (message) => {
    const tempoTotal = Date.now() - inicioMain; // Tempo decorrido para a thread secundária
    console.log('Tempo decorrido (Thread Secundária):', tempoTotal, 'ms');

    console.log('Resultado da thread secundária:', message.result);

  });

  worker.postMessage('Tarefa Concluída');
} else {
  parentPort.on('message', (message) => {
    console.log('Mensagem da thread principal:', message);

    setTimeout(() => {
      parentPort.postMessage({ result: 'Tarefa concluída' });
    }, 2000);
  });
}
