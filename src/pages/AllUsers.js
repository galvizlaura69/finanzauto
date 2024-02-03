import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { Modal, Pagination, TextField, ToggleButton, Typography } from "@mui/material";
import { CheckCircleOutlineRounded } from "@material-ui/icons";
import getUsersAll from "../users/hooks/getUsersAll";
//import CardUser from "../components/CardUser";
import FormCreateUser from "../users/components/FormCreateUser";
import FormUpdateUser from "../users/components/FormUpdateUser";
import FormDeleteUser from "../users/components/FormDeleteUser";
import { styleModal } from "../style/modal";
import TableUsers from "../users/components/TableUsers";


const AllUsers = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSelected, setUserSelected] = useState();
  const [areMyUsers, setAreMyUsers] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleOpenModalCreate = () => setOpenModalCreate(true);
  const handleCloseDelete = () => {
    getList();
    setOpenModalDelete(false);
  };

  const handleCloseUpdate = () => {
    getList();
    setOpenModalUpdate(false);
  };

  const handleCloseCreate = () => {
    getList();
    setOpenModalCreate(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getList = async () => {
    const pagePayload = page - 1;
    const { users, total } = await getUsersAll(pagePayload, 2, areMyUsers);
    setTotalPages(total);

    const fullNameUsers = users.map((itemUser) => {
      itemUser.fullNameUser = `${itemUser.id} , ${itemUser.title}. ${itemUser.firstName} ${itemUser.lastName}`;
      return itemUser;
    });

    const filteredUsers = fullNameUsers.filter(itemUser => {
      return itemUser.fullNameUser.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    }
    );
    setListUsers(filteredUsers);
  };

  useEffect(() => {
    getList();
  }, [page, searchTerm, areMyUsers]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="controls-container container-display">
        <TextField
          sx={{ margin: 1 }}
          label="Buscar..."
          variant="outlined"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Typography sx={{ margin: 1 }}>Usuarios creados por mi</Typography>
        <ToggleButton
          sx={{ margin: 1 }}
          value="check"
          placeholder="solo mis usuarios"
          selected={areMyUsers}
          onChange={() => {
            setAreMyUsers(!areMyUsers);
            setPage(1);
          }}
        >
          <CheckCircleOutlineRounded />
        </ToggleButton>
        <Button variant="contained" onClick={handleOpenModalCreate}>
          CREAR NUEVO
        </Button>

     </div>
      <Box m={2} p={2}>
        <div className="container-display">
        <Typography style={{ fontWeight: 'bold',fontSize: '16'}}>
          Usuarios:
        </Typography>
        {!areMyUsers && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        )}
        </div>
        <TableUsers
          list={listUsers}
          setOpenUpdate={setOpenModalUpdate}
          setOpenDelete={setOpenModalDelete}
          setUserSelected={setUserSelected}
          setIsEdit={setIsEdit}
        />
        {userSelected && (
          <>
            <Modal
              open={openModalDelete}
              onClose={handleCloseDelete}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <FormDeleteUser user={userSelected} handleClose={handleCloseDelete} />
              </Box>
            </Modal>
            <Modal
              open={openModalUpdate}
              onClose={handleCloseUpdate}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{...styleModal, maxHeight: '80vh', overflowY: 'auto'}}>
                <FormUpdateUser
                  id={userSelected.id}
                  handleClose={handleCloseUpdate}
                  isUpdate={isEdit}
                />
              </Box>
            </Modal>
          </>
        )}
      </Box>
      <Modal
        open={openModalCreate}
        onClose={handleCloseCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <FormCreateUser handleClose={handleCloseCreate} />
          <Button onClick={handleCloseCreate}>Cerrar</Button>
        </Box>
      </Modal>
    </>
  );
};

export default AllUsers;