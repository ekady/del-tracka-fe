import { ReactNode } from 'react';

export declare type Indexable<K, T> = {
  [key in K]: T;
};

export declare type FunctionVoidWithParams<T> = (params: T) => void;
export declare type FunctionVoid = () => void;
export declare type FunctionWithReturn<T> = (params: T) => T;

export declare type InformationWithColor = {
  value?: string | number;
  name?: string;
  color: string;
  textColor: string;
};

export declare type MenuItem = {
  name: string;
  path: string;
  icon: string;
};

export declare type PropsChildren = {
  children?: ReactNode;
};

export declare type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

export declare type PasswordForm = 'password' | 'confirm_password';
