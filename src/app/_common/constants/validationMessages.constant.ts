const validationMessages: Record<string, string> = {
  required: '{attribute} is required.',
  email: 'Format {attribute} must be correct.',
  samePassword: '{attribute} must be same with confirm password',
  sameConfirmPassword: '{attribute} must be same with password',
};

export default validationMessages;
