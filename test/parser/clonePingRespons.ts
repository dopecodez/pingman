import test from "ava";
import clonePingResponse from "../../src/parser/clonePingResponse";
import { pingResponse } from "../../src/types";

test("clonePingResponse creates a deep copy of pingResponse", (t) => {
  const original: pingResponse = {
    host: "localhost",
    numericHost: "127.0.0.1",
    alive: true,
    output: "Ping successful",
    time: 10,
    times: [10, 12, 11],
    min: 10,
    max: 12,
    avg: 11,
    bufferSize: 32,
    stddev: 1,
    packetLoss: "0%",
  };

  const clone = clonePingResponse(original);

  t.deepEqual(clone, original);
  t.not(clone, original);
  t.not(clone.times, original.times);

  clone.times.push(99);
  t.notDeepEqual(clone.times, original.times);
});

test("clonePingResponse handles undefined times array", (t) => {
  const original: pingResponse = {
    host: "localhost",
    numericHost: "127.0.0.1",
    alive: true,
    output: "Ping successful",
    time: 10,
    times: [],
    min: 10,
    max: 12,
    avg: 11,
    bufferSize: 32,
    stddev: 1,
    packetLoss: "0%",
  };

  const clone = clonePingResponse(original);
  console.log({ clone });

  t.deepEqual(clone.times, []);
});
