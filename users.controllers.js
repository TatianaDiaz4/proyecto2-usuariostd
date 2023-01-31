const uuid = require("uuid");
const Users = require("../users/users.router");

const getAllUsers = () => {
  const data = Users.findAll(); 
  return data;
};

const createUser = async (data) => {
  const newUser = await Users.create({
        id: baseId++,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password:data.password,
        age: data.age
  });

  return newUser;
};


const getUserById = async (id) => {
  const data = await Users.findOne({
    where: {
      id,
    },
  });
 
  return data; 
};

const editUser = async (id, data) => {
  const response = await Users.update(data, {
    where: {
      id: id,
    },
  });
  return response;
};

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id: id
        }
    })
    return data
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser
};
