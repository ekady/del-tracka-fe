// MUI Components
import { level } from '@/common/constants';
import { Autocomplete, Grid, TextField } from '@mui/material';

// Local Components
import { CustomInputs, FileUploader } from '@/common/components/base';

export interface IssueForm {
  mainProblem: string;
  feature: string;
  reporter: string;
  assignTo?: string;
  detail?: string;
  priority: string;
}

export interface ProjectIssueFormProps {
  data?: IssueForm;
  hideUploadFile?: boolean;
}

export default function ProjectIssueForm({ hideUploadFile }: ProjectIssueFormProps) {
  return (
    <>
      <Grid container columnSpacing={3} component="main">
        <Grid item xs={12} md={6}>
          <CustomInputs
            Component={TextField}
            name="Main Problem"
            // error={error.type}
            componentProps={{
              margin: 'normal',
              fullWidth: true,
              placeholder: 'Enter main problem',
              id: 'main-problem',
              name: 'mainProblem',
            }}
          />
          <CustomInputs
            Component={TextField}
            name="Feature"
            // error={error.type}
            componentProps={{
              margin: 'normal',
              fullWidth: true,
              placeholder: 'Enter feature',
              id: 'feature',
              name: 'feature',
            }}
          />
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <CustomInputs
                Component={TextField}
                name="Reporter"
                // error={error.type}
                componentProps={{
                  ...params,
                  margin: 'normal',
                  fullWidth: true,
                  placeholder: 'Enter reporter',
                  id: 'reporter',
                  name: 'reporter',
                }}
              />
            )}
          />
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <CustomInputs
                Component={TextField}
                name="Assign To"
                // error={error.type}
                componentProps={{
                  ...params,
                  margin: 'normal',
                  fullWidth: true,
                  placeholder: 'Enter assign to',
                  id: 'assign-to',
                  name: 'assignTo',
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={Object.keys(level)}
            renderInput={(params) => (
              <CustomInputs
                Component={TextField}
                name="Priority"
                // error={error.type}
                componentProps={{
                  ...params,
                  margin: 'normal',
                  fullWidth: true,
                  placeholder: 'Enter priority',
                  id: 'priority',
                  name: 'priority',
                }}
              />
            )}
          />
          <CustomInputs
            Component={TextField}
            name="Detail"
            // error={error.type}
            componentProps={{
              margin: 'normal',
              fullWidth: true,
              placeholder: 'Enter detail',
              id: 'detail',
              name: 'detail',
              multiline: true,
              rows: 8,
            }}
          />
        </Grid>
        {!hideUploadFile && (
          <Grid item xs={12} marginTop={2}>
            <FileUploader multiple />
          </Grid>
        )}
      </Grid>
    </>
  );
}
