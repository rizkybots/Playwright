class Logger {

  static info(message) {
    console.log(`INFO: ${message}`);
  }

  static success(message) {
    console.log(`SUCCESS: ${message}`);
  }

  static error(message) {
    console.log(`ERROR: ${message}`);
  }
}

module.exports = Logger;