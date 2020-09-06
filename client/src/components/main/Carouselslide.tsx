import React from 'react';
import {Grid,IconButton,Slide}from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CarouselItem from './Carouselitem';

type Direction = "left" | "right" | "down" | "up";

interface poscocktailinfo{
    strdrink:string;
    strdrinkthumb:string;
    stringredient:string[];
    strmeasure:string[];
    strinstructions:string;
    flag?:boolean[];
} 
interface content{
    backgroundColor:string;
    title:string;
}
interface CarouselProps{
    content?:content;
    cocktailInfo:poscocktailinfo[];
    defaultInfo?: any;
}
interface ArrowProps{
    direction:string;
    clickFunction:() => void;
    maxcocktail:number;
    index:number;
    scrollitems:number;
}

function Arrow(props:ArrowProps) {
    const { direction, clickFunction,index,maxcocktail,scrollitems } = props;
    const icon = direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />;
    const disabled = direction === 'left' ? index==0 : index+scrollitems>maxcocktail;
    return <IconButton 
                color="primary" 
                aria-label="upload picture" 
                component="span" 
                onClick={clickFunction}
                disabled={disabled}>{icon}</IconButton>;
}

export default function CarouselSlide(props:CarouselProps) {
    const { cocktailInfo, defaultInfo } = props;

    const [slideIn, setSlideIn] = React.useState<boolean>(true);
    const [slideDirection, setSlideDirection] = React.useState<string>('down');
    const [index, setIndex] = React.useState<number>(0);
    const numSlides = cocktailInfo.length;
    const showitems:number=4;
    const scrollitems:number=4;

    const onArrowClick = (direction:string) => {
        const increment = direction === 'left' ? -scrollitems : scrollitems;
        const newIndex = (index + increment + numSlides) % numSlides;
        
        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);
  
        setTimeout(() => {
          setIndex(newIndex);
          setSlideDirection(oppDirection);
          setSlideIn(true);
        }, 500);
    };

    return (
        <Grid container item xs={12} spacing={0} direction="row" justify="space-between" alignItems="center">
            <Grid item xs='auto'>
                <Arrow
                    direction='left'
                    clickFunction={() => onArrowClick('left')}
                    maxcocktail={cocktailInfo.length}
                    index={index}
                    scrollitems={scrollitems}
                />
            </Grid>
            <Grid item xs={11}> 
                <Slide in={slideIn} direction={slideDirection as Direction}>
                    <div>
                        <CarouselItem cocktailInfo={cocktailInfo.slice(index,index+showitems)}/>
                    </div>
                </Slide>
            </Grid>
            <Grid item xs='auto'>
                <Arrow
                    direction='right'
                    clickFunction={() => onArrowClick('right')}
                    maxcocktail={cocktailInfo.length}
                    index={index}
                    scrollitems={scrollitems}
                />
            </Grid>
        </Grid>    
        
    );
}