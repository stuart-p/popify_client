import { detectTokenQueries } from "./queryHandler.js";

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
});
