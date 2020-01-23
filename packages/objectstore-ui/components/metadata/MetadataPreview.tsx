import { LoadingSpinner, useQuery } from "common-ui";
import Link from "next/link";
import { ObjectStoreMessage } from "../../intl/objectstore-intl";
import { Metadata } from "../../types/objectstore-api";
import { FileView } from "../file-view/FileView";
import { MetadataDetails } from "./MetadataDetails";

interface MetadataPreviewProps {
  metadataId: string;
}

const METADATA_PREVIEW_STYLE = `
  .file-viewer-wrapper img {
    height: 12rem;
  }
`;

/**
 * Metadata preview component to be used on the side panel of the Metadata list page.
 */
export function MetadataPreview({ metadataId }: MetadataPreviewProps) {
  const { loading, response } = useQuery<Metadata>({
    path: `metadata/${metadataId}?include=managedAttributeMap`
  });

  if (loading) {
    return <LoadingSpinner loading={true} />;
  }

  if (response) {
    const metadata = response.data;

    const filePath = `/api/v1/file/${metadata.bucket}/${metadata.fileIdentifier}`;
    const fileType = metadata.fileExtension.replace(/\./, "").toLowerCase();

    return (
      <>
        <style>{METADATA_PREVIEW_STYLE}</style>
        <div>
          <Link href={`/metadata/edit?ids=${metadataId}`}>
            <a className="btn btn-primary">
              <ObjectStoreMessage id="editButtonText" />
            </a>
          </Link>
        </div>
        <a href={filePath}>
          <FileView filePath={filePath} fileType={fileType} />
        </a>
        <MetadataDetails metadata={metadata} />
      </>
    );
  }

  return null;
}