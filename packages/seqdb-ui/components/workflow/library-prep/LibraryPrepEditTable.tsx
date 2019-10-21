import {
  ApiClientContext,
  ColumnDefinition,
  NumberField,
  QueryTable,
  safeSubmit,
  SubmitButton,
  TextField,
  useQuery
} from "common-ui";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import {
  Chain,
  ChainStepTemplate,
  LibraryPrep,
  LibraryPrepBatch,
  StepResource
} from "../../../types/seqdb-api";

interface SampleToIndexTableProps {
  chain: Chain;
  libraryPrepBatch: LibraryPrepBatch;
  sampleSelectionStep: ChainStepTemplate;
}

export function LibraryPrepEditTable({
  chain,
  libraryPrepBatch,
  sampleSelectionStep
}: SampleToIndexTableProps) {
  const { save } = useContext(ApiClientContext);

  // Current visible sample StepResources in the "sample selection" table.
  const [visibleSampleSrs, setVisibleSampleSrs] = useState<StepResource[]>([]);

  // Timestamp of the last table save.
  const [lastPrepTableSave, setLastPrepTableSave] = useState<number>();

  // The values to initialize the Formik form.
  const [formikValues, setFormikValues] = useState({ sampleSrs: [] });

  // Query the libraryPreps of this batch.
  const { loading: libraryPrepsLoading } = useQuery<LibraryPrep[]>(
    {
      // Optimize query speed by reducing the amount of requested fields.
      fields: {
        sample: "name"
      },
      include: "sample",
      page: { limit: 1000 },
      path: `libraryPrepBatch/${libraryPrepBatch.id}/libraryPreps`
    },
    {
      // Run this query whenever there is a new set of sample StepResources.
      deps: [visibleSampleSrs],
      onSuccess: ({ data: libraryPreps }) => {
        // Attach the libraryPreps to the samples.
        for (const sampleSr of visibleSampleSrs) {
          const libraryPrepForThisSample = libraryPreps.find(
            libraryPrep => libraryPrep.sample.id === sampleSr.sample.id
          );

          if (libraryPrepForThisSample) {
            sampleSr.libraryPrep = libraryPrepForThisSample;
          }
        }

        // Re-initialize formik form.
        setFormikValues({ sampleSrs: visibleSampleSrs });
      }
    }
  );

  const onSubmit = safeSubmit(async submittedValues => {
    const sampleSrs: StepResource[] = submittedValues.sampleSrs;

    const libraryPreps = [];
    for (const sr of sampleSrs) {
      if (sr.libraryPrep) {
        sr.libraryPrep.sample = sr.sample;
        sr.libraryPrep.libraryPrepBatch = libraryPrepBatch;
        libraryPreps.push(sr.libraryPrep);
      }
    }

    const saveArgs = libraryPreps.map(resource => ({
      resource,
      type: "libraryPrep"
    }));

    await save(saveArgs);

    setLastPrepTableSave(Date.now());
  });

  const COLUMNS: Array<ColumnDefinition<StepResource>> = [
    "sample.name",
    // Library prep fields
    {
      Cell: ({ index }) => (
        <NumberField
          hideLabel={true}
          name={`sampleSrs[${index}].libraryPrep.inputNg`}
        />
      ),
      Header: "Input (ng)",
      sortable: false
    },
    {
      Cell: ({ index }) => (
        <TextField
          hideLabel={true}
          name={`sampleSrs[${index}].libraryPrep.quality`}
        />
      ),
      Header: "Quality",
      sortable: false
    },
    {
      Cell: ({ index }) => (
        <TextField
          hideLabel={true}
          name={`sampleSrs[${index}].libraryPrep.size`}
        />
      ),
      Header: "Size",
      sortable: false
    }
  ];

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formikValues}
      onSubmit={onSubmit}
    >
      <Form>
        <strong>Selected Samples</strong>
        <div className="float-right">
          <SubmitButton>Save Table Values</SubmitButton>
        </div>
        <QueryTable
          columns={COLUMNS}
          loading={libraryPrepsLoading}
          deps={[lastPrepTableSave]}
          // Filter down to the selected samples from this chain's sample selection step.
          filter={{
            "chain.chainId": chain.id,
            "chainStepTemplate.chainStepTemplateId": sampleSelectionStep.id
          }}
          include="sample"
          onSuccess={res => setVisibleSampleSrs(res.data)}
          path="stepResource"
        />
        <div className="float-right">
          <SubmitButton>Save Table Values</SubmitButton>
        </div>
      </Form>
    </Formik>
  );
}
