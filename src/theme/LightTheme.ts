export type ThemeTypes = {
    name: string;
    dark: boolean;
    variables?: object;
    
    colors: {
        info?: string;
        error?: string;
        accent?: string;
        primary?: string;
        success?: string;
        warning?: string;
        surface?: string;
        grey100?: string;
        grey200?: string;
        secondary?: string;
        lightinfo?: string;
        lighterror?: string;
        hoverColor?: string;
        background?: string;
        textPrimary?: string;
        borderColor?: string;
        inputBorder?: string;
        containerBg?: string;
        lightprimary?: string;
        lightsuccess?: string;
        lightwarning?: string;
        textSecondary?: string;
        lightsecondary?: string;
        'on-surface-variant'?: string;
    };
};

const BLUE_THEME: ThemeTypes = {
    name: 'BLUE_THEME',
    dark: false,
    variables: {
        'border-color': '#e5eaef'
    },
    colors: {
        info: '#539BFF',
        surface: '#fff',
        error: '#FA896B',
        accent: '#FFAB91',
        grey200: '#EAEFF4',
        primary: '#1e4db7',
        success: '#05b187',
        warning: '#FFAE1F',
        grey100: '#F2F6FA',
        secondary: '#1a97f5',
        lighterror: '#FDEDE8',
        background: '#f6f6f6',
        hoverColor: '#f6f9fc',
        textPrimary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        lightprimary: '#f5fcfd',
        lightsuccess: '#E6FFFA',
        lightwarning: '#FEF5E5',
        textSecondary: '#2A3547',
        lightsecondary: '#E8F7FF',
        'on-surface-variant': '#fff',
    }
};

const RED_THEME: ThemeTypes = {
    name: 'RED_THEME',
    dark: false,
    variables: {
        'border-color': '#e5eaef'
    },
    colors: {
        info: '#539BFF',
        surface: '#fff',
        error: '#FA896B',
        accent: '#FFAB91',
        grey200: '#EAEFF4',
        primary: '#5e244d',
        success: '#05b187',
        warning: '#FFAE1F',
        grey100: '#F2F6FA',
        secondary: '#ff5c8e',
        lighterror: '#FDEDE8',
        background: '#f6f6f6',
        hoverColor: '#f6f9fc',
        textPrimary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        lightprimary: '#fce6ed',
        lightsuccess: '#E6FFFA',
        lightwarning: '#FEF5E5',
        textSecondary: '#2A3547',
        lightsecondary: '#EDFBF7',
        'on-surface-variant': '#fff',
    }
};

const PURPLE_THEME: ThemeTypes = {
    name: 'PURPLE_THEME',
    dark: false,
    variables: {
        'border-color': '#e5eaef'
    },
    colors: {
        info: '#539BFF',
        surface: '#fff',
        error: '#FA896B',
        accent: '#FFAB91',
        grey200: '#EAEFF4',
        primary: '#402e8d',
        success: '#05b187',
        warning: '#FFAE1F',
        grey100: '#F2F6FA',
        secondary: '#7352ff',
        lighterror: '#FDEDE8',
        background: '#f6f6f6',
        hoverColor: '#f6f9fc',
        textPrimary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        lightprimary: '#F2ECF9',
        lightsuccess: '#E6FFFA',
        lightwarning: '#FEF5E5',
        textSecondary: '#2A3547',
        lightsecondary: '#EDF8FA',
        'on-surface-variant': '#fff',
    }
};

const GREEN_THEME: ThemeTypes = {
    name: 'GREEN_THEME',
    dark: false,
    variables: {
        'border-color': '#e5eaef'
    },
    colors: {
        info: '#539BFF',
        surface: '#fff',
        error: '#FA896B',
        accent: '#FFAB91',
        grey200: '#EAEFF4',
        primary: '#066a73',
        success: '#05b187',
        warning: '#FFAE1F',
        grey100: '#F2F6FA',
        secondary: '#00cec3',
        lighterror: '#FDEDE8',
        background: '#f6f6f6',
        hoverColor: '#f6f9fc',
        textPrimary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        lightprimary: '#F4F9FB',
        lightsuccess: '#E6FFFA',
        lightwarning: '#FEF5E5',
        textSecondary: '#2A3547',
        lightsecondary: '#FAFBEF',
        'on-surface-variant': '#fff',
    }
};

const INDIGO_THEME: ThemeTypes = {
    name: 'INDIGO_THEME',
    dark: false,
    variables: {
        'border-color': '#e5eaef'
    },
    colors: {
        primary: '#11397b',
        secondary: '#1e4db7',
        info: '#539BFF',
        success: '#05b187',
        accent: '#FFAB91',
        warning: '#FFAE1F',
        error: '#FA896B',
        lightprimary: '#EBF9FA',
        lightsecondary: '#FFF5F2',
        lightsuccess: '#E6FFFA',
        lighterror: '#FDEDE8',
        lightwarning: '#FEF5E5',
        textPrimary: '#2A3547',
        textSecondary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        background: '#f6f6f6',
        hoverColor: '#f6f9fc',
        surface: '#fff',
        'on-surface-variant': '#fff',
        grey100: '#F2F6FA',
        grey200: '#EAEFF4'
    }
};

const ORANGE_THEME: ThemeTypes = {
    name: 'ORANGE_THEME',
    dark: false,
    variables: {
        'border-color': '#e5eaef'
    },
    colors: {
        info: '#539BFF',
        surface: '#fff',
        error: '#fb9678',
        accent: '#FFAB91',
        grey200: '#EAEFF4',
        primary: '#fb9678',
        success: '#05b187',
        warning: '#fec90f',
        grey100: '#F2F6FA',
        secondary: '#03c9d7',
        lighterror: '#FDEDE8',
        background: '#f6f6f6',
        hoverColor: '#f6f9fc',
        textPrimary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        lightprimary: '#e5fafb',
        lightsuccess: '#E6FFFA',
        lightwarning: '#FEF5E5',
        textSecondary: '#2A3547',
        lightsecondary: '#EFF9FF',
        'on-surface-variant': '#fff',
    }
};

export { BLUE_THEME, RED_THEME, ORANGE_THEME, PURPLE_THEME, GREEN_THEME, INDIGO_THEME };
