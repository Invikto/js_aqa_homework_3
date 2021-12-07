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

    it('Valid token => "Success"', function () {
      const token = startEarthServer();
      const response = sendMessage('Hello', 'Earth', token);
      assertResponse(response, 'Success');
    });

    after('Stop the Earth server', function () {
      stopEarthServer();
    });

  });

  context('The message is sent to Mars', function () {

    before('Start the satelite', function () {
      startSatelite();
    });

    it('(Valid token, available satellit ) => "Success"', function () {
      const token = startMarsServer();
      const response = sendMessage('Hello', 'Mars', token);
      assertResponse(response, 'Success');
    });

    after('Stop the satelite and Mars server', function () {
      stopMarsServer();
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

    it('Invalid token => "Security Error"', function () {
      startEarthServer();
      const response = sendMessage('Hello', 'Earth', 'X0000');
      assertResponse(response, 'Security Error');
    });

    after('Stop the Earth server', function () {
      stopEarthServer();
    });

  });

  context('The message is sent to Mars', function () {

    beforeEach('Start the satelite', function () {
      startSatelite();
    });

    it('(Invalid token, available satellit) => "Security Error"', function () {
      startMarsServer();
      const response = sendMessage('Hello', 'Mars', 'X0000');
      assertResponse(response, 'Security Error');
    });

    it('(Valid token, unavailable satellite) => "Service is unavailable"', function () {
      const token = startMarsServer();
      stopSatelite();
      const response = sendMessage('Hello', 'Mars', token);
      assertResponse(response, 'Service is unavailable');
    });

    it('(Invalid token, unavailable satellite) => "Service is unavailable"', function () {
      startMarsServer();
      stopSatelite();
      const response = sendMessage('Hello', 'Mars', 'X0000');
      assertResponse(response, 'Service is unavailable');
    });

    after('Stop the satelite and Mars server', function () {
      stopMarsServer();
      stopSatelite();
    });

  });

  after('Stop the client PC', function () {
    stopClientPC();
  });

});
