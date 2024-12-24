import { 
    Fieldset,
    Textarea,
    Input,
    Flex,
} from '@chakra-ui/react'

import { 
    useForm, 
} from 'react-hook-form'

import { 
    IPostData, 
} from '@/domain/models'

import { 
    Field,
    Action,
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

    function handleUpLoadFile(details: FileAcceptDetails): void {
        console.log('handleUpLoadFile...')
        console.log(details)
    }

    function onSubmit(data: IPostData): void {
        console.log('onSubmit...')
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root>

                <Fieldset.Legend>
                    Dados de publicação
                </Fieldset.Legend>

                <Fieldset.HelperText>
                    Forneça detalhes de publicação 
                    conforme campos abaixo.
                </Fieldset.HelperText>

                <Fieldset.Content>
                    <Field 
                        label='Título'  
                        invalid={!!errors.title}
                        errorText={errors.title?.message}
                    >
                        <Input
                            placeholder='Escreva o título do publicação'
                            { ...register(
                                'title', 
                                { required: 'Campo deve ser preenchido' }) 
                            }
                        />
                    </Field>

                    <Field 
                        label='Conteúdo'
                        invalid={!!errors.body}
                        errorText={errors.body?.message}
                    >
                        <Textarea
                            placeholder='Conteúdo'
                            { 
                                ...register('body', 
                                    { required: 'Campo deve ser preenchido' })
                            } 
                        />
                    </Field>

                    <Field label='Imagem'>
                        <Action.Btn
                            actionType='upload'
                            state={{ 
                                disabled: false,
                                loading: false, 
                            }} 
                            handlers={{ 
                                onUpload: handleUpLoadFile  
                            }} 
                        />
                    </Field>

                    <Flex gap='1rem' justifyContent='flex-end'>
                        <Action.Btn 
                            actionType='submit' 
                            state={{ 
                                disabled: false,
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