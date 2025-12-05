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

describe("getStationsFromDB", () => {
  test("builds WHERE clause when filters are provided", async () => {
    // Arrange
    dbMock.execute.mockResolvedValue({
      rows: [{ stationuuid: "1", name: "Rock Radio" }],
    });

    // Act
    const result = await service.getStationsFromDB({
      country: "UK",
      genre: "rock",
    });

    // Assert
    const [sql, params] = dbMock.execute.mock.calls[0];

    expect(sql).toMatch(/WHERE/);
    expect(params).toEqual(["UK", "%rock%"]);
    expect(result).toHaveLength(1);
  });

  test("does not include WHERE when no filters are provided", async () => {
    // Arrange
    dbMock.execute.mockResolvedValue({ rows: [] });

    // Act
    await service.getStationsFromDB({});

    // Assert
    const [sql, params] = dbMock.execute.mock.calls[0];

    expect(sql).not.toMatch(/WHERE/);
    expect(params).toEqual([]);
  });
});
