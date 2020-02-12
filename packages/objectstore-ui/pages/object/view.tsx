import { LoadingSpinner, useQuery } from "common-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head, Nav } from "../../components";
import { FileView } from "../../components/file-view/FileView";
import { MetadataDetails } from "../../components/metadata/MetadataDetails";
import { appConfig } from "../../config";
import { ObjectStoreMessage } from "../../intl/objectstore-intl";
import { Metadata } from "../../types/objectstore-api";

const appVersion = appConfig.version;

const OBJECT_DETAILS_PAGE_CSS = `
  .file-viewer-wrapper img {
    max-width: 100%;
    height: auto;
  }
`;

export default function MetadataViewPage() {
  const router = useRouter();

  const { id } = router.query;

  const { loading, response } = useQuery<Metadata>({
    path: appVersion + `/metadata/${id}?include=managedAttributeMap`
  });

  if (loading) {
    return <LoadingSpinner loading={true} />;
  }

  if (response) {
    const metadata = response.data;

    const filePath =
      "/api/" +
      appVersion +
      `/file/${metadata.bucket}/${metadata.fileIdentifier}`;
    const fileType = metadata.fileExtension.replace(/\./, "").toLowerCase();

    return (
      <div>
        <Head title={metadata.originalFilename} />
        <Nav />
        <style>{OBJECT_DETAILS_PAGE_CSS}</style>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <a href={filePath}>
                <FileView filePath={filePath} fileType={fileType} />
              </a>
            </div>
            <div className="col-md-8">
              <div className="container">
                <div>
                  <Link href={`/metadata/edit?ids=${id}`}>
                    <a className="btn btn-primary">
                      <ObjectStoreMessage id="editButtonText" />
                    </a>
                  </Link>
                </div>
                <MetadataDetails metadata={metadata} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
