import { useState } from 'react'

import { 
    useNavigate,
} from 'react-router'

import { 
    useForm, 
} from 'react-hook-form'

import { IAuth } from '@/domain/models'

import { 
    HttpStatusCode,
    IHttpResponse, 
} from '@/infra'

import { HttpStatusMessages } from '@/main/services'

import { makeUser } from '@/main/usecases'

import { Utils } from '@/presentation/shared'

import {
    FormControl,
    Action,
    Toaster,
} from '@/presentation/components'

import {
    Wrap,
    Container,
    Form,
    FormItem,
} from './styles'

export function FormLogin(){

    const user = makeUser()
    const nav = useNavigate()

    const { 
        register,
        reset, 
        handleSubmit,
        formState: { errors }, 
    } = useForm<IAuth>({
        mode: 'onChange',
    })

    const [secret, setSecret] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const { launchToast } = Utils

    async function onSubmit(data: IAuth): Promise<IHttpResponse<[]> | any> {
        setLoading(true)

        try {
            const response = await user.login(data)
            if(response) {
                if(response.status !== 200) {
                    launchToast(response)
                    return response
                }
                const { statusText, message, ...newResponse } = response
                newResponse.statusText = 'success'
                newResponse.message = 'Sucesso: Login efetuado!'
                launchToast(newResponse)
                setTimeout(() => nav('/feed'), 1750)
                return response
            }   
        } catch (error) {
            const response = {
                status: HttpStatusCode.servererror,
                statusText: 'error',
                message: HttpStatusMessages.servererror,
            }
            return launchToast(response)
        } finally {
            reset()
            setLoading(false)
        }       
    }

    return (
        <Wrap>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <FormItem>
                        <FormControl.Input
                            label='Email'
                            placeholder='email@example.com'
                            errorText={errors.email?.message}
                            status={{ invalid: !!errors.email, disabled: loading }}
                            {...register('email', { required: 'Campo de email deve ser preenchido!' })}
                        />


                        <FormControl.Password 
                            label='Senha'
                            secret={secret}
                            errorText={errors.password?.message}
                            status={{ invalid: !!errors.password, disabled: loading }}
                            {...register('password', { required: 'Campo de senha deve ser preenchido!' })}
                            handlers={{
                                onVisibleChange: (visible) => setSecret(!visible),
                            }} 
                        />
                    </FormItem>

                    <FormItem action={true}>
                        <Action.Btn
                            actionType='submit'
                            label='Entrar'
                            loadingLabel='Aguarde'
                            state={{
                                disabled: !!Object.keys(errors).length || loading,
                                loading: loading
                            }}
                        />
                    </FormItem>
                </Form>
            </Container>
            <Toaster />
        </Wrap>
    )
}