import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { Grid, Modal, Pagination, ToggleButton, Typography } from "@mui/material";
import { CheckCircleOutlineRounded } from "@material-ui/icons";
import getUsersAll from "../hooks/getUsersAll";
import CardUser from "../components/CardUser";
import FormCreateUser from "../components/FormCreateUser";
import FormUpdateUser from "../components/FormUpdateUser";
import FormDeleteUser from "../components/FormDeleteUser";
import { styleModal } from "../styles/modal";


const AllUsers = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [listaPost, setListaPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSelected, setUserSelected] = useState();
  const [areMyUsers, setAreMyUsers] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleCloseDelete = () => {
    getList();
    setOpenModalDelete(false);
  };

  const handleCloseUpdate = () => {
    getList();
    setOpenModalUpdate(false);
  };

  const handleClose = () => {
    getList();
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getList = async () => {
    const { users, total } = await getUsersAll(page - 1, 4, areMyUsers);
    setTotalPages(total);

    const fullNameUsers = users.map((itemUser) => {
      itemUser.fullNameUser = `${itemUser.title}. ${itemUser.firstName} ${itemUser.lastName}`;
      return itemUser;
    });

    const filteredUsers = fullNameUsers.filter(itemUser => {
      return itemUser.fullNameUser.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    }
    );
    setListaPost(filteredUsers);
  };

  useEffect(() => {
    getList();
    // setTotalPages(Math.ceil(response.data.total / 10)); // Calcula el número total de páginas
    setTotalPages(totalPages / 10); // Calcula el número total de páginas

  }, [page, searchTerm, areMyUsers]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Typography sx={{ fontWeight: 'bold' }} align="left" component="p">only my users</Typography>

      <ToggleButton
        value="check"
        selected={areMyUsers}
        onChange={() => {
          setAreMyUsers(!areMyUsers);
        }}
      >
        <CheckCircleOutlineRounded />
      </ToggleButton>
      {!areMyUsers && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      )}

      <Button variant="contained" onClick={handleOpen}>CREAR NUEVO</Button>

      <Box m={2} p={2}>
        <Typography sx={{ fontWeight: 'bold' }} align="center" variant="h4" component="h4" mb={8} mt={4} color="blue">usuarios</Typography>
        <Grid container spacing={2}>
          {listaPost.map((user) => (
            <Grid item s={3} key={user.id}>
              <Box m={2} p={2}>
                <CardUser
                  user={user}
                  handleClose={handleCloseUpdate}
                  setOpen={setOpenModalUpdate}
                  setUserSelected={setUserSelected}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <FormCreateUser user={user} handleClose={handleClose} />
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Modal>
        {userSelected && (
          <Modal
            open={openModalUpdate}
            onClose={handleCloseUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <Typography variant="h6" component="h2">
                <FormUpdateUser
                  user={userSelected}
                  handleClose={handleCloseUpdate} />
              </Typography>
              <Button onClick={handleCloseUpdate}>Cerrar</Button>
            </Box>
          </Modal>
        )}

        <Modal
          open={openModalDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <FormDeleteUser user={user} handleClose={handleClose} />
            <Button onClick={handleCloseDelete}>Cerrar</Button>
          </Box>
        </Modal>

      </Box>
      {!areMyUsers && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      )}
    </>
  );
};

export default AllUsers;
