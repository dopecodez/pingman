import { pingResponse } from "../types";

function clonePingResponse(obj: pingResponse): pingResponse {
  return {
    host: obj.host,
    numericHost: obj.numericHost,
    alive: obj.alive,
    output: obj.output,
    time: obj.time,
    times: obj.times?.length ? [...obj.times] : [],
    min: obj.min,
    max: obj.max,
    avg: obj.avg,
    bufferSize: obj.bufferSize,
    stddev: obj.stddev,
    packetLoss: obj.packetLoss,
  };
}

export default clonePingResponse;
