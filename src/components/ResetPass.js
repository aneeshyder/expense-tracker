import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPassword(props) {
  const { userEmail, logOut } = props;
  const auth = getAuth();

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, userEmail);
    alert(`Password reset email sent to ${userEmail}`);
  };

  return (
    <div className="resetPassword-main">
      <button className="resetBtn" type="button" onClick={triggerResetEmail}>
        Reset password
      </button>
    </div>
  );
}

export default ResetPassword;
