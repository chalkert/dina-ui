import { Head, Nav } from "../../components";

import { withRouter } from "next/router";
import { FilterBuilder } from "../../components/filter-builder/FilterBuilder";

export function GalleryViewFormPage() {
  return (
    <div>
      <Head title="Gallery View" />
      <Nav />
      <div className="container-fluid">
        <div>
          <h4>Gallery View</h4>
          <GalleryViewForm />
        </div>
      </div>
    </div>
  );
}

function GalleryViewForm() {
  return (
    <div className="row">
      <div className="col-md-6 ">
        <h6> Filter Search</h6>
        <FilterBuilder filterAttributes={META_SEARCH_OPTIONS} />
      </div>
    </div>
  );
}
const META_SEARCH_OPTIONS = [
  "fileExtension",
  "bucket",
  "dcFormat",
  "dcType",
  "agent.displayName",
  "managedAttribute.name",
  "managedAttribute.type"
];

export default withRouter(GalleryViewFormPage);
