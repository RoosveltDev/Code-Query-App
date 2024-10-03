import Form from "../../components/Form/Form"

const Login = () => {
  return (
    <div className="login-container">
      <img src="" alt="Logo" />
      <h1>Log In</h1>     
      <Form>
        <div>
        <input type="checkbox" name="remember" />
        Remember me
        </div>
      </Form> 
    </div>
  )
}

export default Login
