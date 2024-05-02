import useGoogle from '../../hooks/useGoogle';
import google_logo from '../../images/Google-logo.svg'


const GoogleAuth = (props) => {
    const {googleAuth, error} = useGoogle();

  return (
    <div className='login-google' onClick={googleAuth}>
      <img src={google_logo} alt='Google logo' className='login-google-logo' />
      {props.type} with Google
    </div>
  );
};

export default GoogleAuth;
