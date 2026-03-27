import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData, LoginFormSchema } from "../lib/types";
import { useLoginMutation } from "../api/chatify.api";
import { LoaderIcon } from "lucide-react";
type Props = {};

const LoginPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) });
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const onsubmit = async (data: LoginFormData) => {
    await login(data);
  };
  return (
    <div>
      <Card className="w-[400px] bg-[#ffffff]">
        <CardHeader>
          <h2 className="text-xl font-bold text-center">Login In</h2>
          <h3 className="text-center text-gray-500 text-sm">
            Enter your credential to access your account
          </h3>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2.5"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div>
              <Input
                placeholder="Email"
                type="email"
                className="outline-none focus:ring-0 focus:border-transparent"
                {...register("email")}
                name="email"
              />
              {errors.email && (
                <span className="input-errors">{errors.email.message}</span>
              )}
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                className="outline-none focus:ring-0 focus:border-transparent"
                {...register("password")}
                name="password"
              />
              {errors.password && (
                <span className="input-errors">{errors.password.message}</span>
              )}
            </div>
            <Button className="bg-[#6366f2] cursor-pointer">
              Sign in{" "}
              {isLoading && <LoaderIcon className="text-white animate-spin" />}
            </Button>
            <h3 className="text-xs text-gray-500 text-center">
              Don't have an account?
              <Link to="/signup" className="text-[#6366f2] ml-0.5">
                Sign up
              </Link>
            </h3>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
