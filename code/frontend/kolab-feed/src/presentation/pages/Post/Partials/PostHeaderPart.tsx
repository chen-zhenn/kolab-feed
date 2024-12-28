import { 
    PostCard,
    PostHeader,
    EditableField,
} from '@/presentation/components'

import {
    Header, 
} from '../styles'

import { IPostPage } from '../types'

export default function PostHeaderPart({ 
    data,
    postData, 
    handlers,
}: IPostPage){

    const user = data
        ?.flatMap(post => post.users?.filter(user => user.post_id === post.id))[0]

    return (
        <Header>
                <PostCard.Container>
                    <PostCard.Header>
                        <PostHeader.Container>
                        <PostHeader.Avatar 
                            imageSource={user?.avatar} 
                            imageName={user?.username} 
                            />
                            <aside style={{ flexGrow: 1 }}>
                                <EditableField
                                    handlers={{ onConfirm: handlers?.handleConfirmBodyPost }} 
                                    labelField={postData?.body ?? 'Comece a escrever sua publicação'} 
                                    fieldType='text'
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
                                />
                            </aside>
                        </PostHeader.Container>
                    </PostCard.Header>
                </PostCard.Container>
        </Header>
    )
}