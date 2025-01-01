import {
    LuCamera,
} from 'react-icons/lu'

import { 
    Avatar,
    FileUploadRoot,
    FileUploadTrigger,
} from '@/presentation/components'

import { 
    AvatarContainer,  
    Header, 
    AvatarEditIcon,
 } from '../styles'
import { IFormProfileHeader } from '../types'

export default function ProfileFormHeader({ 
    avatar, 
    handleFileChange, 
}: IFormProfileHeader){
    return (
        <Header>
            <FileUploadRoot onFileChange={handleFileChange}>
                <FileUploadTrigger asChild>
                    <AvatarContainer>
                        <Avatar src={avatar ?? ''} size='full'  />
                        <AvatarEditIcon>
                            <LuCamera />
                        </AvatarEditIcon>
                    </AvatarContainer>
                </FileUploadTrigger>
            </FileUploadRoot>
        </Header>
    )
}