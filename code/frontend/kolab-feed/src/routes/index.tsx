import { 
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router'

import { 
    makePost, 
} from '@/main/usecases'

import { View } from '@/presentation'
import { 
    Login, 
    Feed,
    Post,
    Profile, 
} from '@/presentation/pages'

import { 
    Form, 
} from '@/presentation/components'

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
        },{
            path: 'posts/:id',
        },{
            path: 'posts/user/:user_id',
        }]
    },{
        path: '/posts',
        element: <Post />,
        loader: async ({ params }) => {
            if (!Object.keys(params).length) return await post.getAll()
            return await post.filterByParams({ ...params })
        },
        children: [{
            path: 'edit/:id',
        },{
            path: 'delete/:id',
        },{
            path: 'user',
            children: [{
                path: 'edit/:id',
            },{
                path: 'delete/:id',
            },{
                path: ':user_id',
                children: [{
                    path: 'edit/:id',
                },{
                    path: 'delete/:id',
                }],
            }]
        }],
    }, {
        path: '/profile',
        element: <Profile />,
        children: [{
            path: ':user_id',
            loader: async ({ params }) => await post.filterByParams({ ...params }),
            element: <Form.Profile />
        }]
    }],
}])

export function Router() {
    return (
        <RouterProvider router={router} />
    )
}