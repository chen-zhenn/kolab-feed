import { 
  createSystem,
  defaultConfig, 
  defineConfig,
  mergeConfigs 
} from '@chakra-ui/react'

import { breakpoints } from './breakpoints'
import { colors as brandColors } from './colors'

const themeConfig = defineConfig({
  theme: {
    breakpoints,
    tokens: {
      colors: {
        primary: {
          50: { value: brandColors.primary50 },
          100: { value: brandColors.primary100 },
          200: { value: brandColors.primary200 },
          300: { value: brandColors.primary300 },
          400: { value: brandColors.primary400 },
          500: { value: brandColors.primary500 },
          600: { value: brandColors.primary600 },
          700: { value: brandColors.primary700 },
          800: { value: brandColors.primary800 },
          900: { value: brandColors.primary900 },
        },
        secondary: {
          50: { value: brandColors.secondary50 },
          100: { value: brandColors.secondary100 },
          200: { value: brandColors.secondary200 },
          300: { value: brandColors.secondary300 },
          400: { value: brandColors.secondary400 },
          500: { value: brandColors.secondary500 },
          600: { value: brandColors.secondary600 },
          700: { value: brandColors.secondary700 },
          800: { value: brandColors.secondary800 },
          900: { value: brandColors.secondary900 },
        },
      },
    },
  },
})

const config = mergeConfigs(defaultConfig, themeConfig)
export const system = createSystem(config)
