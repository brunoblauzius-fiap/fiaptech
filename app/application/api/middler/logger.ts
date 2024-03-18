class Logger {
    log(request, response, next) {
      let formattedDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

      let output = `${formattedDate} :: ${request.method} :: ${request.originalUrl}`;

      console.log(output)

      next();
    }
}

export default new Logger;