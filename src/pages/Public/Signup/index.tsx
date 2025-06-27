import { Button, CheckboxInput, PhoneInput, TextInput } from "@/components";
import { Label } from "@/components/ui/label";
import { Controller, Resolver, useForm } from "react-hook-form";
import { parsePhoneNumber } from "react-phone-number-input";
import { ISignup, signupDef, signupSchema } from "./constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISignup>({
    defaultValues: signupDef,
    resolver: yupResolver(signupSchema) as Resolver<ISignup>,
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

  const onSubmit = ({ phone, ...rest }: ISignup) => {
    const parsedNumber = parsePhoneNumber(phone as string);
    const payload = {
      prefix: `+${parsedNumber?.countryCallingCode}`,
      phone: parsedNumber?.nationalNumber,
      ...rest,
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
    <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-16 py-12 items-center gap-12">
      {/* Left Side */}
      <form className="w-full max-w-[700px] bg-white h-full" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="w-full overflow-auto max-h-[calc(100vh-0px)] flex flex-col gap-6 p-6 px-10">
          <div className="flex flex-col gap-6">
            {/* <img src={Logo} alt="Logo" width={132} /> */}
            <div className="text-4xl font-semibold">Sign Up</div>
          </div>
          <div className="w-full flex-col flex gap-4">
            <div className="w-full">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} label="Full Name" placeholder="Enter full name" error={errors?.name?.message} />
                )}
              />
            </div>
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
              <PhoneInput
                name="phone"
                control={control}
                label="Phone"
                // defaultCountry='GB'
                onChange={(phone: string | undefined) =>
                  setValue("phone", phone, {
                    shouldValidate: true,
                  })
                }
                error={errors?.phone?.message}
              />
            </div>
            {/* <div className="w-full">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => <CountrySelect {...field} label="Country" error={errors?.country?.message} />}
                />
              </div> */}
            <div className="w-full flex justify-center mt-2 mb-2">
              <Button className="w-full h-12 text-lg" type="submit">
                Submit
                {/* {isPending && <Loader color="white" />}Submit */}
              </Button>
            </div>
            <div className="flex items-center content-center gap-2">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <CheckboxInput
                    {...field}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    id="terms"
                  />
                )}
              />
              <Label className="mb-0" htmlFor="terms">
                By continuing i accept the Terms and Privacy Policy.
              </Label>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full flex text-sm gap-1">
                Already Have an Account ?{" "}
                <span className="text-gold cursor-pointer" onClick={() => navigate("/")}>
                  Log-in Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Right Side - Images */}
      <div className="relative grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <img
            src="https://images.unsplash.com/photo-1748015879337-ef95556c3749?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team working"
            className="rounded-xl shadow-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1748199625283-581bc1e9b1a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
            alt="Remote call"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="space-y-4 mt-8">
          <img
            src="https://plus.unsplash.com/premium_photo-1664298285974-f78346eec2b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbCUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Office team"
            className="rounded-xl shadow-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1655313719493-16ebe4906441?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D"
            alt="Work setup"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
