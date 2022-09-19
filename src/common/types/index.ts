import { TextFieldProps } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';
import { ReactNode, SyntheticEvent } from 'react';

export type Indexable<KeyType, ValueType> = {
  [key in KeyType]: ValueType;
};

export type FunctionVoidWithParams<ParamsType> = (params: ParamsType) => void;
export type FunctionVoid = () => void;
export type FunctionWithReturn<ParamsReturnType> = (params: ParamsReturnType) => ParamsReturnType;

export type InformationWithColor = {
  value?: string | number;
  name?: string;
  color: string;
  textColor: string;
};

export type AutocompleteOptions = {
  label: string;
  value: string;
};

export type MenuItem = {
  name: string;
  path: string;
  icon: string;
};

export type PropsChildren = {
  children?: ReactNode;
};

export type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

export type UserType = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageURL: string | null;
  id: string | null;
  isFirstLogin: boolean;
};

export type Credential = {
  accessToken: string | null;
  refreshToken: string | null;
};

export interface StateStore<DataType> {
  state?: unknown;
  data: DataType;
}

export interface PaginationParams {
  limit?: number;
  page?: number;
  sort?: string;
  search?: string;
  filter?: Indexable<string, string | number>;
}
export type PaginationParamsText = keyof PaginationParams;

export interface PaginationResponse<ContentType> {
  content: ContentType[];
  currentPage: number;
  totalPage: number;
  contentFrom: number;
  contentTo: number;
  totalContent: number;
  options: PaginationParams;
}

export type TableAndSearchProps = {
  TableProps?: Omit<DataGridProps, 'columns'>;
  SearchProps?: TextFieldProps;
};

export type onChangeWithAdditionalParams<ParamsType, OptionType> = (
  params?: ParamsType,
) => (event: SyntheticEvent<Element, Event>, value: OptionType | null) => void;

export type FilterProps = {
  onChange?: onChangeWithAdditionalParams;
};
