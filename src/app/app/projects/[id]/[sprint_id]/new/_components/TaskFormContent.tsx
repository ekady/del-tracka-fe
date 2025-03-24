import { ElementType } from 'react';

import { Autocomplete, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, FieldError, UseFormReturn } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';
import { TextFieldStyled } from '@/app/_common/base/CustomInput/styled';
import FileUploaderMultiple from '@/app/_common/base/FileUploader/FileUploaderMultiple';
import { levelList } from '@/app/_common/constants/level.constant';
import { IProjectMember, ITaskForm } from '@/app/app/projects/_interfaces';

export interface ITaskFormContentProps extends Omit<UseFormReturn<ITaskForm>, 'handleSubmit'> {
  memberList: IProjectMember[];
  disabled?: boolean;
}

const validations = {
  _id: { required: false },
  feature: { required: true },
  priority: { required: true },
  title: { required: true },
  reporter: { required: false },
  assignee: { required: false },
  dueDate: { required: false },
  detail: { required: false },
  status: { required: false },
  images: { required: false },
};

const TaskFormContent = ({ memberList, disabled, register, formState, control }: ITaskFormContentProps) => {
  return (
    <Grid container columnSpacing={3} component="main">
      <Grid item xs={12}>
        <CustomInput
          fieldname="Title"
          error={formState.errors.title}
          TextFieldProps={{
            placeholder: 'Enter main problem',
            disabled,
            ...register('title', { ...validations.title }),
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomInput
          fieldname="Category"
          error={formState.errors.feature}
          TextFieldProps={{
            placeholder: 'Enter feature',
            disabled,
            ...register('feature', { ...validations.feature }),
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Box>
          <InputLabel>Due Date</InputLabel>
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
      </Grid>

      <Grid item container xs={12} md={6}>
        <Grid item xs={12}>
          <Controller
            name="reporter"
            control={control}
            rules={validations.reporter}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={memberList ?? []}
                disabled={disabled}
                disableClearable={!!value}
                value={value}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option._id === val._id}
                renderInput={(params) => (
                  <CustomInput
                    fieldname="Reporter"
                    error={formState.errors.reporter as FieldError}
                    TextFieldProps={{ placeholder: 'Enter reporter', ...params, size: 'small' }}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="assignee"
            control={control}
            rules={validations.assignee}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={memberList ?? []}
                disabled={disabled}
                disableClearable={!!value}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                value={value}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option._id === val._id}
                renderInput={(params) => (
                  <CustomInput
                    fieldname="Assign To"
                    error={formState.errors.assignee as FieldError}
                    TextFieldProps={{ placeholder: 'Enter assign to', ...params, size: 'small' }}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="priority"
            control={control}
            rules={validations.priority}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={levelList}
                disabled={disabled}
                disableClearable={!!value}
                value={value}
                onChange={(_, item) => onChange(item)}
                isOptionEqualToValue={(option, val) => option.value === val.value}
                renderInput={(params) => (
                  <CustomInput
                    fieldname="Priority"
                    error={formState.errors.priority as FieldError}
                    TextFieldProps={{ placeholder: 'Enter priority', ...params, size: 'small' }}
                  />
                )}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomInput
          fieldname="Detail"
          error={formState.errors.detail}
          TextFieldProps={{
            placeholder: 'Enter detail',
            disabled,
            multiline: true,
            rows: 8,
            ...register('detail', { ...validations.detail }),
          }}
        />
      </Grid>

      <Grid item xs={12} marginTop={2}>
        <Controller
          name="images"
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange } }) => (
            <FileUploaderMultiple
              disabled={disabled}
              error={formState.errors.images as FieldError}
              value={value}
              handleValue={(imgs) => onChange(imgs)}
              maxImages={3}
              maxSizeKb={500}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default TaskFormContent;
