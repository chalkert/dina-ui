import { CheckBoxFieldProps } from "common-ui";
import { PersistedResource } from "kitsu";
import Link from "next/link";
import { ObjectStoreMessage } from "../../intl/objectstore-intl";
import { Metadata } from "../../types/objectstore-api";
import { FileView } from "../file-view/FileView";

interface StoredObjectGalleryProps {
  /** The GroupedCheckBox component for selecting Metadatas to edit. */
  CheckBoxField: React.ComponentType<CheckBoxFieldProps<Metadata>>;

  /** The displayed Metadatas. */
  metadatas: Array<PersistedResource<Metadata>>;

  /** Called when a Metadata is selected for preview. */
  onSelectPreviewMetadataId: (id: string) => void;

  /** The ID of the currently previewed Metadata. */
  previewMetadataId: string | null;
}

const GALLERY_STYLE = `
  .stored-object-gallery file-viewer-wrapper, .stored-object-gallery img {
    height: 7rem;
  }
`;

const HIGHLIGHT_COLOR = "rgb(222, 252, 222)";

/**
 * Shows a list of Metadatas as a gallery view with thumbnails.
 */
export function StoredObjectGallery({
  CheckBoxField,
  metadatas,
  onSelectPreviewMetadataId,
  previewMetadataId
}: StoredObjectGalleryProps) {
  return (
    <div className="stored-object-gallery">
      <style>{GALLERY_STYLE}</style>
      <ul className="m-3 list-inline">
        {metadatas.map(metadata => {
          const { bucket, fileIdentifier, id, originalFilename } = metadata;
          return (
            <li className="m-1 list-inline-item" key={id}>
              <div
                className="card card-body"
                style={{
                  backgroundColor:
                    previewMetadataId === id ? HIGHLIGHT_COLOR : undefined,
                  maxWidth: "15rem"
                }}
              >
                <FileView
                  filePath={`/api/v1/file/${bucket}/${fileIdentifier}.thumbnail`}
                  fileType="jpg"
                />
                <div style={{ margin: "auto auto 1rem auto" }}>
                  <Link href={`/object/view?id=${id}`}>
                    <a>{originalFilename}</a>
                  </Link>
                </div>
                <div className="row">
                  <div className="col-9">
                    <button
                      className="btn btn-info w-100 preview-button"
                      onClick={() => onSelectPreviewMetadataId(id)}
                      type="button"
                    >
                      <ObjectStoreMessage id="viewPreviewButtonText" />
                    </button>
                  </div>
                  <div className="col-3">
                    <CheckBoxField resource={metadata} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}