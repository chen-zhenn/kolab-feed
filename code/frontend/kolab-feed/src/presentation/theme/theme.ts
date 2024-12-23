import { 
  createSystem,
  defaultConfig, 
  defineConfig,
  mergeConfigs 
} from '@chakra-ui/react'

const themeConfig = defineConfig({
  theme: {},
})

const config = mergeConfigs(defaultConfig, themeConfig)
export const system = createSystem(config)
