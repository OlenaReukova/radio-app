import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { createRadioService } from "../../radioService.js";

let fetchMock, dbMock, loggerMock, config, service;

beforeEach(() => {
  fetchMock = jest.fn();
  dbMock = { execute: jest.fn() };
  loggerMock = { log: jest.fn(), error: jest.fn() };
  config = { batchSize: 2, defaultTimeout: 2000 };

  service = createRadioService({
    fetch: fetchMock,
    db: dbMock,
    config,
    logger: loggerMock,
  });
});

describe("fetchAllStations", () => {
  test("returns first non-empty response from active mirrors", async () => {
    // Arrange
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { name: "de1.api.radio-browser.info" },
        { name: "de2.api.radio-browser.info" },
      ],
    });

    const stations = [{ stationuuid: "1", name: "Radio" }];

    jest.spyOn(service, "fetchAllFromMirror").mockResolvedValueOnce(stations);

    // Act
    const result = await service.fetchAllStations("all");

    // Assert
    expect(result).toEqual(stations);
  });

  test("falls back to predefined mirrors when server list request fails", async () => {
    // Arrange
    fetchMock.mockRejectedValueOnce(new Error("network error"));

    jest
      .spyOn(service, "fetchAllFromMirror")
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ stationuuid: "2", name: "Fallback Radio" }]);

    // Act
    const result = await service.fetchAllStations();

    // Assert
    expect(result).toEqual([{ stationuuid: "2", name: "Fallback Radio" }]);
  });
});
