import { BaseSyntheticEvent, ElementType, useCallback, useEffect } from 'react';

// MUI Components
import Autocomplete from '@mui/material/Autocomplete';
import { TextFieldProps } from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MobileDatePicker } from '@mui/x-date-pickers';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// React Hook Form
import { Controller, FieldError, RegisterOptions, useForm } from 'react-hook-form';

// Date
import dayjs from 'dayjs';

// Local Components
import { BaseDialogAlert, BaseLabel, ButtonLoading, CustomInput, FileUploaderMultiple } from '@/common/base';
import { levelList } from '@/common/constants/level';

// Hooks
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import useProjectId from '@/features/projects/hooks/useProjectId';
import { useGetProjectMembersQuery } from '@/features/projects/store/member.api.slice';
import { useCreateUpdateTaskMutation } from '@/features/projects/store/task.api.slice';

import { IProjectSprintTaskDetail } from '@/features/projects/interfaces';
import { TProjectIds } from '@/features/projects/store/project.api.slice';
import { TFunctionVoid } from '@/common/types';
import { TextFieldStyled } from '@/common/base/CustomInput/styled';

export interface IProjectTaskFormProps {
  data?: IProjectSprintTaskDetail;
  hideUploadFile?: boolean;
  disabled?: boolean;
  hideActions?: boolean;
}

type TProjectSprintTaskDetailForm = {
  [key in keyof IProjectSprintTaskDetail]: RegisterOptions;
};

const defaultValue: IProjectSprintTaskDetail = {
  _id: '',
  feature: '',
  priority: null,
  title: '',
  reporter: null,
  assignee: null,
  detail: '',
  dueDate: null,
  images: [],
};

const validations: TProjectSprintTaskDetailForm = {
  _id: { required: false },
  feature: { required: true },
  priority: { required: true },
  title: { required: true },
  reporter: { required: false },
  assignee: { required: false },
  dueDate: { required: false },
  detail: { required: false },
  images: { required: false },
  project: { required: false },
  stage: { required: false },
};

export default function ProjectTaskForm({ hideUploadFile, disabled, data, hideActions }: IProjectTaskFormProps) {
  const { projectId, router } = useProjectId();
  const { data: dataMember } = useGetProjectMembersQuery(projectId ?? skipToken);
  const [saveTask, { isLoading }] = useCreateUpdateTaskMutation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'all', defaultValues: defaultValue });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const { dialogAlertOpt, openDialogSuccess, closeDialogAlert } = useDialogAlert();

  const onRedirectTaskList = useCallback(async () => {
    await router.push({
      pathname: '/app/projects/[project_id]/[sprint_id]',
      query: { project_id: router.query.project_id as string, sprint_id: router.query.sprint_id as string },
    });
  }, [router]);

  const onSubmit = handleSubmit(async (form) => {
    try {
      const id: TProjectIds = {
        idProject: projectId,
        idSprint: router.query.sprint_id as string,
        idTask: router.query.task_id as string,
      };
      const response = await saveTask({ id, body: { ...form } });
      if ('data' in response && response.data) {
        openDialogSuccess('Success', 'Task has been successfully saved', {
          handleOk: onRedirectTaskList as TFunctionVoid,
          handleCancel: closeDialogAlert,
        });
      }
    } catch (_) {
      //
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <>
      <BaseDialogAlert {...dialogAlertOpt} />
      <Grid container columnSpacing={3} component="main">
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            rules={validations.title}
            render={({ field }) => (
              <CustomInput
                fieldname="Main Problem"
                error={errors.title}
                TextFieldProps={{ placeholder: 'Enter main problem', disabled, ...field }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
                options={dataMember ?? []}
                disabled={disabled}
                disableClearable={!!value}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                value={value ?? null}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option._id === val._id}
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
                options={dataMember ?? []}
                disabled={disabled}
                disableClearable={!!value}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                value={value ?? null}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option._id === val._id}
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
          <Controller
            name="priority"
            control={control}
            rules={validations.priority}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={levelList}
                disabled={disabled}
                disableClearable={!!value}
                value={value ?? null}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option.value === val.value}
                renderInput={(params) => (
                  <CustomInput
                    fieldname="Priority"
                    error={errors.priority as FieldError}
                    TextFieldProps={{ placeholder: 'Enter priority', ...params, size: 'small' }}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <BaseLabel>Due Date</BaseLabel>
            <Controller
              name="dueDate"
              control={control}
              rules={validations.dueDate}
              render={({ field: { onChange, value } }) => (
                <MobileDatePicker
                  format="YYYY-MM-DD"
                  sx={{ width: '100%', marginBottom: 2 }}
                  closeOnSelect
                  value={value ? dayjs(value) : null}
                  onChange={(val) => onChange(val)}
                  minDate={value ? dayjs(value) : dayjs()}
                  disabled={disabled}
                  slots={{ textField: TextFieldStyled as ElementType<TextFieldProps> }}
                  slotProps={{ textField: { size: 'small', placeholder: 'Enter due date' } }}
                />
              )}
            />
          </Box>
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
                  maxImages={3}
                  maxSizeKb={500}
                />
              )}
            />
          </Grid>
        )}
        {!hideActions && (
          <Grid item xs={12} marginTop={6} sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
            <ButtonLoading loading={isLoading} variant="outlined" onClick={onRedirectTaskList as TFunctionVoid}>
              {router.query.task_id && !router.asPath.includes('edit') ? 'Back' : 'Cancel'}
            </ButtonLoading>
            {(router.asPath.includes('new') || router.asPath.includes('edit')) && (
              <ButtonLoading loading={isLoading} variant="contained" onClick={onSubmit}>
                Save
              </ButtonLoading>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}
