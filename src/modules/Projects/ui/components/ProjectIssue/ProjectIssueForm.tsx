// MUI Components
import { level } from '@/common/constants';
import { Autocomplete, Button, Grid } from '@mui/material';

// Local Components
import { CustomInput, FileUploader } from '@/common/base';

export type IssueFormType = {
  mainProblem: string;
  feature: string;
  reporter: string;
  assignTo?: string;
  detail?: string;
  priority: string;
};

export type ProjectIssueFormProps = {
  data?: IssueFormType;
  hideUploadFile?: boolean;
};

export default function ProjectIssueForm({ hideUploadFile }: ProjectIssueFormProps) {
  return (
    <>
      <Grid container columnSpacing={3} component="main">
        <Grid item xs={12} md={6}>
          <CustomInput
            fieldname="Main Problem"
            // error={errors.mainProblem}
            TextFieldProps={{ placeholder: 'Enter main problem' }}
          />
          <CustomInput
            fieldname="Feature"
            // error={errors.mainProblem}
            TextFieldProps={{ placeholder: 'Enter feature' }}
          />
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <CustomInput
                fieldname="Reporter"
                // error={errors.mainProblem}
                TextFieldProps={{ placeholder: 'Enter reporter', ...params, size: 'small' }}
              />
            )}
          />
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <CustomInput
                fieldname="Assign To"
                // error={errors.mainProblem}
                TextFieldProps={{ placeholder: 'Enter assign to', ...params, size: 'small' }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={Object.keys(level)}
            renderInput={(params) => (
              <CustomInput
                fieldname="Priority"
                // error={errors.mainProblem}
                TextFieldProps={{ placeholder: 'Enter priority', ...params, size: 'small' }}
              />
            )}
          />
          <CustomInput
            fieldname="Detail"
            // error={errors.mainProblem}
            TextFieldProps={{ placeholder: 'Enter detail', multiline: true, rows: 8 }}
          />
        </Grid>
        {!hideUploadFile && (
          <Grid item xs={12} marginTop={2}>
            <FileUploader multiple />
          </Grid>
        )}
        <Grid item xs={12} marginTop={6} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained">Save</Button>
        </Grid>
      </Grid>
    </>
  );
}
