function SignUpForm(props) {
  return (
    <div className="signup-form form">
      <input
        type="text"
        placeholder="email"
        onChange={(event) => {
          props.email(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(event) => {
          props.password(event.target.value);
        }}
      />

      <button onClick={props.createUser}>Sign Up</button>
    </div>
  );
}

export default SignUpForm;