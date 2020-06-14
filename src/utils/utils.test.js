import { detectTokenQueries } from "./queryHandler.js";
import {
  findResultsTitle,
  determineNextAndPreviousSetSearchParams,
  gatherResultItemsArray,
} from "./dataHandler.js";

describe("utility function tests", () => {
  describe("queryHandler", () => {
    describe("detectTokenQueries", () => {
      it("function returns an object", () => {
        const output = detectTokenQueries();
        expect(typeof output).toBe("object");
      });
      it("returned object contains a containsAuth key", () => {
        const output = detectTokenQueries();
        expect(output).toHaveProperty("containsAuth");
      });
      it("containsAuth set to false if no auth tokens present in input", () => {
        const outputOne = detectTokenQueries();
        const outputTwo = detectTokenQueries("randomString");
        const outputThree = detectTokenQueries("?randomQuery=4&notAuth=abc123");
        expect(outputOne.containsAuth).toBe(false);
        expect(outputTwo.containsAuth).toBe(false);
        expect(outputThree.containsAuth).toBe(false);
      });
      it("auth token is added to the access_token key", () => {
        const inputQuery =
          "access_token=BQBaKWf0qcGgP1aiHUbXz7FCInIXEFXP78oakv7dkpm4fkIV-4_533vOuSg9bvYMfgSvjFkeXGoi6oNuAgNpuL0jzjsTGwGxpmii4_20lMEIMEk7x3shX8OSq7d7rHsllYpvCvcUvG25ByWFmvUWGxVyY7uDgnA&refresh_token=AQC33X2WNEBsWnY6On6-EkfnY0ljjqtP0jT4ticyQ7TQfHSnxfh5ZHEqe-ZfLMdcy37Bpfqpg0vi7JI3HCRSJqYbyKGqegS_vhnUA4aGEfSXwpxvE_bHnx6ROoyRvC_Foks";
        const output = detectTokenQueries(inputQuery);
        expect(output.access_token).toBe(
          "BQBaKWf0qcGgP1aiHUbXz7FCInIXEFXP78oakv7dkpm4fkIV-4_533vOuSg9bvYMfgSvjFkeXGoi6oNuAgNpuL0jzjsTGwGxpmii4_20lMEIMEk7x3shX8OSq7d7rHsllYpvCvcUvG25ByWFmvUWGxVyY7uDgnA"
        );
      });
      it("refresh token is added to the refresh_token key", () => {
        const inputQuery =
          "access_token=BQBaKWf0qcGgP1aiHUbXz7FCInIXEFXP78oakv7dkpm4fkIV-4_533vOuSg9bvYMfgSvjFkeXGoi6oNuAgNpuL0jzjsTGwGxpmii4_20lMEIMEk7x3shX8OSq7d7rHsllYpvCvcUvG25ByWFmvUWGxVyY7uDgnA&refresh_token=AQC33X2WNEBsWnY6On6-EkfnY0ljjqtP0jT4ticyQ7TQfHSnxfh5ZHEqe-ZfLMdcy37Bpfqpg0vi7JI3HCRSJqYbyKGqegS_vhnUA4aGEfSXwpxvE_bHnx6ROoyRvC_Foks";
        const output = detectTokenQueries(inputQuery);
        expect(output.refresh_token).toBe(
          "AQC33X2WNEBsWnY6On6-EkfnY0ljjqtP0jT4ticyQ7TQfHSnxfh5ZHEqe-ZfLMdcy37Bpfqpg0vi7JI3HCRSJqYbyKGqegS_vhnUA4aGEfSXwpxvE_bHnx6ROoyRvC_Foks"
        );
      });
      it("containsAuth set to true if tokens have been found in the query string", () => {
        const inputQuery =
          "access_token=BQBaKWf0qcGgP1aiHUbXz7FCInIXEFXP78oakv7dkpm4fkIV-4_533vOuSg9bvYMfgSvjFkeXGoi6oNuAgNpuL0jzjsTGwGxpmii4_20lMEIMEk7x3shX8OSq7d7rHsllYpvCvcUvG25ByWFmvUWGxVyY7uDgnA&refresh_token=AQC33X2WNEBsWnY6On6-EkfnY0ljjqtP0jT4ticyQ7TQfHSnxfh5ZHEqe-ZfLMdcy37Bpfqpg0vi7JI3HCRSJqYbyKGqegS_vhnUA4aGEfSXwpxvE_bHnx6ROoyRvC_Foks";
        const output = detectTokenQueries(inputQuery);
        expect(output.containsAuth).toBe(true);
      });
    });
  });
  describe("dataHandler", () => {
    describe("findResultsTitle", () => {
      it("function returns a string value", () => {
        const output = findResultsTitle();
        expect(typeof output).toBe("string");
      });
      it("when passed an object with a key of albums and and href key with the original search query, returns showing Albums for `search title`", () => {
        const input = {
          albums: {
            href:
              "https://api.spotify.com/v1/search?query=test&type=album&offset=0&limit=20",
          },
        };
        const output = findResultsTitle(input);
        expect(output).toBe("Showing Albums for 'test'");
      });
      it("when passed an object with a key of artists and an href key with the original search query, returns showing Artists for `search title`", () => {
        const input = {
          artists: {
            href:
              "https://api.spotify.com/v1/search?query=test&type=artist&offset=0&limit=20",
          },
        };
        const output = findResultsTitle(input);
        expect(output).toBe("Showing Artists for 'test'");
      });
    });
    describe("determineNextAndPreviousSetSearchParams", () => {
      it("when passed a null string, returns an object with key isAvailable:false", () => {
        const output = determineNextAndPreviousSetSearchParams(null);
        expect(output.isAvailable).toBe(false);
      });
      it("when passed a string with a query field, returns an object with a query key with the populated query value", () => {
        const input =
          "https://api.spotify.com/v1/search?query=dora&type=track&offset=20&limit=20";
        const output = determineNextAndPreviousSetSearchParams(input);
        expect(output.query).toBe("dora");
      });
      it("when passed a string with a type field, returns and object with a type field populated with the type value", () => {
        const input =
          "https://api.spotify.com/v1/search?query=dora&type=track&offset=20&limit=20";
        const output = determineNextAndPreviousSetSearchParams(input);
        expect(output.type).toBe("track");
      });
      it("when passed a string with an offset field, returns an object with an offset field with offset value", () => {
        const input =
          "https://api.spotify.com/v1/search?query=dora&type=track&offset=20&limit=20";
        const output = determineNextAndPreviousSetSearchParams(input);
        expect(output.offset).toBe(20);
      });
      it("when passed a string with a limit field, retusn an object with a limit field with limit value", () => {
        const input =
          "https://api.spotify.com/v1/search?query=dora&type=track&offset=20&limit=20";
        const output = determineNextAndPreviousSetSearchParams(input);
        expect(output.limit).toBe(20);
      });
      it("when passed a string with all valid search parameters, isAvailable is set to true", () => {
        const input =
          "https://api.spotify.com/v1/search?query=dora&type=track&offset=20&limit=20";
        const output = determineNextAndPreviousSetSearchParams(input);
        expect(output.isAvailable).toBe(true);
      });
    });
    describe("gatherResultItemsArray", () => {
      it("when passed an empty object, returns an empty array", () => {
        const output = gatherResultItemsArray({});
        expect(Array.isArray(output)).toBe(true);
      });
      it("when passed an artist search result, returns an array of item results", () => {
        const input = {
          artists: {
            href:
              "https://api.spotify.com/v1/search?query=tania+bowra&offset=0&limit=20&type=artist",
            items: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q",
                },
                genres: [],
                href:
                  "https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q",
                id: "08td7MxkoHQkXnWAYD8d6Q",
                images: [
                  {
                    height: 640,
                    url:
                      "https://i.scdn.co/image/f2798ddab0c7b76dc2d270b65c4f67ddef7f6718",
                    width: 640,
                  },
                  {
                    height: 300,
                    url:
                      "https://i.scdn.co/image/b414091165ea0f4172089c2fc67bb35aa37cfc55",
                    width: 300,
                  },
                  {
                    height: 64,
                    url:
                      "https://i.scdn.co/image/8522fc78be4bf4e83fea8e67bb742e7d3dfe21b4",
                    width: 64,
                  },
                ],
                name: "Tania Bowra",
                popularity: 0,
                type: "artist",
                uri: "spotify:artist:08td7MxkoHQkXnWAYD8d6Q",
              },
            ],
            limit: 20,
            next: null,
            offset: 0,
            previous: null,
            total: 1,
          },
        };
        const expected = [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q",
            },
            genres: [],
            href: "https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q",
            id: "08td7MxkoHQkXnWAYD8d6Q",
            images: [
              {
                height: 640,
                url:
                  "https://i.scdn.co/image/f2798ddab0c7b76dc2d270b65c4f67ddef7f6718",
                width: 640,
              },
              {
                height: 300,
                url:
                  "https://i.scdn.co/image/b414091165ea0f4172089c2fc67bb35aa37cfc55",
                width: 300,
              },
              {
                height: 64,
                url:
                  "https://i.scdn.co/image/8522fc78be4bf4e83fea8e67bb742e7d3dfe21b4",
                width: 64,
              },
            ],
            name: "Tania Bowra",
            popularity: 0,
            type: "artist",
            uri: "spotify:artist:08td7MxkoHQkXnWAYD8d6Q",
          },
        ];
        const output = gatherResultItemsArray(input);
        expect(output).toEqual(expected);
      });
    });
  });
});
