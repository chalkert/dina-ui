import PcrProfileListPage from "../../../pages/pcr-profile/list";
import { mountWithAppContext } from "../../../test-util/mock-app-context";
import { PcrProfile } from "../../../types/seqdb-api/resources/PcrProfile";

// Mock out the Link component, which normally fails when used outside of a Next app.
jest.mock("next/link", () => ({ children }) => <div>{children}</div>);

const TEST_PROFILES: PcrProfile[] = [
  {
    group: { id: "1", groupName: "Test Group", type: "group" },
    id: "4",
    name: "Test Profile 1",
    type: "PRORILE"
  },
  {
    group: { id: "1", groupName: "Test Group", type: "group" },
    id: "5",
    name: "Test Profile 2",
    type: "PROFILE"
  }
];

/** Mock Kitsu "get" method. */
const mockGet = jest.fn(async () => {
  return {
    data: TEST_PROFILES
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

describe("PcrProfile list page", () => {
  it("Renders the list page.", async () => {
    const wrapper = mountWithAppContext(<PcrProfileListPage />);

    await new Promise(setImmediate);
    wrapper.update();

    // Check that the table contains the links to profile details pages.
    expect(wrapper.containsMatchingElement(<a>Test Profile 1</a>)).toEqual(
      true
    );
    expect(wrapper.containsMatchingElement(<a>Test Profile 2</a>)).toEqual(
      true
    );
  });
});