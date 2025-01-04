import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message, Typography } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { type signUpFields } from "../../types/FormFields";
import { useUserDispatch } from "../../store/hooks";
import { googleLogin, signup } from "../../store/user-actions";

const { Paragraph } = Typography;

const signupSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignUp = () => {
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
  } = useForm<signUpFields>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<signUpFields> = async (data) => {
    try {
      await userDispatch(
        signup(data.email, data.password, data.firstname, data.lastname)
      );
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
          label="Firstname"
          help={errors.firstname?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Lastname"
          help={errors.lastname?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
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
            Sign up with email
          </Button>
        </Form.Item>
        <Form.Item>
          <Paragraph className="text-center">
            Already have an account? <Link to={"/auth/login"}>Login</Link>
          </Paragraph>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;
