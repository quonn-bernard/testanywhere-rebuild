import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleResetPasswordRequest } from "../features/auth/authSlice";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleResetPasswordRequest({email}));
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Your account email address</label>
        <input type="email" name="email" value={email} onChange={onChange} />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
};

export default PasswordResetForm;
