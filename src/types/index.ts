declare global {
  interface Window { Rollbar: any; }
}

export type ReferenceType = {
  id: number;
  title: string | null;
  authors: any[];
}

export type ListType = {
  id: number;
  name: string;
};
