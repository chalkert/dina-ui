import { Field, Form, Formik, FormikActions } from "formik";
import { KitsuResource } from "kitsu";
import { isEqual, isObject, transform } from "lodash";
import { CellInfo, Column, TableProps } from "react-table";
import titleCase from "title-case";
import { MetaWithTotal } from "types/seqdb-api/meta";
import { QueryState, SubmitButton } from "../../components";
import { QueryTable, QueryTableProps } from "./QueryTable";

export interface EditableQueryTableProps<TData extends KitsuResource>
  extends QueryTableProps<TData> {}

export function EditableQueryTable<TData extends KitsuResource>(
  props: EditableQueryTableProps<TData>
) {
  function reactTableProps({
    response
  }: QueryState<TData[], MetaWithTotal>): Partial<TableProps<TData>> {
    return {
      TableComponent: ({ children }) => {
        const initialValues = response ? response.data : [];

        async function onSubmit(
          submittedValues,
          { setStatus, setSubmitting }: FormikActions<any>
        ) {
          console.log(difference(submittedValues, initialValues));
          setSubmitting(false);
        }

        return (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              {children}
              <SubmitButton />
            </Form>
          </Formik>
        );
      }
    };
  }

  return <QueryTable {...props} reactTableProps={reactTableProps} />;
}

export function editableColumn(accessor: string): Column {
  return {
    Cell: ({ index }: CellInfo) => {
      return <Field className="form-control" name={`${index}.${accessor}`} />;
    },
    Header: titleCase(accessor),
    accessor
  };
}

function difference(object, base) {
  function changes(object, base) {
    return transform(object, (result, value, key: any) => {
      if (!isEqual(value, base[key]) || ["id", "type"].includes(key)) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}
