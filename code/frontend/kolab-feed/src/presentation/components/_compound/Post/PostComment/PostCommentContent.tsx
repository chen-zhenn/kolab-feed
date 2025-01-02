import { useState } from 'react'

import { ValueChangeDetails } from '@zag-js/editable'

import { 
    EditableField,
    Action, 
} from '@/presentation/components'

import { IPostComment } from './types'

import { 
    ActionContainer,
    ContentSection 
} from './styles'

export default function PostCommentContent({ 
    contentValue,
    onConfirmComment,
    onSubmitComment,
 }: IPostComment) {

    const [content, setContent] = useState<string>('')

    function handleChangeComment(details: ValueChangeDetails): void {
        setContent(details.value)
    }

    return (
        <>
            <ContentSection>
                <EditableField
                    fieldType='text'
                    labelField={contentValue ?? 'Adicionar comentário'}
                    triggers={{
                        edit: {
                            view: true,
                            button: null
                        },
                        cancel:{
                            view: true,
                            button: null 
                        },
                        confirm: {
                            view: true,
                            button: null  
                        }           
                    }}
                    handlers={{
                        onChange: handleChangeComment,
                        onConfirm: onConfirmComment,
                    }}
                />
                <ActionContainer>
                    {
                        !!content.length && 
                        (
                            <Action.Btn 
                                label='comentar'
                                size='xs'
                                state={{
                                    disabled: false,
                                    loading: false
                                }}
                                handlers={{
                                    onclick: onSubmitComment 
                                }} 
                            />
                        )
                    }
                </ActionContainer>
            </ContentSection>
        </>
    )
}