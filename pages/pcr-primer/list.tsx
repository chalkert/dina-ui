import Link from "next/link";
import { ColumnDefinition, Head, Nav } from "../../components";
import {
  editableColumn,
  EditableQueryTable
} from "../../components/table/EditableQueryTable";
import { PcrPrimer } from "../../types/seqdb-api/resources/PcrPrimer";

const PCRPRIMER_TABLE_COLUMNS: Array<ColumnDefinition<PcrPrimer>> = [
  {
    Cell: ({ original: { id, name } }) => (
      <Link href={`/pcr-primer/view?id=${id}`}>
        <a>{name}</a>
      </Link>
    ),
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Group Name",
    accessor: "group.groupName"
  },
  "region.name",
  "type",
  "lotNumber",
  editableColumn("application"),
  "direction",
  "seq",
  "tmCalculated"
];

export default function PcrPrimerListPage() {
  return (
    <div>
      <Head title="PCR Primers" />
      <Nav />
      <div className="container-fluid">
        <h1>PCR Primers</h1>
        <Link href="/pcr-primer/edit" prefetch={true}>
          <a>Add PCR Primer</a>
        </Link>
        <EditableQueryTable
          columns={PCRPRIMER_TABLE_COLUMNS}
          include="group,region"
          path="pcrPrimer"
        />
      </div>
    </div>
  );
}
