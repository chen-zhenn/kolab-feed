import { useState } from 'react'

import { 
    Fieldset,
    Textarea,
    Input,
    Flex,
} from '@chakra-ui/react'

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

    const [postData, setpostData] = useState<IPostData>({
        userId: data.userId,
        title: data.title ?? '',
        body: data.body ?? '',
    })

    function handleUpLoadFile(details: FileAcceptDetails): void {
        console.log('handleUpLoadFile...')
        console.log(details)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        console.log('handleSubmit...')
        event.preventDefault()
        console.log(postData)
    }

    return (
        <form onSubmit={handleSubmit}>
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
                        required 
                        invalid={!postData.title}
                        errorText='Campo deve ser preenchido'
                    >
                        <Input
                            name='title' 
                            placeholder='Escreva o título do publicação'
                            value={postData.title}
                            onChange={(e) => setpostData({ ...postData, title: e.target.value })}
                        />
                    </Field>

                    <Field 
                        label='Conteúdo' 
                        required
                        invalid={!postData.body}
                        errorText='Campo deve ser preenchido'
                    >
                        <Textarea
                            name='body'
                            placeholder='Conteúdo'
                            value={postData.body}
                            onChange={(e) => setpostData({ ...postData, body: e.target.value })} 
                        />
                    </Field>

                    <Field label='Imagem'>
                        <Action.Btn
                            actionType='upload'
                            state={{ 
                                disabled: false,
                                loading: false, 
                            }} 
                            habdlers={{ 
                                onUpload: handleUpLoadFile  
                            }} 
                        />
                    </Field>

                    <Flex gap='1rem' justifyContent='flex-end'>
                        {
                            postData.title && postData.body && (
                                <Action.Btn 
                                    actionType='submit' 
                                    state={{ 
                                        disabled: !postData.title || !postData.body,
                                        loading: false, 
                                    }} 
                                />
                            )
                        }
                        <Action.Btn
                            actionType='cancel'
                            state={{ 
                                disabled: false 
                            }} 
                            habdlers={{ 
                                onCancel: handlers.onCancel  
                            }} 
                        />
                    </Flex>
                </Fieldset.Content>
            </Fieldset.Root>
        </form>

    )
}