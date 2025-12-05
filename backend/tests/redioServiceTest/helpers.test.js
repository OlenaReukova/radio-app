import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { createRadioService } from "../../radioService.js";

let fetchMock, dbMock, loggerMock, config, service;

beforeEach(() => {
  fetchMock = jest.fn();
  dbMock = { execute: jest.fn() };
  loggerMock = { log: jest.fn(), error: jest.fn() };
  config = { batchSize: 2, defaultTimeout: 50 };
  service = createRadioService({
    fetch: fetchMock,
    db: dbMock,
    config,
    logger: loggerMock,
  });
});

describe("isValidUrl helper", () => {
  test("filters out stations with invalid URL format", async () => {
    // Arrange
    const stations = [
      {
        stationuuid: "good",
        url_resolved: "https://valid.com",
        name: "Okay",
        country: "",
        tags: "",
        favicon: "",
      },
      {
        stationuuid: "bad",
        url_resolved: "not-a-url",
        name: "Bad",
      },
    ];

    dbMock.execute.mockResolvedValue({});

    // Act
    await service.saveStationsToDB(stations);

    // Assert
    expect(dbMock.execute).toHaveBeenCalledTimes(1);
    const savedParams = dbMock.execute.mock.calls[0][1];
    expect(savedParams[0]).toBe("good");
  });
});

describe("fetchWithTimeout helper", () => {
  test("returns JSON when response is OK", async () => {
    // Arrange
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ stationuuid: "1", name: "Test Station" }],
    });

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    // Act
    const result = await service.fetchAllFromMirror("https://mirror", "");

    // Assert
    expect(result).toEqual([{ stationuuid: "1", name: "Test Station" }]);
  });

  describe("getActiveMirrors helper", () => {
    test("returns active mirrors when fetch succeeds", async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { name: "de1.api.radio-browser.info" },
          { name: "fi1.api.radio-browser.info" },
        ],
      });

      jest
        .spyOn(service, "fetchAllFromMirror")
        .mockResolvedValueOnce([{ stationuuid: "123" }]);

      // Act
      const result = await service.fetchAllStations();

      // Assert
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.length).toBe(1);
    });

    test("returns fallback mirror list when fetch fails", async () => {
      // Arrange
      fetchMock.mockRejectedValueOnce(new Error("network error"));

      jest
        .spyOn(service, "fetchAllFromMirror")
        .mockResolvedValueOnce([{ stationuuid: "fallback" }]);

      // Act
      const result = await service.fetchAllStations();

      // Assert
      expect(result[0].stationuuid).toBe("fallback");
    });
  });
});
