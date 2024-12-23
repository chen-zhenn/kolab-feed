import { 
  createSystem,
  defaultConfig, 
  defineConfig,
  mergeConfigs 
} from '@chakra-ui/react'

import { breakpoints } from './breakpoints'

const themeConfig = defineConfig({
  theme: {
    breakpoints,
  },
})

const config = mergeConfigs(defaultConfig, themeConfig)
export const system = createSystem(config)
