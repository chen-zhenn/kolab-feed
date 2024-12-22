import { 
    UIStateProvider,
} from '@/states/context'

export const GlobalStatesWrapper = (Component: React.ComponentType) => {

    return function enhanced(props: any) {
  
      return (
        <UIStateProvider>
            <Component {...props} />
        </UIStateProvider>
      )
    }
}