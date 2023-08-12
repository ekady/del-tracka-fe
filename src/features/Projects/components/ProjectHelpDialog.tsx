// MUI Components
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// MUI Icons
import CheckCircle from '@mui/icons-material/CheckCircle';
import CircleOutlined from '@mui/icons-material/CircleOutlined';

import { BaseDialog } from '@/common/base';
import { useGetPermissionQuery } from '@/common/store/api.slice';

export interface ProjectHelpDialogProps {
  open?: boolean;
  onCloseHelp?: () => void;
}

const ProjectHelpDialog = ({ open, onCloseHelp }: ProjectHelpDialogProps) => {
  const { data, isFetching, isLoading } = useGetPermissionQuery();
  return (
    <BaseDialog
      isOpen={open}
      hideCancel
      titleDialog="Help Information - Project Role Access"
      handleCancel={onCloseHelp}
      showClose
      hideButtonOk
    >
      {isFetching || isLoading ? (
        <Box height={200} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
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
            {data?.map((row) => (
              <>
                <TableRow>
                  <TableCell rowSpan={row.permissions.length + 1} component="th" scope="row">
                    {row.roleName}
                  </TableCell>
                </TableRow>
                {row.permissions.map((permission) => (
                  <TableRow key={permission._id}>
                    <TableCell>{permission.menu}</TableCell>
                    <TableCell>{permission.create ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                    <TableCell>{permission.read ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                    <TableCell>{permission.update ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                    <TableCell>{permission.delete ? <CheckCircle color="success" /> : <CircleOutlined />}</TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </BaseDialog>
  );
};

export default ProjectHelpDialog;
