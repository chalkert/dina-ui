import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import ReactTable from "react-table";

const baseStyle = {
  alignItems: "center",
  backgroundColor: "#fafafa",
  borderColor: "#eeeeee",
  borderRadius: 2,
  borderStyle: "dashed",
  borderWidth: 2,
  color: "#bdbdbd",
  outline: "none",
  padding: "20px",
  transition: "border .24s ease-in-out",
  width: "50%"
};

const fileContent = new Map();

const FILE_TYPE_OPTIONS = [
  {
    label: "word doc",
    value: ".doc,.docx"
  },
  {
    label: "Adobe portable document format",
    value: ".pdf"
  },
  {
    label: "Image files",
    value: "image/*"
  },
  {
    label: "Audio files",
    value: "audio/*"
  },
  {
    label: "Video files",
    value: "video/*"
  },
  {
    label: "Archived files",
    value: ".zip"
  }
];
const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

let files;
let acceptableFileTypes = FILE_TYPE_OPTIONS[1].value;

function MediaUploadView() {
  const [selectedFileTypes, setSelectedFileTypes] = useState(
    FILE_TYPE_OPTIONS[1]
  );

  const handleChange = mySelectedFileTypes => {
    setSelectedFileTypes(mySelectedFileTypes);
    acceptableFileTypes = mySelectedFileTypes.map(option => {
      return option.value;
    });
  };

  const onDropAccepted = useCallback(dropAcceptedFiles => {
    dropAcceptedFiles.forEach(file => {
      const reader = new FileReader();
      const filename = file.name;
      reader.onload = () => {
        const binaryStr = reader.result;
        fileContent.set(filename, binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    accept: acceptableFileTypes,
    onDropAccepted
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  files = acceptedFiles.map(file => ({
    fileContent: fileContent.get(file.name),
    fileName: file.name
  }));

  return (
    <div>
      <div className="row">
        <div {...getRootProps({ style })} id="dropZone">
          <input {...getInputProps()} />
          <div style={{ textAlign: "center" }}>
            <h5>Drag and drop files here or click to open browse dialog</h5>
            <h5>(Only image, audio, video, .pdf, .doc and docx are accepted</h5>
            <h5>
              Please use the right side dropdown to select the prefered file
              types)
            </h5>
          </div>
        </div>
        <div id="fileTypesSelector">
          <Select
            classNamePrefix="react_select"
            isMulti={true}
            value={selectedFileTypes}
            onChange={handleChange}
            options={FILE_TYPE_OPTIONS}
          />
        </div>
      </div>

      <ReactTable
        className="-striped"
        data={files}
        columns={[
          {
            Header: "File Name",
            accessor: "fileName"
          },
          {
            Header: "File Content",
            accessor: "fileContent",
            show: false
          },
          {
            Cell: () => {
              return <input type="checkbox" />;
            },
            Header: "Select items"
          }
        ]}
      />
    </div>
  );
}

export default MediaUploadView;
