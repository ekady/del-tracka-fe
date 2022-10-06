import { TextFieldProps } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';
import { ReactNode, SyntheticEvent } from 'react';

export type FunctionVoidWithParams<ParamsType> = (params: ParamsType) => void;
export type FunctionVoid = () => void;
export type FunctionWithReturn<ParamsReturnType> = (params: ParamsReturnType) => ParamsReturnType;

export interface InformationWithColor {
  value?: string | number;
  name?: string;
  color: string;
  textColor: string;
}

export interface AutocompleteOptions {
  label: string;
  value: string;
}

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export interface PropsChildren {
  children?: ReactNode;
}

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
}

export interface UserInfo {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageURL: string | null;
  id: string | null;
  isFirstLogin: boolean;
}

export interface Credential {
  accessToken: string | null;
  refreshToken?: string | null;
}

export interface StateStore<DataType> {
  state?: unknown;
  data: DataType;
}

export interface PaginationParams {
  limit?: number;
  page?: number;
  sort?: string;
  search?: string;
  filter?: Record<string, string | number>;
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

export interface TableAndSearchProps {
  TableProps?: Omit<DataGridProps, 'columns'>;
  SearchProps?: TextFieldProps;
}

export type onChangeWithAdditionalParams<ParamsType, OptionType> = (
  params?: ParamsType,
) => (event: SyntheticEvent<Element, Event>, value: OptionType | null) => void;

export interface FilterProps<ParamsType, OptionType> {
  onChange?: onChangeWithAdditionalParams<ParamsType, OptionType>;
}

export interface StatusMessageResponse {
  message: string;
}

export interface ErrorDataResponse {
  errorType: string;
  message: string;
}

export interface ErrorResponse {
  data: null;
  errors: ErrorDataResponse[];
  statusCode: number;
}

export interface ApiResponse<Response> {
  data: Response;
  errors: null;
  statusCode: number;
}
