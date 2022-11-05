interface ClassData {
  name: string;
  students: string[];
}

interface ClassDataTable {
  Name: string;
  Students: string[];
}

interface StudentTable {
  id: string;
  fields: {
    Name?: string;
    Classes: string[];
  };
}

interface ClassDataResponse {
  fields: ClassDataTable;
}

interface ClassStatess {
  classDetails: ClassData[],
  status: any,
  error: null
}

interface IAction {
  type: string
  payload: any
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
