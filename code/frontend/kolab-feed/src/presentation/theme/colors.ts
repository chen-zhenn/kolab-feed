enum Base {
    white = 'rgba(255, 255, 255, 1)',
    black = 'rgba(0, 0, 0, 1)',
}

enum Primary {
    x50 = 'rgba(255, 234, 181, 1)',
    x100 = 'rgba(255, 224, 153, 1)',
    x200 = 'rgba(255, 213, 125, 1)', 
    x300 = 'rgba(255, 201, 97, 1)', 
    x400 = 'rgba(255, 183, 28, 1)',
    x500 = 'rgba(255, 197, 32, 1)',
    x600 = 'rgba(230, 165, 29, 1)',
    x700 = 'rgba(204, 146, 26, 1)',
    x800 = 'rgba(179, 128, 22, 1)',
    x900 = 'rgba(163, 111, 0, 1)',
}

enum Secondary {
    x50 = 'rgba(207, 209, 212, 1)',
    x100 = 'rgba(178, 181, 187, 1)',
    x200 = 'rgba(150, 153, 162, 1)', 
    x300 = 'rgba(123, 126, 137, 1)', 
    x400 = 'rgba(82, 91, 103, 1)',
    x500 = 'rgba(26, 32, 44, 1)',
    x600 = 'rgba(23, 29, 40, 1)',
    x700 = 'rgba(20, 25, 34, 1)',
    x800 = 'rgba(17, 22, 30, 1)',
    x900 = 'rgba(0, 0, 6, 1)',
}

export const colors = {
    white: Base.white,
    black: Base.black,
    primary: Primary.x500,
    primary50: Primary.x50,
    primary100: Primary.x100,
    primary200: Primary.x200,
    primary300: Primary.x300,
    primary400: Primary.x400,
    primary500: Primary.x500,
    primary600: Primary.x600,
    primary700: Primary.x700,
    primary800: Primary.x800,
    primary900: Primary.x900,
    
    secondary: Secondary.x500,
    secondary50: Secondary.x50,
    secondary100: Secondary.x100,
    secondary200: Secondary.x200,
    secondary300: Secondary.x300,
    secondary400: Secondary.x400,
    secondary500: Secondary.x500,
    secondary600: Secondary.x600,
    secondary700: Secondary.x700,
    secondary800: Secondary.x800,
    secondary900: Secondary.x900,
}
