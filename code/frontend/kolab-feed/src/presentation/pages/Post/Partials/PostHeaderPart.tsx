import { 
    useEffect, 
    useState,
} from 'react'

import { IUsers } from '@/domain/models'

import {
    makeUser,  
} from '@/main/usecases'

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

    const user = makeUser()
    const [userData, setUserData] = useState<IUsers>()

    useEffect(() => {
        (async function(){
            try {
                const userAuth = await user.getUserAuth()
                if(userAuth && userAuth.id) {
                    const userResponse = await user.getById(userAuth.id)
                    if(userResponse && userResponse.status === 200) {
                        if(userResponse.data) setUserData(userResponse.data[0])
                    }
                }
            } catch (error) {
                //
            }
        }())
    }, [])

    return (
        <Header>
                <PostCard.Container>
                    <PostCard.Header>
                        <PostHeader.Container>
                        <PostHeader.Avatar 
                            imageSource={userData?.avatar} 
                            imageName={userData?.username} 
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