const {
  startClientPC,
  startSatelite,
  stopClientPC,
  stopEarthServer,
  stopSatelite,
  stopMarsServer,
  startEarthServer,
  startMarsServer,
  sendMessage,
  assertResponse
} = require('./stubs/messageservice.stubs');

describe('Success message sending', function () {

  before('Start the client PC', function () {
    startClientPC();
  });

  context('The message is sent to Earth', function () {

    it('The response is "Success" when the correct request and all services are available', function () {
      const token = startEarthServer();
      const response = sendMessage('Hello', 'Earth', token);
      assertResponse(response, 'Success');
      stopEarthServer();
    });

  });

  context('The message is sent to Mars', function () {

    before('Start the satelite', function () {
      startSatelite();
    });

    it('The response is "Success" when the correct request and all services are available', function () {
      const token = startMarsServer();
      const response = sendMessage('Hello', 'Mars', token);
      assertResponse(response, 'Success');
      stopMarsServer();
    });

    after('Stop the satelite', function () {
      stopSatelite();
    });

  });

  after('Stop the client PC', function () {
    stopClientPC();
  });

});

describe('Failed message sending', function () {

  before('Start the client PC', function () {
    startClientPC();
  });

  context('The message is sent to Earth', function () {

    it('The response is "Security Error" when the invalid token', function () {
      startEarthServer();
      const response = sendMessage('Hello', 'Earth', 'X0000');
      assertResponse(response, 'Security Error');
      stopEarthServer();
    });

  });

  context('The message is sent to Mars', function () {

    before('Start the satelite', function () {
      startSatelite();
    });

    it('The response is "Security Error" when the invalid token', function () {
      startMarsServer();
      const response = sendMessage('Hello', 'Mars', 'X0000');
      assertResponse(response, 'Security Error');
      stopMarsServer();
    });

    it('The response is "Service is unavailable" when the unavailable satellite', function () {
      const token = startMarsServer();
      stopSatelite();
      const response = sendMessage('Hello', 'Mars', token);
      assertResponse(response, 'Service is unavailable');
      stopMarsServer();
      startSatelite();
    });

    it('The response is "Service is unavailable" when the unavailable satellite and the invalid token', function () {
      startMarsServer();
      stopSatelite();
      const response = sendMessage('Hello', 'Mars', 'X0000');
      assertResponse(response, 'Service is unavailable');
      stopMarsServer();
      startSatelite();
    });

    after('Stop the satelite', function () {
      stopSatelite();
    });

  });

  after('Stop the client PC', function () {
    stopClientPC();
  });

});
