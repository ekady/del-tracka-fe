import { ReactNode, SyntheticEvent } from 'react';

import { TextFieldProps } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';

export type TFunctionVoidWithParams<ParamsType> = (params: ParamsType) => void;
export type TFunctionVoid = () => void;
export type TFunctionWithReturn<ParamsReturnType> = (params: ParamsReturnType) => ParamsReturnType;
export type TFunctionReturnFunction<P1, P2, R> = (param1: P1) => (param2: P2) => R;

export interface IResponseError {
  data?: null;
  errors: { errorType: string; message: string }[];
  statusCode: number;
}

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
  picture?: IFileStream | string | null;
  _id: string;
}

export interface IUserInfoResponse {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  picture?: IFileStream | string | null;
  _id: string;
  isDemo?: boolean;
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
  limit?: number | null;
  page?: number | null;
  sortBy?: string | null;
  search?: string | null;
  [x: string]: string | string[] | number | null | undefined;
}

export type TPaginationParamsText = keyof IPaginationParams;

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

export type TOnChangeWithAdditionalParams<ParamsType, OptionType> = (
  params?: ParamsType,
) => (event: SyntheticEvent<Element, Event>, value: OptionType | null) => void;

export interface IFilterProps<ParamsType, OptionType> {
  onChange?: TOnChangeWithAdditionalParams<ParamsType, OptionType>;
}

export interface IStatusMessageResponse {
  message: string;
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

export interface IFileStream {
  filename: string;
  completedPath: string;
  mime: string;
  fileSize?: number;
}

export interface IMenuPermission {
  _id: string;
  menu: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface IPermission {
  roleName: string;
  permissions: IMenuPermission[];
}

export interface IPermissionResponse {
  [roleName: string]: {
    [menuName: string]: IMenuPermission;
  };
}

export interface IBreadcrumb {
  breadcrumb: string;
  href: string;
}

export interface IPageParams {
  params?: Record<string, string | number | null | undefined>;
  searchParams?: Record<string, string | number | null | never>;
}
