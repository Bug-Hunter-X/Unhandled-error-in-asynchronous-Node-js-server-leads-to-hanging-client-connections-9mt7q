const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate an asynchronous operation that might throw an error
  doSomethingAsync().then(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
  }).catch(error => {
    console.error('Error:', error);
    // The problem is here: We only log the error, but the response is not handled.  The client will hang
    // until the connection times out.
  });
});

async function doSomethingAsync() {
  // Simulate an asynchronous operation that might throw an error
  const randomNumber = Math.random();
  if (randomNumber < 0.5) {
    throw new Error('Simulated asynchronous error');
  }
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
}

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});