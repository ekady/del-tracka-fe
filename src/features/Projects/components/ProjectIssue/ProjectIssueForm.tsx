// MUI Components
import { Autocomplete, Button, Grid } from '@mui/material';

// Local Components
import { CustomInput, FileUploaderMultiple } from '@/common/base';

import { Controller, FieldError, RegisterOptions, useForm } from 'react-hook-form';

import { IProjectSprintIssueDetail } from '../../interfaces';
import { levelList } from '@/common/constants/level';

export type ProjectIssueFormProps = {
  data?: IProjectSprintIssueDetail;
  hideUploadFile?: boolean;
  disabled?: boolean;
};

type ProjectSprintIssueDetailForm = {
  [key in keyof IProjectSprintIssueDetail]: RegisterOptions;
};

const defaultValue: IProjectSprintIssueDetail = {
  id: '',
  feature: '',
  level: null,
  mainProblem: '',
  reporter: null,
  assignee: null,
  detail: '',
  images: [],
};

export default function ProjectIssueForm({ hideUploadFile, disabled, data }: ProjectIssueFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'all', defaultValues: data ?? defaultValue });

  const validations: ProjectSprintIssueDetailForm = {
    id: { required: false },
    feature: { required: true },
    level: { required: true },
    mainProblem: { required: true },
    reporter: { required: false },
    assignee: { required: false },
    detail: { required: true },
    images: { required: true },
  };

  const onSubmit = handleSubmit(async (form) => {
    console.log(form);
  });

  return (
    <>
      <Grid container columnSpacing={3} component="main">
        <Grid item xs={12} md={6}>
          <Controller
            name="mainProblem"
            control={control}
            rules={validations.mainProblem}
            render={({ field }) => (
              <CustomInput
                fieldname="Main Problem"
                error={errors.mainProblem}
                TextFieldProps={{ placeholder: 'Enter main problem', disabled, ...field }}
              />
            )}
          />
          <Controller
            name="feature"
            control={control}
            rules={validations.feature}
            render={({ field }) => (
              <CustomInput
                fieldname="Feature"
                error={errors.feature}
                TextFieldProps={{ placeholder: 'Enter feature', disabled, ...field }}
              />
            )}
          />
          <Controller
            name="reporter"
            control={control}
            rules={validations.reporter}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={[]}
                disabled={disabled}
                disableClearable={!!value}
                value={value ? value : null}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option.value === val.value}
                renderInput={(params) => (
                  <CustomInput
                    fieldname="Reporter"
                    error={errors.reporter as FieldError}
                    TextFieldProps={{ placeholder: 'Enter reporter', ...params, size: 'small' }}
                  />
                )}
              />
            )}
          />
          <Controller
            name="assignee"
            control={control}
            rules={validations.assignee}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={[]}
                disabled={disabled}
                disableClearable={!!value}
                value={value ? value : null}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option.value === val.value}
                renderInput={(params) => (
                  <CustomInput
                    fieldname="Assign To"
                    error={errors.assignee as FieldError}
                    TextFieldProps={{ placeholder: 'Enter assign to', ...params, size: 'small' }}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="level"
            control={control}
            rules={validations.level}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={levelList}
                disabled={disabled}
                disableClearable={!!value}
                value={value ? value : null}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option.value === val.value}
                renderInput={(params) => (
                  <CustomInput
                    fieldname="Priority"
                    error={errors.level as FieldError}
                    TextFieldProps={{ placeholder: 'Enter level', ...params, size: 'small' }}
                  />
                )}
              />
            )}
          />
          <Controller
            name="detail"
            control={control}
            rules={validations.detail}
            render={({ field }) => (
              <CustomInput
                fieldname="Detail"
                error={errors.detail}
                TextFieldProps={{ placeholder: 'Enter detail', disabled, multiline: true, rows: 8, ...field }}
              />
            )}
          />
        </Grid>
        {!hideUploadFile && (
          <Grid item xs={12} marginTop={2}>
            <Controller
              name="images"
              control={control}
              rules={validations.images}
              render={({ field: { value, onChange } }) => (
                <FileUploaderMultiple
                  disabled={disabled}
                  error={errors.images as FieldError}
                  value={value}
                  handleValue={(imgs) => onChange(imgs)}
                />
              )}
            />
          </Grid>
        )}
        <Grid item xs={12} marginTop={6} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" onClick={onSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
