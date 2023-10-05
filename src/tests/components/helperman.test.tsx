import {
  ConvertCoordToPoint,
  ConvertPointToCoord,
  GlobalApiUrlWithId,
} from "@/app/Components/Helperman";

describe("Helperman.ts Functions", () => {
  describe("ConvertCoordToPoint", () => {
    it("should convert coordinates to points", () => {
      const coords = [50, 100];
      const mapSize = [200, 400];
      const result = ConvertCoordToPoint(coords, mapSize);
      expect(result).toEqual([0.25, 0.25]);
    });
  });

  describe("ConvertPointToCoord", () => {
    it("should convert points to coordinates", () => {
      const points = [0.25, 0.25];
      const mapSize = [200, 400];
      const result = ConvertPointToCoord(points, mapSize);
      expect(result).toEqual([50, 100]);
    });
  });

  describe("GlobalApiUrlWithId", () => {
    it("should generate the correct URL with ID", () => {
      const id = 123;
      const result = GlobalApiUrlWithId(id);
      expect(result).toBe("/api/testendpoint/123");
    });
  });
});
