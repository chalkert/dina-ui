import { Formik } from "formik";
import Link from "next/link";
import { withRouter, WithRouterProps } from "next/router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FieldView, Head, LoadingSpinner, Nav, Query } from "../../components";
import { SampleSelection } from "../../components/selection/SampleSelection";
import { Chain } from "../../types/seqdb-api/resources/workflow/Chain";
import { ChainStepTemplate } from "../../types/seqdb-api/resources/workflow/ChainStepTemplate";

export function WorkflowDetailsPage({ router }: WithRouterProps) {
  const { id } = router.query;

  return (
    <div>
      <Head title="Workflow" />
      <Nav />
      <Query<Chain>
        query={{ include: "group,chainTemplate", path: `chain/${id}` }}
      >
        {({ loading, response }) => (
          <div className="container-fluid">
            <Link href="/workflow/list">
              <a>Workflow list</a>
            </Link>
            <h1>Workflow Details</h1>
            <LoadingSpinner loading={loading} />
            {response && <WorkflowSteps chain={response.data} />}
          </div>
        )}
      </Query>
    </div>
  );
}

function WorkflowSteps({ chain }: { chain: Chain }) {
  return (
    <Query<ChainStepTemplate[]>
      query={{
        fields: { stepTemplate: "name" },
        filter: { "chainTemplate.id": chain.chainTemplate.id },
        include: "stepTemplate",
        path: "chainStepTemplate"
      }}
    >
      {({ loading, response }) => {
        const steps = response ? response.data : [];

        return (
          <>
            <LoadingSpinner loading={loading} />
            <Tabs>
              <TabList>
                <Tab>Details</Tab>
                {steps.map(step => (
                  <Tab key={step.id}>Step {step.stepNumber}</Tab>
                ))}
              </TabList>
              <TabPanel>
                <Formik initialValues={chain} onSubmit={null}>
                  <div className="col-md-3">
                    <FieldView label="Template" name="chainTemplate.name" />
                    <FieldView label="Group" name="group.groupName" />
                    <FieldView name="name" />
                    <FieldView name="dateCreated" />
                  </div>
                </Formik>
              </TabPanel>
              {steps.map(step => (
                <TabPanel key={step.id}>
                  <SampleSelection
                    chain={chain}
                    stepTemplate={step.stepTemplate}
                  />
                </TabPanel>
              ))}
            </Tabs>
          </>
        );
      }}
    </Query>
  );
}

export default withRouter(WorkflowDetailsPage);
