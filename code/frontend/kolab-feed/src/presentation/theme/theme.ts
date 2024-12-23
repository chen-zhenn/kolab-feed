import { 
  createSystem, 
  defaultBaseConfig, 
  defineConfig, 
} from '@chakra-ui/react'

const themeConfig = defineConfig({
  // Global Styles...
  theme: {},
})

export const system = createSystem(defaultBaseConfig, themeConfig)
