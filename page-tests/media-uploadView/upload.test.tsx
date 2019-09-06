/* eslint react/prop-types: 0, jsx-a11y/label-has-for: 0 */
// import { cleanup, render, fireEvent, waitForElement } from "@testing-library/react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import MediaUploadView from "../../pages/media-uploadView/upload";

describe("MediaUploadView test", () => {
  let files;
  beforeEach(() => {
    files = [createFile("file1.pdf", 1111, "application/pdf")];
  });

  afterEach(cleanup);

  it("Renders the root and input nodes with the necessary props", () => {
    const { container } = render(<MediaUploadView />);
    const rootDiv = container.querySelector("div");
    expect(rootDiv).toHaveProperty("style.border-color");
    expect(rootDiv.querySelector("div#dropZone>input")).toHaveProperty(
      "multiple"
    );
  });

  it("When dropped the files, react table get populated with file names", async () => {
    const event = createDtWithFiles(files);
    const ui = <MediaUploadView />;
    const { container } = render(ui);
    const dropzone = container.querySelector("#dropZone");
    dispatchEvt(dropzone, "drop", event);
    await flushPromises(ui, container);
    expect(
      container.querySelector("div.rt-tbody div.rt-td").innerHTML
    ).toContain("file1.pdf");
  });

  it("Renders the multi select dropdown with initial values of all file types", () => {
    const { container } = render(<MediaUploadView />);
    const multivalueOptions = container.querySelector(
      ".react_select__multi-value__label"
    );
    expect(multivalueOptions.innerHTML).toContain(
      "Adobe portable document format"
    );
  });

  it("Upon dropdown selection change, update the drag and drop zone available file types", async () => {
    const ui = <MediaUploadView />;
    const { container } = render(ui);
    const option = await waitForElement(
      () => container.querySelector("div.react_select__multi-value__remove"),
      { container }
    );
    fireEvent.click(option);
    await flushPromises(ui, container);
    const dropZoneInput = container.querySelector("div#dropZone input[accept]");
    expect(dropZoneInput).toHaveProperty("accept", "");
  });
});

function createFile(name, size, type) {
  const file = new File([], name, { type });
  Object.defineProperty(file, "size", {
    get() {
      return size;
    }
  });
  return file;
}

function createDtWithFiles(files = []) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        getAsFile: () => file,
        kind: "file",
        type: file.type
      })),
      types: ["Files"]
    }
  };
}

function dispatchEvt(node, type, data) {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, data);

  event.preventDefault();
  node.dispatchEvent(event);
}

function flushPromises(ui, container) {
  return new Promise(resolve =>
    global.setImmediate(() => {
      render(ui, { container });
      resolve(container);
    })
  );
}
