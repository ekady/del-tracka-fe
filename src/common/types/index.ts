import { TextFieldProps } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';
import { ReactNode, SyntheticEvent } from 'react';

export type FunctionVoidWithParams<ParamsType> = (params: ParamsType) => void;
export type FunctionVoid = () => void;
export type FunctionWithReturn<ParamsReturnType> = (params: ParamsReturnType) => ParamsReturnType;
export type FunctionReturnFunction<P1, P2, R> = (param1: P1) => (param2: P2) => R;

export interface IInformationWithColor {
  value: string | number;
  name: string;
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

export type IPaginationParams = {
  limit?: number | null;
  page?: number | null;
  sortBy?: string | null;
  search?: string | null;
};

export type PaginationParamsText = keyof IPaginationParams;

export interface IPaginationResponse<ContentType> {
  data: ContentType[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
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
