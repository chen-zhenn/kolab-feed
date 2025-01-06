import { useState } from 'react'

import { 
    useForm, 
} from 'react-hook-form'

import {
    Fieldset,
    Flex,
    Show,
} from '@chakra-ui/react'

import { ICommentData } from '@/domain/models'

import { IHttpResponse } from '@/infra'

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

    const [loading, setLoading] = useState<boolean>(false)

    async function onSubmit(data: ICommentData): Promise<IHttpResponse<any[]>> {
        console.log('onSubmit...')
        console.log('=> data: ', data)
        return
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