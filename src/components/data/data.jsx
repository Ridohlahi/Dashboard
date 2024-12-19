import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useGetAllStudentsQuery, useDeleteStudentMutation, useUpdateStudentMutation } from "../../feature/studentslice/studentApiSlice";

import './Data.css'; 

import React from 'react';

export default function StudentManagement() {
  const { data: students = [], refetch } = useGetAllStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const [open, setOpen] = React.useState(false);
  const [currentStudent, setCurrentStudent] = React.useState({
    id: "",
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    email_address:"",
    course_you_would_like_to_take: "",
    level_of_experience:""
  });

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setOpen(true);
    };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateStudent(currentStudent);
      refetch();
      setOpen(false);
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStudent({
      id: "",
      first_name: "",
      last_name: "",
      gender: "",
      phone_number: "",
      email_address:"",
      course_you_would_like_to_take: "",
      level_of_experience:""
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 120,
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 120,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 110,
      editable: true,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    {
      field: "email_address",
      headerName: "Email Address",
      width: 150,
      editable: true,
    },
    {
      field: "course_you_would_like_to_take",
      headerName: "Course",
      width: 200,
      editable: true,
    },
    {
      field: "level_of_experience",
      headerName: "Level Of Experience",
      width: 150,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEdit(params.row)}
          color="primary"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows = students.map((student) => ({
    id: student.id,
    first_name: student.first_name,
    last_name: student.last_name,
    gender: student.gender,
    phone_number: student.phone_number,
    email_address: student.email_address,
    course_you_would_like_to_take: student.course_you_would_like_to_take,
    level_of_experience: student.level_of_experience,
  }));

  return (
    <div>
      <div className="box">
        <Box sx={{ height: 600, width: "80%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 9,
                },
              },
            }}
            pageSizeOptions={[9]}
            checkboxSelection
            disableRowSelectionOnClick
          />

          {/* Edit Modal */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 9,
                borderRadius: 2,
              }}
            >
              <h3>Edit Student</h3>
              <TextField
                fullWidth
                label="First Name"
                value={currentStudent.first_name}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    first_name: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                value={currentStudent.last_name}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    last_name: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Gender"
                value={currentStudent.gender}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    gender: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={currentStudent.phone_number}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    phone_number: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                value={currentStudent.email_address}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    email_address: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Course"
                value={currentStudent.course_you_would_like_to_take}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    course_you_would_like_to_take: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="level of experience"
                value={currentStudent.level_of_experience}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    level_of_experience: e.target.value,
                  })
                }
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                sx={{ mt: 2, ml: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Modal>
        </Box>
      </div>
    </div>
  );
}
