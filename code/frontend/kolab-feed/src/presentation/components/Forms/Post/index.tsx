import { 
    Fieldset,
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
        handleSubmit,
        formState: { errors }, 
    } = useForm<IPostData>({
        defaultValues: data,
    })

    function onSubmit(data: IPostData): void {
        console.log('onSubmit...')
        console.log(data)
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
                        status={{ invalid: !!errors.title, }}
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
                    />

                    <Flex gap='1rem' justifyContent='flex-end'>
                            <Action.Btn 
                                actionType='submit' 
                                state={{ 
                                    disabled: !!Object.keys(errors).length,
                                    loading: false, 
                                }} 
                            />
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