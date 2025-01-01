import { 
    EditableField,
    Action, 
} from '@/presentation/components'

import {  
    Container, 
    Content,
    Heading,
    ContentBody, 
    ContentHeader, 
    ContentSection,
    ContentSectionBody,
    ContentFooter, 
 } from '../styles'


import { IFormProfileContent } from '../types'

export default function ProfileFormContent({
    posts, 
    user,
    handlers, 
}: IFormProfileContent){

    return (
        <Content>

            <ContentHeader>
                <Heading>Dados de Perfil</Heading>
            </ContentHeader>

            <ContentBody>
                <Container>
                    <ContentSection>
                        <Heading>Pessoal</Heading>
                        <ContentSectionBody>
                            <Heading size='md'>Nome:</Heading>
                            <EditableField
                                fieldType='input' 
                                labelField={user?.username ?? ''}
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
                                    onConfirm: handlers.handleConfirmEditUserName  
                                }}
                            />
                        </ContentSectionBody>

                        <ContentSectionBody>
                            <Heading size='md'>Email:</Heading>
                            <EditableField
                                fieldType='input' 
                                labelField={user?.email ?? ''}
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
                                    onConfirm: handlers.handleConfirmEditEmail  
                                }} 
                            />
                        </ContentSectionBody>
                    </ContentSection>
                    <ContentSection>
                        <Heading>Publicação</Heading>
                        
                        <ContentSectionBody>
                            <Heading size='md'>
                                Posts: 
                            </Heading>
                            <span>{posts.length ?? 0}</span>
                        </ContentSectionBody>

                        <ContentSectionBody>
                            <Heading size='md'>
                                Comentários: 
                            </Heading>
                            <span>{posts.reduce((acc, post) => acc + (post.comments?.length ?? 0), 0)}</span>
                        </ContentSectionBody>
                    </ContentSection>
                </Container>
            </ContentBody>
            
            <ContentFooter>
                <Action.Btn 
                    label='Atualizar Perfil'
                    loadingLabel='Atualizando' 
                    state={{ 
                        disabled: false,
                        loading: false, 
                    }}
                    handlers={{
                        onclick: handlers.handleUpdateProfile
                    }} 
                />
            </ContentFooter>
        </Content>
    )
}