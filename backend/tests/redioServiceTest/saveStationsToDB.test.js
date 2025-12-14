import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { createRadioService } from "../../src/services/radioService.js";

let fetchMock, dbMock, loggerMock, config, service;

beforeEach(() => {
  fetchMock = jest.fn();
  dbMock = { execute: jest.fn().mockResolvedValue({ rowsAffected: 1 }) };
  loggerMock = { log: jest.fn(), error: jest.fn() };
  config = { batchSize: 2, defaultTimeout: 2000 };

  service = createRadioService({
    fetch: fetchMock,
    db: dbMock,
    config,
    logger: loggerMock,
  });
});

describe("saveStationsToDB", () => {
  test("saves only stations with valid URLs and skips .m3u8 streams", async () => {
    // Arrange
    const stations = [
      {
        stationuuid: "1",
        name: "Valid",
        country: "UK",
        tags: "rock",
        url_resolved: "https://good.stream/1",
        favicon: "https://img.com/1.png",
      },
      {
        stationuuid: "2",
        name: "Invalid URL",
        url_resolved: "not-a-url",
      },
      {
        stationuuid: "3",
        name: "Bad Format",
        url_resolved: "https://stream.com/x.m3u8",
      },
    ];

    // Act
    await service.saveStationsToDB(stations);

    // Assert
    expect(dbMock.execute).toHaveBeenCalledTimes(1);

    const params = dbMock.execute.mock.calls[0][1];

    expect(params[0]).toBe("1");
    expect(params[4]).toBe("https://good.stream/1");
  });

  test("clears invalid favicon values before saving", async () => {
    // Arrange
    const stations = [
      {
        stationuuid: "10",
        name: "No Favicon",
        url_resolved: "https://valid.com/x",
        favicon: "not-a-url",
      },
    ];

    // Act
    await service.saveStationsToDB(stations);

    // Assert
    const params = dbMock.execute.mock.calls[0][1];
    expect(params[5]).toBe("");
  });
});
