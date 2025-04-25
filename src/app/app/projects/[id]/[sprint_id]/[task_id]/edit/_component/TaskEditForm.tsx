'use client';

import { BaseSyntheticEvent, useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import { actionEditTask } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_actions/editTask.action';
import TaskFormContent from '@/app/app/projects/[id]/[sprint_id]/new/_components/TaskFormContent';
import { IProjectMember, ISprintResponse, ITaskForm } from '@/app/app/projects/_interfaces';

interface ITaskEditFormProps {
  sprint: ISprintResponse | null;
  memberList: IProjectMember[];
  task: Partial<ITaskForm> | null;
}

const TaskEditForm = ({ sprint, memberList, task }: ITaskEditFormProps) => {
  const router = useRouter();
  const { handleSubmit, ...formState } = useForm<ITaskForm>({ mode: 'all', defaultValues: task ?? {} });
  const [loading, setLoading] = useState(false);
  const { openDialogWarning, closeDialogAlert, dialogAlertOpt } = useDialogAlert();

  const redirectTaskList = useCallback(() => {
    router.push(`/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}`);
  }, [router, sprint]);

  const onSubmit = handleSubmit(async (payload) => {
    setLoading(true);
    try {
      const response = await actionEditTask(
        { projectId: sprint!.project!.shortId, sprintId: sprint!.shortId, taskId: task!.shortId! },
        payload,
      );

      if (response.isSuccess) {
        toast.success('Task edited successfully!');
        redirectTaskList();
        return;
      }

      if (response.isError) {
        toast.error(response.message);
      }
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  const warningLeavePage = () => {
    openDialogWarning('Warning', 'Are you sure you want to leave this page?', {
      handleOk: redirectTaskList,
    });
  };

  return (
    <>
      <BaseDialogAlert {...dialogAlertOpt} handleCancel={closeDialogAlert} />
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TaskFormContent {...formState} disabled={loading} memberList={memberList} />

        <Grid size={{ xs: 12 }} marginTop={6} sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
          <LoadingButton loading={loading} variant="outlined" onClick={warningLeavePage}>
            Cancel
          </LoadingButton>
          <LoadingButton type="submit" loading={loading} variant="contained">
            Edit
          </LoadingButton>
        </Grid>
      </Box>
    </>
  );
};

export default TaskEditForm;
