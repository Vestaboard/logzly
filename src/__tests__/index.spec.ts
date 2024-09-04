import { ILogger, Log } from "..";

const getLogger = () => {
  const testLogger: ILogger = {
    trace: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
  };

  const logger = new Log();

  logger.setLogger(testLogger);

  return {
    logger,
    testLogger,
  };
};

describe("Logger", () => {
  it("Should trace", () => {
    const { logger, testLogger } = getLogger();
    logger.trace("Test.Topic", { message: "test" });
    expect(testLogger.trace).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should debug", () => {
    const { logger, testLogger } = getLogger();
    logger.debug("Test.Topic", { message: "test" });
    expect(testLogger.debug).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log info", () => {
    const { logger, testLogger } = getLogger();
    logger.info("Test.Topic", { message: "test" });
    expect(testLogger.info).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log warnings", () => {
    const { logger, testLogger } = getLogger();
    logger.warn("Test.Topic", { message: "test" });
    expect(testLogger.warn).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log errors", () => {
    const { logger, testLogger } = getLogger();
    logger.error("Test.Topic", { message: "test" });
    expect(testLogger.error).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log fatal errors", () => {
    const { logger, testLogger } = getLogger();
    logger.fatal("Test.Topic", { message: "test" });
    expect(testLogger.fatal).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should not log trace if the topic is filtered out", () => {
    const { logger, testLogger } = getLogger();
    logger.setFilter("Foo.*");
    logger.trace("Bar.Baz", { message: "test" });
    expect(testLogger.trace).not.toHaveBeenCalled();
  });

  it("Should log if the topic is not filtered out", () => {
    const { logger, testLogger } = getLogger();
    logger.setFilter("Foo.*");
    logger.trace("Foo.Bar", { message: "test" });
    expect(testLogger.trace).toHaveBeenCalledWith("Foo.Bar", {
      message: "test",
    });
    logger.setFilter("*");
  });

  it("Should not log trace if the log level is set to debug", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("debug");
    logger.trace("Test.Topic", { message: "test" });
    expect(testLogger.trace).not.toHaveBeenCalled();
  });

  it("Should  not log debug if the log level is set to info", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("info");
    logger.debug("Test.Topic", { message: "test" });
    expect(testLogger.debug).not.toHaveBeenCalled();
  });
  it("Should  not log info if the log level is set to warn", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("warn");
    logger.info("Test.Topic", { message: "test" });
    expect(testLogger.info).not.toHaveBeenCalled();
  });

  it("Should  not log warn if the log level is set to error", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("error");
    logger.warn("Test.Topic", { message: "test" });
    expect(testLogger.warn).not.toHaveBeenCalled();
  });

  it("Should  not log error if the log level is set to fatal", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("fatal");
    logger.error("Test.Topic", { message: "test" });
    expect(testLogger.error).not.toHaveBeenCalled();
  });

  it("Should log fatal if the log level is set to fatal", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("fatal");
    logger.fatal("Test.Topic", { message: "test" });
    expect(testLogger.fatal).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log error if the log level is set to error", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("error");
    logger.error("Test.Topic", { message: "test" });
    expect(testLogger.error).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log warn if the log level is set to warn", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("warn");
    logger.warn("Test.Topic", { message: "test" });
    expect(testLogger.warn).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log info if the log level is set to info", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("info");
    logger.info("Test.Topic", { message: "test" });
    expect(testLogger.info).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log debug if the log level is set to debug", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("debug");
    logger.debug("Test.Topic", { message: "test" });
    expect(testLogger.debug).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should log trace if the log level is set to trace", () => {
    const { logger, testLogger } = getLogger();
    logger.setLogLevel("trace");
    logger.trace("Test.Topic", { message: "test" });
    expect(testLogger.trace).toHaveBeenCalledWith("Test.Topic", {
      message: "test",
    });
  });

  it("Should include metadata", () => {
    const { logger, testLogger } = getLogger();
    logger.addMetaData({ foo: "bar" });
    logger.info("Test.Topic", {});
    expect(testLogger.info).toHaveBeenCalledWith("Test.Topic", {
      _meta: { foo: "bar" },
    });
  });
});
