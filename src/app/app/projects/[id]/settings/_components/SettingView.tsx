'use client';

import { useCallback, useState } from 'react';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import ListItemText from '@mui/material/ListItemText';

import { ListButton, ListContainer, ListContentContainer, ListItemContainer } from '@/app/_common/base/List/styled';
import { IUserInfoResponse } from '@/app/_common/types';
import MemberList from '@/app/app/projects/[id]/member/_components/MemberList';
import ProjectInformationForm from '@/app/app/projects/[id]/settings/_components/ProjectInformationForm';
import ProjectOtherSetting from '@/app/app/projects/[id]/settings/_components/ProjectOtherSetting';
import { IProjectMember, IProjectWithPermissions } from '@/app/app/projects/_interfaces';

export interface ISettingViewProps {
  memberList: IProjectMember[];
  project: IProjectWithPermissions | null;
  projectId: string;
  profile: IUserInfoResponse | null;
}

const SettingView = ({ memberList, profile, project, projectId }: ISettingViewProps) => {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false });

  const handleClick = useCallback((index: number) => {
    return () => {
      setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };
  }, []);

  return (
    <>
      {project?.rolePermissions?.PROJECT?.update && (
        <ListContainer>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(0)}>
              <ListItemText className="cursor-pointer" primary="Project Information" />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[0] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[0]} timeout="auto" mountOnEnter={false}>
            <ListContentContainer maxWidth={false}>
              <ProjectInformationForm
                id={projectId}
                defaultValues={{ name: project?.name, description: project?.description }}
              />
            </ListContentContainer>
          </Collapse>
        </ListContainer>
      )}

      {project?.rolePermissions?.MEMBER?.update && (
        <ListContainer>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(1)}>
              <ListItemText className="cursor-pointer" primary="Member" />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[1] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[1]} timeout="auto" mountOnEnter={false}>
            <ListContentContainer maxWidth={false}>
              <MemberList profile={profile} project={project} memberList={memberList} projectId={projectId} />
            </ListContentContainer>
          </Collapse>
        </ListContainer>
      )}

      {project?.rolePermissions?.PROJECT?.delete && !profile?.isDemo && (
        <ListContainer>
          <ListItemContainer>
            <ListButton disableTouchRipple onClick={handleClick(2)}>
              <ListItemText className="cursor-pointer" primary="Other" />
              <Icon className="cursor-pointer" sx={{ mr: 1 }}>
                {open[2] ? <ExpandLess /> : <ExpandMore />}
              </Icon>
            </ListButton>
          </ListItemContainer>
          <Collapse in={open[2]} timeout="auto" mountOnEnter={false}>
            <ListContentContainer maxWidth={false}>
              <ProjectOtherSetting id={projectId} />
            </ListContentContainer>
          </Collapse>
        </ListContainer>
      )}
    </>
  );
};

export default SettingView;
