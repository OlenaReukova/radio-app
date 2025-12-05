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

describe("fetchAllFromMirror — pagination", () => {
  test("requests multiple pages until an empty page is returned", async () => {
    // Arrange
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stationuuid: "a", name: "A" },
          { stationuuid: "b", name: "B" },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stationuuid: "c", name: "C" },
          { stationuuid: "d", name: "D" },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    const mirror = "https://mirror.test";

    // Act
    const result = await service.fetchAllFromMirror(mirror, "");

    // Assert
    expect(result.map((r) => r.stationuuid)).toEqual(["a", "b", "c", "d"]);
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const calledUrls = fetchMock.mock.calls.map((call) => call[0].toString());
    expect(calledUrls[0]).toContain("offset=0");
    expect(calledUrls[1]).toContain("offset=2");
    expect(calledUrls[2]).toContain("offset=4");
  });
});

describe("fetchAllFromMirror — duplicates", () => {
  test("filters out stations with duplicate stationuuid values", async () => {
    // Arrange
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stationuuid: "x", name: "X" },
          { stationuuid: "y", name: "Y" },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { stationuuid: "y", name: "Y duplicate" },
          { stationuuid: "z", name: "Z" },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    const mirror = "https://mirror.test";

    // Act
    const result = await service.fetchAllFromMirror(mirror, "");

    // Assert
    expect(result.map((r) => r.stationuuid)).toEqual(["x", "y", "z"]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
