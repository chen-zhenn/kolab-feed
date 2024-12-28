import { 
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router'

import {
    makeUser, 
    makePost, 
} from '@/main/usecases'

import { View } from '@/presentation'
import { 
    Login, 
    Feed,
    Post, 
} from '@/presentation/pages'

const user = makeUser()
const post = makePost()

const router = createBrowserRouter([{
    element: <View.Public />,
    children: [{
        path: '/',
        element: <Navigate to='/login' />
    },{
        path: '/login',
        element: <Login />
    }] 
}, {
    element: <View.Auth />,
    children: [{
        path: '/feed',
        element: <Feed />,
        loader: async () => await post.getAll(),
        children: [{
            path: 'add',
        }, {
            path: 'edit/:id',
        },{
            path: 'delete/:id', 
        },{
            path: 'posts',
            element: <Post />,
            children:[{
                path: ':user_id',
                loader: async ({ params }) => await console.log('Mostrar usuário por ID'),
            }]
        }]
    }],
}])

export function Router() {
    return (
        <RouterProvider router={router} />
    )
}