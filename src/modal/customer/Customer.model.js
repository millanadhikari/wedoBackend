const { CustomerSchema } = require('./Customer.schema')


const insertCustomer = (userObj) => {
  return new Promise((resolve, reject) => {
    CustomerSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch(error => reject(error));


  })

}

const getCustomerByEmail = email => {
  return new Promise((resolve, reject) => {
    if (!email) return false
    try {
      CustomerSchema.findOne({ email }, (error, data) => {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(data)
      });
    } catch (error) {
      reject(error)
    }

  })
}

const storeUserRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      CustomerSchema.findOneAndUpdate({ _id }, {
        $set: {
          "refreshJWT.token": token,
          "refreshJWT.addedAt": Date.now()
        }
      },
        { new: true }
      )
        .then((data) => resolve(data));
      // .catch((error) => reject(error))

    } catch (error) {
      reject(error)
    }
  })
}

const getCustomerById = async (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false
    try {
      CustomerSchema.findOne({ _id }, { _id, firstName: 1, lastName: 1, email: 1, phone: 1, profilePic: 1, isAdmin: 1, isCustomer: 1, username: 1, address1:1, address:2, state:1, postcode:1 })
        .then((data) => {
          resolve(data)
        })
    } catch (error) {
      reject(error)
    }

  })
}

const verifyUser = (_id, email) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { _id, email, isVerified: false },
        {
          $set: { isVerified: true },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
const updateCustomerDetails = (lama, _id) => {
  const filter = { _id: _id };
  const update = { $set: { ...lama } };

  return new Promise((resolve, reject) => {
    try {
      CustomerSchema.findOneAndUpdate(
        filter,
        update,
        { new: true }
      )
        .then((data) => resolve(data))

        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  });
};


module.exports = {
  insertCustomer,
  getCustomerByEmail,
  storeUserRefreshJWT,
  getCustomerById,
  verifyUser,
  updateCustomerDetails

}