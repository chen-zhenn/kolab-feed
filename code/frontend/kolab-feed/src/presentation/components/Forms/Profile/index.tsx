import { useState } from 'react'

import { 
    useLoaderData,
} from 'react-router'

import { 
    useParams,
    useRevalidator,
} from 'react-router'

import { ValueChangeDetails } from '@zag-js/editable'

import { 
    IPost, 
    IUserData, 
} from '@/domain/models'

import {
    HttpStatusCode, 
    IHttpResponse, 
} from '@/infra'

import {
    makeUser,
} from '@/main/usecases'

import { HttpStatusMessages } from '@/main/services'

import { Utils } from '@/presentation/shared'

import { Partial } from './Partials'

export function FormProfile(){

    const user = makeUser()
    const { user_id } = useParams()
    const response: IHttpResponse<IPost[]> = useLoaderData()
    const [profileData, setProfileData] = useState<IUserData>()
    const [imagePreview, setImagePreview] = useState<string>('')

    const { launchToast } = Utils
    let posts: IPost[] = []
    let userData: IUserData = {}

    try {
        if(response && response.status === 200)
            if(response.data && !!response.data.length) {
                posts = response?.data
                userData = { ...response?.data[0]['user'] }
                userData.email = response?.data[0].email
            }
            if(user_id && (!response || response.status !== 200)) {
                (async function (){
                    const response = await user.getById(user_id)
                    if(response && response.status === 200) {
                        if(response.data && !!response.data.length){
                            const { id, created_at, ...data } = response.data[0]
                            userData = { ...data }
                        }
                    }
                    if(response.status !== 200) launchToast(response)
                }()) 
            }
        launchToast(response)
            
    } catch (error) {
        const response = {
            status: HttpStatusCode.servererror,
            statusText: 'error',
            message: HttpStatusMessages.servererror,
        }
        launchToast(response)
    }  
    
    function handleFileChange(details: FileChangeDetails): void {
        const { acceptedFiles } = details
        if(!acceptedFiles.length) return
        const imageFile = acceptedFiles[0]
        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(imageFile)
        setProfileData({
            ...profileData,
            imageFile, 
        })

    }

    function handleConfirmEditUserName(details: ValueChangeDetails): void {
        
        if (
            !Object.keys(details).length ||  
            typeof details?.value !== 'string'
        ) return
        
        setProfileData({
            ...profileData,
            username: details?.value, 
        })
    }

    function handleConfirmEditEmail(details: ValueChangeDetails): void {
        
        if (
            !Object.keys(details).length ||  
            typeof details?.value !== 'string'
        ) return
        
        
        setProfileData({
            ...profileData,
            email: details?.value, 
        })
    }

    function handleUpdateProfile(): void {
        if(!profileData) return
        console.log('=> profileData: ', profileData)
    }

    return (
        <>
            <Partial.ProfileHeader 
                avatar={imagePreview ? imagePreview : userData?.avatar} 
                handleFileChange={handleFileChange}  
            />

            <Partial.ProfileContent 
                posts={posts} 
                user={userData}
                handlers={{
                    handleConfirmEditUserName,
                    handleConfirmEditEmail,
                    handleUpdateProfile,
                }}  
            />
        </>
    )
}