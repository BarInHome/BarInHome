import baseStyeld,{
    css,
    CSSProp,
    ThemedStyledInterface,
} from 'styled-components';

const sizes:{[key:string]:number}={
    desktop:768,
};

type BackQuoteArgs = string[];

interface Media {
    desktop:(...args:BackQuoteArgs)=>CSSProp | undefined;
}

const media:Media={
    desktop:(...args:BackQuoteArgs)=>undefined,
}

Object.keys(sizes).reduce((acc:Media,label:string)=>{
    switch(label){
        case 'desktop':
            acc.desktop=(...args:BackQuoteArgs)=>
                css`
                    @media only screen and (min-width: ${sizes.desktop}px){
                        ${args}
                    }
                    `;
            break;
        default:
            break;
    }
    return acc;
},media);

const colors={
    white:'#ffffff',
    black:'#000000'
};

const secondaryColors = {};
const fontSizes: string[] = [];

const theme = {
    colors,
    fontSizes,
    secondaryColors,
    media,
};

export const shadow = (weight:number) => {
    const shadows = [
        css`box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`,
        css`box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`,
        css`box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`
    ];

    return shadows[weight];
};

export type Theme = typeof theme;
export const syteld = baseStyeld as ThemedStyledInterface<Theme>;
export default theme;