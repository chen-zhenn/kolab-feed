import { 
    memo,
} from 'react'

import {
    Spinner,
} from '@chakra-ui/react'

import { 
    useGetUser, 
} from '@/presentation/hooks'

import { 
    PostCard,
    PostHeader,
    EditableField,
} from '@/presentation/components'

import {
    Header, 
} from '../styles'

import { IPostPage } from '../types'

function PostHeaderPart({ 
    data,
    postData, 
    handlers,
}: IPostPage){

    const { 
        data: userData, 
        loading,
    } = useGetUser()

    return (
        <Header>
                <PostCard.Container>
                    <PostCard.Header>
                        <PostHeader.Container>
                        {
                            loading ? 
                            (
                                <Spinner size='lg' />
                            ) : 
                            (
                                <PostHeader.Avatar 
                                    imageSource={userData?.avatar} 
                                    imageName={userData?.username} 
                                />
                            )
                        }
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

export default memo(PostHeaderPart)