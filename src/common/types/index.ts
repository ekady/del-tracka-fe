import { TextFieldProps } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';
import { ReactNode, SyntheticEvent } from 'react';

export type FunctionVoidWithParams<ParamsType> = (params: ParamsType) => void;
export type FunctionVoid = () => void;
export type FunctionWithReturn<ParamsReturnType> = (params: ParamsReturnType) => ParamsReturnType;

export interface IInformationWithColor {
  value?: string | number;
  name?: string;
  color: string;
  textColor: string;
}

export interface IAutocompleteOptions {
  label: string;
  value: string;
}

export interface IMenuItem {
  name: string;
  path: string;
  icon: string;
}

export interface IPropsChildren {
  children?: ReactNode;
}

export interface IStaticImageData {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
}

export interface IUserInfo {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  picture?: string | null;
  _id: string | null;
}

export interface ICredential {
  accessToken: string | null;
  refreshToken?: string | null;
}

export interface IStateStore<DataType> {
  state?: unknown;
  data: DataType;
}

export interface IPaginationParams {
  limit?: number;
  page?: number;
  sort?: string;
  search?: string;
  filter?: Record<string, string | number>;
}
export type PaginationParamsText = keyof IPaginationParams;

export interface IPaginationResponse<ContentType> {
  content: ContentType[];
  currentPage: number;
  totalPage: number;
  contentFrom: number;
  contentTo: number;
  totalContent: number;
  options: IPaginationParams;
}

export interface ITableAndSearchProps {
  TableProps?: Omit<DataGridProps, 'columns'>;
  SearchProps?: TextFieldProps;
}

export type onChangeWithAdditionalParams<ParamsType, OptionType> = (
  params?: ParamsType,
) => (event: SyntheticEvent<Element, Event>, value: OptionType | null) => void;

export interface IFilterProps<ParamsType, OptionType> {
  onChange?: onChangeWithAdditionalParams<ParamsType, OptionType>;
}

export interface IStatusMessageResponse {
  message: string;
}

export interface IErrorDataResponse {
  errorType: string;
  message: string;
}

export interface IErrorResponse {
  data: null;
  errors: IErrorDataResponse[];
  statusCode: number;
}

export interface IApiResponse<Response> {
  data: Response;
  errors: null;
  statusCode: number;
}

export interface IRoleResponse {
  _id: string;
  name: string;
}
