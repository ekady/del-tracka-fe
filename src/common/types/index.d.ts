export declare type Indexable = {
  [key: string]: unknown | undefined;
};

export declare type IndexableString = {
  [key: string]: string | undefined;
};

export declare type IndexableFile = {
  [key: string]: File;
};

export declare type FunctionVoidWithParams = (params: unknown) => void;
export declare type FunctionVoidWithFileList = (params: FileList) => void;
export declare type FunctionVoid = () => void;

export declare type InformationWithColor = {
  value?: string;
  name?: string;
  color: string;
  textColor: string;
};

export interface menuItem {
  name: string;
  path: string;
  icon: string;
}
