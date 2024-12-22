import { Editable } from '@chakra-ui/react'
import { IPostComment } from './types'
import { Label } from './styles'

export default function PostCommentContent({ 
    contentValue,
 }: IPostComment) {
    return (
        <>
            { !!contentValue && <Label>Comentário</Label> }
            <Editable.Root 
                defaultValue="Adicionar comentário" 
                value={contentValue}
            >
                <Editable.Preview />
                <Editable.Textarea />
            </Editable.Root>
        </>

    )
}