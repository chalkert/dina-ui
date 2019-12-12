import { ApiClientContext, createContextValue } from "common-ui";
import { mount } from "enzyme";
import { ObjectStoreDetailsPage } from "../../pages/media-uploadView/detailView";

/** Test file response. */
const TEST_FILE_RESPONSE = {
  body: "image blob body",
  headers: {
    connection: "keep-alive",
    "content-disposition":
      'form-data; name="attachment"; filename="9d18a6a1-c9de-4780-a7ee-8201816fbc35.PNG"',
    "content-length": "44042",
    "content-type": "image/png",
    date: "Tue, 12 Nov 2019 19:32:24 GMT"
  },
  status: 200
};

/** Test file response. */
const TEST_METADATA_RESPONSE = {
  data: [
    {
      metadata: {
        acDigitizationDate: "2019-11-25T07:30:00.175-05:00",
        acHashFunction: "SHA-1",
        acHashValue: "fa7b84eafd08fbc1f9d27a48b68d89b52a83f178",
        acMetadataCreator: {
          displayName: "Chris",
          email: "chris.gendre@canada.ca",
          id: "c1cd8a18-72d5-48a6-8e62-7e6aab6519ad",
          type: "agent"
        },
        bucket: "mybucket",
        dcFormat: "image/png",
        dcType: "Image",
        fileExtension: ".png",
        fileIdentifier: "82f95aa2-a55d-4269-89bf-918963ccca1a",
        id: "203f557a-bb5b-4aec-838b-c459b246de4a",
        originalFilename: "logo_347x50_PPa11y.png",
        type: "metadata",
        xmpMetadataDate: "2019-11-25T09:00:00.064-05:00"
      }
    }
  ]
};

const mockGet = jest.fn(async () => {
  return TEST_FILE_RESPONSE;
});

/** Mock Kitsu "get" method. */
const mockMetaGet = jest.fn(async () => {
  return TEST_METADATA_RESPONSE;
});

// Mock Kitsu, the client class that talks to the backend.
jest.mock(
  "kitsu",
  () =>
    class {
      public get = mockMetaGet;
      public axios = {
        get: mockGet
      };
    }
);

function mountWithContext(element: JSX.Element) {
  return mount(
    <ApiClientContext.Provider value={createContextValue()}>
      {element}
    </ApiClientContext.Provider>
  );
}

describe("Metadata detail view page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockGet.mockImplementation(async () => {
      return TEST_FILE_RESPONSE;
    });

    mockMetaGet.mockImplementation(async () => {
      return TEST_METADATA_RESPONSE;
    });
  });
  it("Provides a form to show the metadata section.", async done => {
    const wrapper = mountWithContext(
      <ObjectStoreDetailsPage router={{ query: { id: "100" } } as any} />
    );

    // Wait for the page to load.
    await Promise.resolve();
    wrapper.update();

    expect(wrapper.find(".spinner-border").exists()).toEqual(false);

    // The metadata section bucket name field should be rendered.
    expect(
      wrapper.containsMatchingElement(<strong>Bucket Name</strong>)
    ).toEqual(true);

    done();
  });
  it("Provides a form to show the image.", async done => {
    const wrapper = mountWithContext(
      <ObjectStoreDetailsPage router={{ query: { id: "100" } } as any} />
    );

    // Wait for the page to load.
    await Promise.resolve();
    wrapper.update();

    expect(wrapper.find(".spinner-border").exists()).toEqual(false);

    // The file's img tag should be rendered in a div due to the content type is image/png.
    expect(
      wrapper.containsMatchingElement(<img src="/api/v1/file/mybucket/100" />)
    ).toEqual(true);
    expect(wrapper.containsMatchingElement(<p>No File to display</p>)).toEqual(
      false
    );
    done();
  });
});