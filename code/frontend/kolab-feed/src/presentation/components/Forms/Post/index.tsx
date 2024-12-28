import { 
    useState,
} from 'react'

import { 
    useParams,
} from 'react-router'

import { 
    Fieldset,
    Image,
    Flex,
    Show,
} from '@chakra-ui/react'

import { 
    useForm, 
} from 'react-hook-form'

import { 
    IPostData, 
} from '@/domain/models'

import {
    IHttpResponse, 
    HttpStatusCode,
} from '@/infra'

import { HttpStatusMessages } from '@/main/services'

import { makePost } from '@/main/usecases'

import { Utils } from '@/presentation/shared'

import { 
    Action,
    FormControl,
} from '@/presentation/components'

import { IFormPost } from './types'

export function FormPost({ 
    data,
    handlers 
}: IFormPost){

    const { id: post_id } = useParams()

    const { 
        register,
        reset, 
        handleSubmit,
        formState: { errors }, 
    } = useForm<IPostData>({
        defaultValues: data,
        mode: 'onChange',
    })

    const post = makePost()
    const [imagePreview, setImagePreview] = useState<string>(data.image ?? '')
    const [imageFile, setImageFile] = useState<File>()
    const [loading, setLoading] = useState<boolean>(false)
    const { launchToast } = Utils
    
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (!event.target.files) return
        const file = event.target.files?.[0]
        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(file)
    }

    async function onSubmit(data: IPostData): Promise<IHttpResponse<IPostData[]> | any> {
        const payload = {...data, imageFile }
        if(post_id) payload.id = parseInt(post_id)
        setLoading(true)   

        try {
            const response = await post.create(payload)
            if(response) {
                launchToast(response)
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
            setImagePreview('')
            reset()
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root>

                <Fieldset.HelperText>
                    Forneça detalhes de publicação 
                    conforme campos abaixo.
                </Fieldset.HelperText>

                <Fieldset.Content>

                    <FormControl.Input
                        label='Título' 
                        placeholder='Escreva o título da publicação'
                        errorText={errors.title?.message}
                        status={{ invalid: !!errors.title, disabled: loading }}
                        {...register('title', { required: 'Campo deve ser preenchido!' })}
                    />

                    <FormControl.Textarea
                        label='Conteúdo' 
                        placeholder='Escreva o conteúdo da publicação'
                        errorText={errors.body?.message}
                        status={{ invalid: !!errors.body, disabled: loading }}
                        {...register('body', { required: 'Campo deve ser preenchido!' })}
                    />

                    <FormControl.InputFile
                        label='Imagem'
                        placeholder='Carregar arquivo'
                        status={{ invalid: !!errors.title, disabled: loading }}
                        {...register('image')}
                        handlers={{ onChange: handleFileChange }}
                    />

                    <Show when={imagePreview?.length}>
                        <Flex><Image src={imagePreview} /></Flex>
                    </Show>

                    <Flex gap='1rem' justifyContent='flex-end'>
                        <Show when={!Object.keys(errors).length}>
                            <Action.Btn 
                                actionType='submit'
                                loadingLabel='Salvando' 
                                state={{ 
                                    disabled: !!Object.keys(errors).length || loading,
                                    loading: loading, 
                                }} 
                            />
                        </Show>

                        <Action.Btn
                            actionType='cancel'
                            state={{ 
                                disabled: loading
                            }} 
                            handlers={{ 
                                onCancel: handlers.onCancel  
                            }} 
                        />
                    </Flex>
                </Fieldset.Content>
            </Fieldset.Root>
        </form>
    )
}
