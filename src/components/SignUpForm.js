function SignUpForm(props) {
    return (
        <div className="login-form">
           
            <input type="text" placeholder='email' onChange={(event) => {
                props.email(event.target.value)
            }} />
            <input type="number" placeholder='password'onChange={(event) => {
                props.password(event.target.value)
            }} />

            <button onClick={props.createUser}>Sign Up</button>
        </div>
    )
}

export default SignUpForm;