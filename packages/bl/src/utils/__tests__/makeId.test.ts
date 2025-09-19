import { makeId } from "../makeId";

describe("test for makeId function ", () => {
  it("should return a new uuid", () => {
    const v4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    const res = makeId();

    expect(res).toMatch(v4);
  });
});
