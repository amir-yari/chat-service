import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message, Typography } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { type loginFields } from "../../types/FormFields";
import { useUserDispatch } from "../../store/hooks";
import { googleLogin, login } from "../../store/user-actions";

const { Paragraph } = Typography;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const displayErrorMessage = (msg: string) => {
    messageApi.error(msg);
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginFields> = async (data) => {
    try {
      await userDispatch(login(data.email, data.password));
      navigate("/chat");
    } catch (error: any) {
      const errorMessage = error.message;
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
      displayErrorMessage(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await userDispatch(googleLogin());
      navigate("/chat");
    } catch (error: any) {
      const errorMessage = error.message;
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
      displayErrorMessage(errorMessage);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        onFinish={handleSubmit(onSubmit)}
        className="login-form border border-gray-300 p-8 rounded-lg shadow-lg max-w-md mx-auto bg-white"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item>
          <Button icon={<FcGoogle />} onClick={handleGoogleLogin} block>
            Continue with Google
          </Button>
        </Form.Item>
        <Divider plain>Or</Divider>
        <Form.Item
          label="Email"
          help={errors.email?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          help={errors.password?.message}
          validateStatus={errors.password ? "error" : ""}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block loading={isSubmitting}>
            Sign in with email
          </Button>
        </Form.Item>
        <Form.Item>
          <Paragraph className="text-center">
            Haven't got an account? <Link to={"/auth/signup"}>Sign Up</Link>
          </Paragraph>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
