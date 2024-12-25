import { useState } from 'react'
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
    Action,
    FormControl,
} from '@/presentation/components'
import { IFormPost } from './types'

export function FormPost({ 
    data,
    handlers 
}: IFormPost){

    const { 
        register,
        reset, 
        handleSubmit,
        formState: { errors }, 
    } = useForm<IPostData>({
        defaultValues: data,
        mode: 'onChange',
    })

    const [imagePreview, setImagePreview] = useState<string>()
    
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (!event.target.files) return
        const file = event.target.files?.[0]
        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(file)
    }

    function onSubmit(data: IPostData): void {
        console.log('onSubmit...')
        console.log(data)
        setImagePreview('')
        reset()
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
                        status={{ invalid: !!errors.title }}
                        {...register('title', { required: 'Campo deve ser preenchido!' })}
                    />

                    <FormControl.Textarea
                        label='Conteúdo' 
                        placeholder='Escreva o conteúdo da publicação'
                        errorText={errors.body?.message}
                        status={{ invalid: !!errors.body }}
                        {...register('body', { required: 'Campo deve ser preenchido!' })}
                    />

                    <FormControl.InputFile
                        label='Imagem'
                        placeholder='Carregar arquivo'
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
                                    disabled: !!Object.keys(errors).length,
                                    loading: false, 
                                }} 
                            />
                        </Show>

                        <Action.Btn
                            actionType='cancel'
                            state={{ 
                                disabled: false 
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
