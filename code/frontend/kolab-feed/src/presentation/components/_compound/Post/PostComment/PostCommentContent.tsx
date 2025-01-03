import { 
    EditableField,
    FormControl,
    Action, 
} from '@/presentation/components'

import { IPostComment } from './types'

import { 
    ActionContainer,
    ContentSection 
} from './styles'

export default function PostCommentContent({ 
    commentList,
    onChangeEditableComment,
    onConfirmEditableComment,
    onChangeComment,
    onSubmitComment,
 }: IPostComment) {

    return (
        <>
            <ContentSection>
                {
                    (commentList && !!commentList.length) && 
                        commentList.map(comment => (
                            <EditableField
                            key={comment.id}
                            fieldType='text'
                            labelField={comment.body ?? ''}
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
                                onChange: onChangeEditableComment,
                                onConfirm: onConfirmEditableComment,
                            }}
                        />
                        ))
                }

                <FormControl.Textarea 
                    placeholder='Adiciona Comentário'
                    onChange={(e) => {
                        if(onChangeComment) onChangeComment(e)
                    }} 
                />

                <ActionContainer>
                    {
                        true && 
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