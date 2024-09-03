'use client';

import { useRouter } from 'next/navigation';

import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';
import { ISprintResponse, ITaskResponse } from '@/app/app/projects/_interfaces';

interface ITaskBreadcrumbProps {
  sprint: ISprintResponse | null;
  task: Partial<ITaskResponse> | null;
}

const TaskBreadcrumb = ({ sprint, task }: ITaskBreadcrumbProps) => {
  const router = useRouter();
  const { openDialogWarning, closeDialogAlert, dialogAlertOpt } = useDialogAlert();

  const warningLeavePage = () => {
    openDialogWarning('Warning', 'Are you sure you want to leave this page?', {
      handleOk: () => router.push(`/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}`),
    });
  };
  return (
    <>
      <BaseDialogAlert {...dialogAlertOpt} handleCancel={closeDialogAlert} />
      <TitleWithBreadcrumb
        title="Edit Task"
        onBackTo={warningLeavePage}
        breadcrumbs={[
          { breadcrumb: 'Project', href: '/app/projects' },
          {
            breadcrumb: sprint?.project?.name ?? '',
            href: `/app/projects/${sprint?.project?.shortId}`,
          },
          {
            breadcrumb: sprint?.name ?? '',
            href: `/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}`,
          },
          {
            breadcrumb: task?.title ?? '',
            href: `/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}/${task?.shortId}`,
          },
          {
            breadcrumb: 'Edit',
            href: `/app/projects/${sprint?.project?.shortId}/${sprint?.shortId}/${task?.shortId}/edit`,
          },
        ]}
      />
    </>
  );
};

export default TaskBreadcrumb;
