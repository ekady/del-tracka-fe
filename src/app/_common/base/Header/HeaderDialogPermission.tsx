import { Fragment } from 'react';

import CheckCircle from '@mui/icons-material/CheckCircle';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import BaseDialog from '@/app/_common/base/BaseDialog';
import { IPermission } from '@/app/_common/types';

export interface IHeaderDialogPermissionProps {
  open?: boolean;
  onCloseHelp?: () => void;
  permissions?: IPermission[];
}

const HeaderDialogPermission = ({ open, onCloseHelp, permissions }: IHeaderDialogPermissionProps) => {
  return (
    <BaseDialog
      isOpen={open}
      hideCancel
      titleDialog="Help Information - Project Role Access"
      handleCancel={onCloseHelp}
      showClose
      hideButtonOk
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Menu</TableCell>
            <TableCell>Create</TableCell>
            <TableCell>Read</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {permissions?.map((row) => (
            <Fragment key={row.roleName}>
              <TableRow>
                <TableCell rowSpan={row.permissions.length + 1} component="th" scope="row">
                  {row.roleName}
                </TableCell>
              </TableRow>
              {row.permissions.map((permission, index) => (
                <TableRow key={index}>
                  <TableCell>{permission.menu}</TableCell>
                  <TableCell>{permission.create ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                  <TableCell>{permission.read ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                  <TableCell>{permission.update ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                  <TableCell>{permission.delete ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </BaseDialog>
  );
};

export default HeaderDialogPermission;
