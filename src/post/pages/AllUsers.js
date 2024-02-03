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
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [listaPost, setListaPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSelected, setUserSelected] = useState();
  const [areMyUsers, setAreMyUsers] = useState(false);

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
      <div className="controls-container">
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
      </div>


      <div className="create-user-zone">
        <Button variant="contained" onClick={handleOpenModalCreate}>CREAR NUEVO</Button>
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
      </div>

      <Box m={2} p={2}>
        <Typography sx={{ fontWeight: 'bold' }} align="center" variant="h4" component="h4" mb={8} mt={4} color="blue">usuarios</Typography>
        <Grid container spacing={2}>
          {listaPost.map((user) => (
            <Grid item s={3} key={user.id}>
              <Box m={2} p={2}>
                <CardUser
                  user={user}
                  setOpenUpdate={setOpenModalUpdate}
                  setOpenDelete={setOpenModalDelete}
                  setUserSelected={setUserSelected}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
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
              <Box sx={styleModal}>
                  <FormUpdateUser
                    user={userSelected}
                    handleClose={handleCloseUpdate} />
              </Box>
            </Modal>
          </>
        )}
      </Box>
    </>
  );
};

export default AllUsers;
