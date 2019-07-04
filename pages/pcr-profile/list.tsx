import Link from "next/link";
import { ColumnDefinition, Head, ListPageLayout, Nav } from "../../components";
import { PcrProfile } from "../../types/seqdb-api/resources/PcrProfile";

const PCRPROFILE_TABLE_COLUMNS: Array<ColumnDefinition<PcrProfile>> = [
  {
    Header: "Group Name",
    accessor: "group.groupName"
  },
  "region.name",
  {
    Cell: ({ original: { id, name } }) => (
      <Link href={`/pcr-profile/view?id=${id}`}>
        <a>{name}</a>
      </Link>
    ),
    Header: "Name",
    accessor: "name"
  },
  "application",
  "step3"
];

const PCRPROFILE_FILTER_ATTRIBUTES = ["name", "application"];

export default function PcrProfileListPage() {
  return (
    <div>
      <Head title="PCR Profiles" />
      <Nav />
      <div className="container-fluid">
        <h1>Thermocycler Profiles</h1>
        <Link href="/pcr-profile/edit" prefetch={true}>
          <a>Add Thermocycler Profile</a>
        </Link>
        <ListPageLayout
          filterAttributes={PCRPROFILE_FILTER_ATTRIBUTES}
          queryTableProps={{
            columns: PCRPROFILE_TABLE_COLUMNS,
            include: "group,region",
            path: "thermocyclerprofile"
          }}
        />
      </div>
    </div>
  );
}
