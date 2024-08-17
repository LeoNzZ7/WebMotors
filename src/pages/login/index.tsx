import { Container } from "../../components/container"
import logoImg from "../../assets/logo.svg"
import { Link } from "react-router-dom"
import { Input } from "../../components/inputComponent"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    email: z.string().email("Insira um email valido").min(1, "Este campo é obrigatório"),
    password: z.string().min(1, "Este campo é obrigatório"),
})

type FormData = z.infer<typeof schema>

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function onSubmit(data: FormData) {
        console.log(data)
    }

    return (
        <Container>
            <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4" >
                <Link to="/" className="mb-6 max-w-sm w-full" >
                    <img src={logoImg} alt="Logo do site" className="w-full" />
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white max-w-xl w-full rounded-lg p-5" >
                    <div className="mb-3" >
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            register={register}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="mb-3" >
                        <Input
                            type="password"
                            placeholder="Digite sua senha "
                            name="password"
                            error={errors.password?.message}
                            register={register}
                        />
                    </div>
                    <button
                        className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
                        type="submit"
                    >
                        Acessar
                    </button>
                </form>
                <Link to="/register" >
                    Ainda não tem uma conta? cadastra-se
                </Link>
            </div>
        </Container>
    )
}