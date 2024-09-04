# Logzly

A simple logger.

## Getting Started

Install it:

```bash
yarn add logzly
# or
npm i logzly
```

Then import it where you want to use it.

```js
import { log } from "logzly";
```

## Log Types

The logger has several types with escalating log levels. Each log command requires a topic and optionally takes an object of data as the second argument.

```js
log.trace("Topic.Name", {});
log.debug("Topic.Name", {});
log.info("Topic.Name", {});
log.warn("Topic.Name", {});
log.error("Topic.Name", {});
log.fatal("Topic.Name", {});
```

## Log Levels

The log levels are:

- trace
- debug
- info
- warn
- error
- fatal

If you set your log level at a level above the log type you are logging, it will not be logged:

```js
log.setLogLevel("debug");
log.trace("Trace.Topic"); // Never logs
log.debug("Debug.Topic"); // Logs
log.info("Info.Topic"); // Logs
```

You can also set the log level by setting the `LOG_LEVEL` environment variable, but `setLogLevel` will override it if used.

## Filtering

You may set a filter and exclude all logs that do not match the filter.

```js
log.setFilter("Foo.*");
log.info("Bar.Baz"); // Never logs
log.info("Foo.Baz"); // Logs
```

By default, the filter is set to `*` which allows all logs. You can also set this using the `LOG_FILTER` environment variable but `setFilter` will override it if used.

## Metadata

You can set any arbitrary meta data with `log.addMetaData()`

```js
log.addMetaData({
  foo: "bar",
});

log.trace("Foo.Bar"); // "Foo.Bar" { _meta: { foo: "bar" } }
```

The `log.addMetaData()` will extend any previous metadata. `log.clearMetaData()` will reset the meta object to empty.
