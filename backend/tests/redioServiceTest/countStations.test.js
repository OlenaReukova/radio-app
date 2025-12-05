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

describe("countStations", () => {
  test("parses DB count result into a number", async () => {
    // Arrange
    dbMock.execute.mockResolvedValue({
      rows: [{ count: "7" }],
    });

    // Act
    const count = await service.countStations();

    // Assert
    expect(count).toBe(7);
    expect(dbMock.execute).toHaveBeenCalledWith(
      "SELECT COUNT(*) AS count FROM stations"
    );
  });
});
