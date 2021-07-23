import Router from "next/router";
import React from "react";
import { mutate } from "swr";

// import ListErrors from "../common/ListErrors";
import UserAPI from "../../features/api/user";

const LoginForm = (props) => {

  const { handleLogin } = props;
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = React.useCallback((e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }, []);
  const handlePasswordChange = React.useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  const handleSubmit = async (e) => {
    handleLogin(email, password)
  };

  return (
    <>
      {/* <ListErrors errors={errors} /> */}

      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Nombre"
            value={email}
            onChange={handleEmailChange}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          onClick={handleSubmit}
        >
          Iniciar sesion
        </button>
      </fieldset>
    </>
  );
};

export default LoginForm;
