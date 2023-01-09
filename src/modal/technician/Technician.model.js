
const { TechnicianSchema } = require('./Technician.schema');


const insertTechnician = (techObj) => {
  console.log(techObj)

  return new Promise((resolve, reject) => {
    TechnicianSchema(techObj)
      .save()
      .then((data) => resolve(data))
      .catch(error => reject.log(error));


  })

}

const getAllTechnicians = () => {
  return new Promise((resolve, reject) => {
    try {
      TechnicianSchema
        .find({})
        .then((data) => {
          resolve(data)
        })
        .catch((error) => reject(error))

    } catch (error) {
      reject(error)
    }
  })
}


const getTechnicianByDesired = (filter, word) => {
  let field = filter
  let value = word
  let liter = {}
  liter[field] = value
  return new Promise((resolve, reject) => {
    try {
      TechnicianSchema.find(liter
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

// const getCustomerByEmail = email => {
//   return new Promise((resolve, reject) => {
//     if (!email) return false
//     try {
//       CustomerSchema.findOne({ email }, (error, data) => {
//         if (error) {
//           console.log(error)
//           reject(error)
//         }
//         resolve(data)
//       });
//     } catch (error) {
//       reject(error)
//     }

//   })
// }

// const storeUserRefreshJWT = (_id, token) => {
//   return new Promise((resolve, reject) => {
//     try {
//       CustomerSchema.findOneAndUpdate({ _id }, {
//         $set: {
//           "refreshJWT.token": token,
//           "refreshJWT.addedAt": Date.now()
//         }
//       },
//         { new: true }
//       )
//         .then((data) => resolve(data));
//       // .catch((error) => reject(error))

//     } catch (error) {
//       reject(error)
//     }
//   })
// }

// const getCustomerById = async (_id) => {
//   return new Promise((resolve, reject) => {
//     if (!_id) return false
//     try {
//       CustomerSchema.findOne({ _id }, { _id, firstName: 1, lastName: 1, email: 1, phone: 1, profilePic: 1, isAdmin: 1, isCustomer: 1, username: 1, address: 1, state: 1, postcode: 1 })
//         .then((data) => {
//           resolve(data)
//         })
//     } catch (error) {
//       reject(error)
//     }

//   })
// }

// const verifyUser = (_id, email) => {
//   return new Promise((resolve, reject) => {
//     try {
//       UserSchema.findOneAndUpdate(
//         { _id, email, isVerified: false },
//         {
//           $set: { isVerified: true },
//         },
//         { new: true }
//       )
//         .then((data) => resolve(data))
//         .catch((error) => {
//           console.log(error.message);
//           reject(error);
//         });
//     } catch (error) {
//       console.log(error.message);
//       reject(error);
//     }
//   });
// };

const updateTechnician = (updateTechObj) => {
  let _id = updateTechObj._id


  return new Promise((resolve, reject) => {
    try {
      TechnicianSchema.findOneAndUpdate(
        { _id },
        {
          $set: updateTechObj.updateTechObj
        },

        { new: true }
      )
        .then((data) => resolve(data))

        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};


const deleteTechnician = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      TechnicianSchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertTechnician,
  updateTechnician,
  getAllTechnicians,
  getTechnicianByDesired,
  // getCustomerByEmail,
  // storeUserRefreshJWT,
  // getCustomerById,
  // verifyUser,
  // updateCustomerDetails
  deleteTechnician

}