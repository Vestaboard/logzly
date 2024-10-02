export interface ILogger {
  trace: (topic: string, data?: Object) => void;
  debug: (topic: string, data?: Object) => void;
  info: (topic: string, data?: Object) => void;
  warn: (topic: string, data?: Object) => void;
  error: (topic: string, data?: Object) => void;
  fatal: (topic: string, data?: Object) => void;
}

const consoleLogger: ILogger = {
  trace: (topic: string, data?: Object) => {
    console.log(topic, JSON.stringify(data || {}));
  },
  debug: (topic: string, data?: Object) => {
    console.debug(topic, JSON.stringify(data || {}));
  },
  info: (topic: string, data?: Object) => {
    console.info(topic, JSON.stringify(data || {}));
  },
  warn: (topic: string, data?: Object) => {
    console.warn(topic, JSON.stringify(data || {}));
  },
  error: (topic: string, data?: Object) => {
    console.error(topic, JSON.stringify(data || {}));
  },
  fatal: (topic: string, data?: Object) => {
    console.error(topic, JSON.stringify(data || {}));
  },
};

const logLevels = ["trace", "debug", "info", "warn", "error", "fatal"];

export class Log {
  private _metaData: Object | undefined = undefined;
  private _logger: ILogger = consoleLogger;
  private _filter: string = process?.env?.LOG_FILTER || "*";
  private _logLevel: string = process?.env?.LOG_LEVEL || "trace";

  private shouldLog(logLevel: string, topic: string) {
    const isLogLevelEnabled =
      logLevels.indexOf(logLevel) >= logLevels.indexOf(this._logLevel);

    return (
      isLogLevelEnabled &&
      (this._filter === "*" || topic.includes(this._filter.replace(/\*/g, "")))
    );
  }

  setLogLevel(logLevel: string) {
    this._logLevel = logLevel;
  }

  setFilter(filter: string) {
    this._filter = filter;
  }

  setLogger(logger: ILogger) {
    this._logger = logger;
  }

  trace(topic: string, data?: Object) {
    if (!this.shouldLog("trace", topic)) {
      return;
    }

    this._logger.trace(topic, {
      ...(data || {}),
      _meta: this._metaData,
    });
  }

  debug(topic: string, data?: Object) {
    if (!this.shouldLog("debug", topic)) {
      return;
    }

    this._logger.debug(topic, {
      ...(data || {}),
      _meta: this._metaData,
    });
  }

  info(topic: string, data?: Object) {
    if (!this.shouldLog("info", topic)) {
      return;
    }

    this._logger.info(topic, {
      ...(data || {}),
      _meta: this._metaData,
    });
  }

  warn(topic: string, data?: Object) {
    if (!this.shouldLog("warn", topic)) {
      return;
    }

    this._logger.warn(topic, {
      ...(data || {}),
      _meta: this._metaData,
    });
  }

  error(topic: string, data?: Object) {
    if (!this.shouldLog("error", topic)) {
      return;
    }

    this._logger.error(topic, {
      ...(data || {}),
      _meta: this._metaData,
    });
  }

  fatal(topic: string, data?: Object) {
    if (!this.shouldLog("fatal", topic)) {
      return;
    }

    this._logger.fatal(topic, {
      ...(data || {}),
      _meta: this._metaData,
    });
  }

  addMetaData(metaData: Object) {
    this._metaData = { ...this._metaData, ...metaData };
  }

  clearMetaData() {
    this._metaData = {};
  }
}

export const log = new Log();
