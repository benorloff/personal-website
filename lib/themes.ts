export type Theme = 
    | 'dark-red' 
    | 'dark-green' 
    | 'dark-blue' 
    | 'light-red' 
    | 'light-green' 
    | 'light-blue';

export type ThemeMode = 'dark' | 'light';
export type ThemeColor = 'red' | 'green' | 'blue';

export interface ThemeColorProps {
    name: ThemeColor;
    bg: string;
    colors: {
        lightest: string;
        lighter: string;
        light: string;
        default: string;
        dark: string;
        darker: string;
        darkest: string;
    };
}

export const themeColors: ThemeColorProps[] = [
    {
        name: 'green',
        bg: 'radial-gradient(hsla(110, 90%, 50%, 0.25), hsla(0, 0%, 0%, 0))',
        colors: {
            lightest: '#EBFEE7',
            lighter: '#ADFA9E',
            light: '#70F655',
            default: '#33F20D',
            dark: '#24AA09',
            darker: '#146105',
            darkest: '#051801',
        },
    },
    {
        name: 'blue',
        bg: 'radial-gradient(hsla(240, 100%, 50%, 0.25), hsla(0, 0%, 0%, 0))',
        colors: {
            lightest: '#E5E5FF',
            lighter: '#9999FF',
            light: '#4D4DFF',
            default: '#0000FF',
            dark: '#0000B3',
            darker: '#000066',
            darkest: '#00001A',
        },
    },
    {
        name: 'red',
        bg: 'radial-gradient(hsla(351, 90%, 50%, 0.25), hsla(0, 0%, 0%, 0))',
        colors: {
            lightest: '#FEE7EA',
            lighter: '#FA9EAC',
            light: '#F6556E',
            default: '#F20D2F',
            dark: '#AA0921',
            darker: '#610513',
            darkest: '#180105',
        },
    },
];

export const themeModeAndColor = (
    theme: Theme
): {
    mode: ThemeMode, 
    color: ThemeColor,
} => {
    const [mode, color] = theme.split('-') as [ThemeMode, ThemeColor];
    return { mode, color };
};

export const availableThemeColors = (
    theme: Theme
): ThemeColorProps[] => {
    const { color } = themeModeAndColor(theme);
    const availableColors = themeColors.filter((t) => t.name !== color);
    return availableColors;
};
