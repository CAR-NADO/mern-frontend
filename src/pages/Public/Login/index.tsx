import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, Resolver } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ILogin, loginDef, loginSchema } from "./constants";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/slices/authSlice";
import { Button, TextInput } from "@/components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: loginDef,
    resolver: yupResolver(loginSchema) as Resolver<ILogin>,
    mode: "onSubmit",
  });

  // const { data: productOfferedList = [], isLoading } = useQuery({
  //   queryKey: ["getProductOffered"],
  //   queryFn: () => getProductOffered(),
  //   select: (data) => data?.data?.data,
  // })

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["userSignup"],
  //   mutationFn: userSignup,
  //   onSuccess: ({ data }) => {
  //     if (data && data?.data && data.data?.length > 0) {
  //       setUserId(data.data[0]?.id)
  //       setName(data.data[0]?.name)
  //       setEmail(data.data[0]?.email)
  //     }
  //     toaster.success("User registered successfully.")
  //     navigate("/email-verification")
  //   },
  // })

  const onSubmit = (value: ILogin) => {
    const payload = {
      ...value,
    };
    console.log("payload", payload);
    dispatch(
      login({
        token: "23452asnjnfj*$&78478kjHHHbfjksfnj",
      })
    );
    // mutate(payload)
  };
  return (
    <div className="flex flex-col px-6 md:px-16 py-12 items-center gap-12 p-20">
      {/* Left Side */}
      <form className="w-full bg-white h-full" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="w-full overflow-auto max-h-[calc(100vh-0px)] flex flex-col gap-6 p-6 px-10">
          <div className="flex flex-col gap-6">
            {/* <img src={Logo} alt="Logo" width={132} /> */}
            <div className="text-4xl font-semibold">Login</div>
          </div>
          <div className="w-full flex-col flex gap-4">
            <div className="w-full">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Email" placeholder="Enter email" error={errors?.email?.message} />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Password" placeholder="Enter password" error={errors?.password?.message} />
                )}
              />
            </div>
            <div className="w-full flex justify-center mt-2 mb-2">
              <Button className="w-full h-12 text-lg" type="submit">
                Submit
                {/* {isPending && <Loader color="white" />}Submit */}
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-full flex text-sm gap-1">
                Don't Have an Account ?{" "}
                <span className="text-gold cursor-pointer" onClick={() => navigate("/signup")}>
                  Sign-up Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
