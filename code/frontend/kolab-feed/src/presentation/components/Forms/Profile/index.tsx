import { 
    useEffect, 
    useState,
} from 'react'

import { 
    useNavigate,
} from 'react-router'

import { 
    useParams,
} from 'react-router'

import { ValueChangeDetails } from '@zag-js/editable'

import { 
    IUserData, 
} from '@/domain/models'

import {
    HttpStatusCode,  
} from '@/infra'

import {
    makeUser,
} from '@/main/usecases'

import { HttpStatusMessages } from '@/main/services'

import { Utils } from '@/presentation/shared'

import { 
    Modal,
    Toaster, 
} from '@/presentation/components'

import { Partial } from './Partials'
import { Heading, Text } from './styles'

export function FormProfile(){

    const user = makeUser()
    const { user_id } = useParams()
    const nav = useNavigate()
    const [profileData, setProfileData] = useState<IUserData>({})
    const [imagePreview, setImagePreview] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [updating, setUpdating] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const { launchToast } = Utils

    useEffect(() => {
        (async function(){
           try {
                setLoading(true)
                const userData = await fetchUserData()
                setProfileData({
                    ...profileData,
                    ...userData,
                })
           } catch (error) {
                const response = {
                    status: HttpStatusCode.servererror,
                    statusText: 'error',
                    message: HttpStatusMessages.servererror,
                }
                launchToast(response)
           } finally { setLoading(false) }
        }())
    }, [])

    async function fetchUserData() {
        
        if(!user_id) return
        const response = await user.getById(user_id)
        
        if(response && response.status === 200) {
           
            if(response.data && !!response.data.length){
                const { id, created_at, ...data } = response.data[0]
                return data
            }
        }
        if(response.status !== 200) {
            launchToast(response)
            return {}
        }
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

    async function handleUpdateProfile(): Promise<any> {
        if(!profileData) return
        const payload = { ...profileData }        
        try {
            setUpdating(true)
            const response = await user.update(payload)
            if(response) {
                if(response.status !== 200) return launchToast(response)
                launchToast(response)
                setOpen(true)
            }   
        } catch (error) {
            const response = {
                status: HttpStatusCode.servererror,
                statusText: 'error',
                message: HttpStatusMessages.servererror,
            }
            return launchToast(response)
        } finally {
            setImagePreview('')
            setUpdating(false)
            setLoading(false)
        }
    }

    return (
        <>
            <Partial.ProfileHeader 
                avatar={imagePreview ? imagePreview :profileData?.avatar}
                handleFileChange={handleFileChange}  
            />

            <Partial.ProfileContent
                loading={loading}
                updating={updating} 
                user={profileData}
                handlers={{
                    handleConfirmEditUserName,
                    handleConfirmEditEmail,
                    handleUpdateProfile,
                }}  
            />

            <Modal.Container 
                open={open}
                closeOnInteractOutside={true}
                handlers={{
                    onOpenChange: (details) => setOpen(details.open),
                    onExitComplete: () => {
                        localStorage.clear()
                        setTimeout(() => nav('/'), 1445)
                    }
                }}
            >
                <Modal.Header>
                    <Heading>
                        Atualização realizada com sucesso!
                    </Heading>
                </Modal.Header>
                <Modal.Content>
                    <Text>
                        Para concluir o processo, 
                        por favor confirme a alteração através do link enviado por email.
                    </Text>
                </Modal.Content>
                <Modal.Footer />
            </Modal.Container>
            <Toaster /> 
        </>
    )
}