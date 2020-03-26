import { QueryTable } from "common-ui";
import RegionListPage from "../../../pages/region/list";
import { mountWithAppContext } from "../../../test-util/mock-app-context";
import { Region } from "../../../types/seqdb-api/resources/Region";

// Mock out the Link component, which normally fails when used outside of a Next app.
jest.mock("next/link", () => ({ children }) => <div>{children}</div>);

const TEST_REGIONS: Region[] = [
  {
    description: "description",
    id: "4",
    name: "Test Region 1",
    symbol: "symbol",
    type: "region"
  },
  {
    description: "description",
    id: "5",
    name: "Test Region 2",
    symbol: "symbol",
    type: "region"
  }
];

/** Mock Kitsu "get" method. */
const mockGet = jest.fn(async () => {
  return {
    data: TEST_REGIONS
  };
});

// Mock Kitsu, the client class that talks to the backend.
jest.mock(
  "kitsu",
  () =>
    class {
      public get = mockGet;
    }
);

describe("Region list page", () => {
  it("Renders the list page.", async () => {
    const wrapper = mountWithAppContext(<RegionListPage />);

    await new Promise(setImmediate);
    wrapper.update();

    // Check that the table contains the links to region details pages.
    expect(wrapper.containsMatchingElement(<a>Test Region 1</a>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<a>Test Region 2</a>)).toEqual(true);
  });

  it("Allows a filterable search.", async () => {
    const wrapper = mountWithAppContext(<RegionListPage />);

    // Wait for the default search to finish.
    await new Promise(setImmediate);
    wrapper.update();

    // Enter a search value.
    wrapper
      .find("input.filter-value")
      .simulate("change", { target: { value: "omni" } });

    // Submit the search form.
    wrapper.find("form").simulate("submit");

    await new Promise(setImmediate);
    wrapper.update();

    expect(mockGet).lastCalledWith(
      "region",
      expect.objectContaining({ filter: { rsql: "name==*omni*" } })
    );
    expect(wrapper.find(QueryTable).prop("filter")).toEqual({
      rsql: "name==*omni*"
    });
  });
});