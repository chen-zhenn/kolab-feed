import { useState } from 'react'

import { 
    useRevalidator,
} from 'react-router'

import { 
    useForm, 
} from 'react-hook-form'

import {
    Fieldset,
    Flex,
    Show,
} from '@chakra-ui/react'

import { ICommentData } from '@/domain/models'

import { 
    IHttpResponse,
    HttpStatusCode, 
} from '@/infra'

import { 
    HttpStatusMessages, 
} from '@/main/services'

import { makeComment } from '@/main/usecases'

import { Utils } from '@/presentation/shared'

import { 
    FormControl,
    Action, 
} from '@/presentation/components'

import { 
    IFormComment, 
} from './types'

export function FormComment({ 
    data, 
    handlers,
 }: IFormComment ) {

    const { 
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ICommentData>({
        defaultValues: data,
        mode: 'onChange'
    })

    const comment = makeComment()
    const { revalidate, state } = useRevalidator()
    const [loading, setLoading] = useState<boolean>(false)
    const { launchToast } = Utils

    async function onSubmit(data: ICommentData): Promise<void> {
        
        if(!data || !data.id) return
        setLoading(true)

        try {
            const response: 
                IHttpResponse<ICommentData[]> = 
                await comment.update(data)

            if(response) {
                if(
                    response.status === HttpStatusCode.success
                ) revalidate()
                launchToast(response)
            }
        } catch (error) {
            const response = {
                status: HttpStatusCode.servererror,
                statusText: 'error',
                message: HttpStatusMessages.servererror,
            }
            launchToast(response)
        } finally {
            setLoading(false) 
        }
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root>

            <Fieldset.HelperText>
                Forneça detalhes, conforme campos abaixo.
            </Fieldset.HelperText>

            <Fieldset.Content>
                <FormControl.Textarea
                    label='Escreva o conteúdo do comentário' 
                    {...register('body', { required: 'Campo deve ser preenchido!' })} 
                />
            </Fieldset.Content>

            <Flex gap='1rem' justifyContent='flex-end'>
                <Show when={!Object.keys(errors).length}>
                    <Action.Btn 
                        actionType='submit'
                        loadingLabel='Atualizando' 
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
                        onCancel: handlers.onCancel,  
                    }} 
                />
            </Flex>

            </Fieldset.Root>
        </form>
    )
}