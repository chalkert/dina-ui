import {
  ApiClientContext,
  ErrorViewer,
  SaveArgs,
  SubmitButton
} from "common-ui";
import { Form, Formik, FormikActions } from "formik";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Metadata } from "types/objectstore-api/resources/Metadata";
import { Head, Nav } from "../components";
import {
  ObjectStoreMessage,
  useObjectStoreIntl
} from "../intl/objectstore-intl";

export interface FileUploadResponse {
  fileName: string;
  fileType: string;
  size: string;
}

const baseStyle = {
  alignItems: "center",
  backgroundColor: "#fafafa",
  borderColor: "#eeeeee",
  borderRadius: 2,
  borderStyle: "dashed",
  borderWidth: 2,
  color: "#bdbdbd",
  display: "flex",
  flex: 1,
  flexDirectionProperty: "column",
  outline: "none",
  padding: "20px",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const BUCKET_NAME = "mybucket";

export default function UploadPage() {
  const router = useRouter();
  const { formatMessage } = useObjectStoreIntl();
  const { apiClient, save } = useContext(ApiClientContext);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    accept: "image/*,audio/*,video/*,.pdf,.doc,docx,.png"
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

  async function onSubmit(_, { setStatus, setSubmitting }: FormikActions<any>) {
    setStatus(null);
    try {
      // Upload each file in a separate request, then create the metadatas in a transaction.
      // TODO: Do all of this in a single transaction.

      const uploadResponses: FileUploadResponse[] = [];
      for (const file of acceptedFiles) {
        // Wrap the file in a FormData:
        const formData = new FormData();
        formData.append("file", file);

        // Upload the file:
        const response = await apiClient.axios.post(
          `/v1/file/${BUCKET_NAME}`,
          formData
        );
        uploadResponses.push(response.data);
      }

      const saveOperations = uploadResponses.map<SaveArgs<Metadata>>(res => ({
        resource: {
          bucket: BUCKET_NAME,
          dcType: "Image",
          fileExtension: "",
          fileIdentifier: res.fileName,
          type: "metadata",
          uuid: ""
        },
        type: "metadata"
      }));

      const saveResults = await save(saveOperations);

      const ids = saveResults.map(res => res.id).join(",");

      router.push({
        pathname: "/metadata/edit",
        query: { ids }
      });
    } catch (err) {
      setStatus(err.message);
    }
    setSubmitting(false);
  }

  return (
    <div>
      <Head title={formatMessage("uploadPageTitle")} />
      <Nav />
      <div className="container">
        <div id="dndRoot" style={{ cursor: "pointer" }}>
          <div {...getRootProps({ style })} className="root">
            <input {...getInputProps()} />
            <div style={{ margin: "auto" }}>
              <div>
                <ObjectStoreMessage id="uploadFormInstructions" />
              </div>
            </div>
          </div>
          <ul className="list-group">
            {acceptedFiles.map(file => (
              <li className="list-group-item" key={file.name}>
                {file.name} - {file.size} bytes
              </li>
            ))}
          </ul>
          {acceptedFiles.length ? (
            <Formik initialValues={{}} onSubmit={onSubmit}>
              <Form>
                <ErrorViewer />
                <SubmitButton>Upload</SubmitButton>
              </Form>
            </Formik>
          ) : null}
        </div>
      </div>
    </div>
  );
}