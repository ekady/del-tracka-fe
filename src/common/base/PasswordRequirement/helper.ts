export interface IPasswordRequirementOptions {
  isMinLength?: boolean;
  isNumbered?: boolean;
  isUpperAlpha?: boolean;
  isLowerAlpha?: boolean;
  isSymbol?: boolean;
  isAllTrue?: boolean;
}

export const passwordValidator = (value: string): IPasswordRequirementOptions => {
  const isLowerAlpha = /[a-z]/.test(value);
  const isUpperAlpha = /[A-Z]/.test(value);
  const isNumbered = /[0-9]/.test(value);
  const isSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  const isMinLength = value.length >= 8;
  return {
    isAllTrue: isLowerAlpha && isUpperAlpha && isNumbered && isMinLength,
    isLowerAlpha,
    isMinLength,
    isNumbered,
    isSymbol,
    isUpperAlpha,
  };
};
