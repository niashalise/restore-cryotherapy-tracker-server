import users from "../data/storeInventory"

const signup = (req, res, next) => {
  //firstName, lastName, username, password <-- req.body
  const { storeName, email, password } = req.body;

  try {
    const newUser = {
      storeName,
      email,
      password,
    };

    users.push(newUser);

    newUser.password = undefined;

    res.status(201).json({
      success: { message: "User is created." },
      data: { newUser },
      statusCode: 201,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: { message: "Something went wrong." },
    });
  }
};

const login = (req, res, next) => {
  res.status(200).json({
    success: { message: "Login was successful." },
  });
};

const loginLocal = (req, res, next) => {
  const user = users[users.length - 1];

  const userCopy = user;
  let result = true;

  //passport
  function mockPassport(err, user) {
    //authenticate user
  }

  mockPassport("err", user);

  res.status(200).json({
    success: { message: "Login successful." },
    data: { user: userCopy },
    result,
  });
};

const logout = (req, res, next) => {
  // passport is going to logout the user

  res.clearCookie("connect.sid");

  // passport and other methods
  function sessionDestruction(err) {
    if (err) {
      return next(err);
    }
  }
  sessionDestruction();

  res.status(200).json({
    success: { message: "Logged out successfully." },
  });
};

module.exports = { signup, login, loginLocal, logout };