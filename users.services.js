const usersControllers = require("./users.controller");

const getAllUsers = (req, res) => {
    usersControllers
    .getAllUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const postUser = (req, res) => {
  const data = req.body;
  if (data.firstName && data.lastName && data.email && data.password && data.age ) {
    usersControllers.createUser(data)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json({message : err.message})
        })  
  } else {
    res.status(400).json({message : 'Missing data'})
  }
};

const getUserById = (req, res) => {
    const id = req.params.id;

    usersControllers.getUserById(id)
        .then(data => {
          if(data){
            res.status(200).json(data)
          }else {
            res.status(404).json({message: 'Invalid ID'})
          }
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
}

const patchUser = (req, res) => {
  const id = req.params.id 
  const {firstName, lastName, email, password, age} = req.body;

  usersControllers.editUser(id, {firstName, lastName, email, password, age})
    .then((response) => {
      
      if(response[0]){
        res.status(200).json({
          message: `User with id: ${id}, edited succesfully!`
        })
      } else {
        res.status(404).json({message: 'Invalid ID'})
      }
    })
    .catch(error => {
      res.status(400).json({message: error.message})
    })
}

const putUser = ( req, res ) => {
  const id = req.params.id;
  const {firstName, lastName, email, password, age} = req.body

  
  if(firstName && lastName && email && password){
    usersControllers.editUser(id, {firstName, lastName, email, password, age})
      .then((response) => {
        
        if(response[0]){
          res.status(200).json({message: `User with ID: ${id}, edited succesfully!`})
        } else {
          res.status(404).json({message: 'Invalid ID'})
        }
      })
      .catch(err => {
        res.status(400).json({message: err.message})
      })
  } else {
    res.status(400).json({message: 'Missing data', fields : {
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      password: 'string',
      age: 'Number'
    }})
  }
}

const deleteUser = (req, res) => {
  const id = req.params.id
  usersControllers.deleteUser(id)
    .then((response) => {
      if(response){
        res.status(204).json()
      }else{
        res.status(400).json({message: 'Invalid ID'})
      }
    })
    .catch(err=> {
      res.status(400).json(err)
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser,
    patchUser,
    putUser,
    deleteUser
}