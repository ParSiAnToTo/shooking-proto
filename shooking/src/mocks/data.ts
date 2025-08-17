import shoe0001 from '../assets/shoe0001.png';
import shoe0002 from '../assets/shoe0002.png';
import shoe0003 from '../assets/shoe0003.png';
import noImage from '../assets/noImage.png';

export type Product = {
    id: number;
    brand: string;
    description: string;
    price: number;
    imageUrl: string;
};

export const products: Product[] = [
    {
        id: 1,
        brand: '브랜드A',
        description: '편안하고 착용감이 좋은 신발',
        price: 35000,
        imageUrl: shoe0001,
    },
    {
        id: 2,
        brand: '브랜드B',
        description: '힙한 컬러가 매력적인 신발',
        price: 25000,
        imageUrl: shoe0002,
    },
    {
        id: 3,
        brand: '브랜드C',
        description: '붉고 강렬한 신발',
        price: 55000,
        imageUrl: shoe0003,
    },
    {
        id: 4,
        brand: '브랜드D',
        description: '일상용 신발',
        price: 75000,
        imageUrl: noImage,
    },
    {
        id: 5,
        brand: '브랜드E',
        description: '러닝용 신발',
        price: 35000,
        imageUrl: noImage,
    },
    {
        id: 6,
        brand: '브랜드F',
        description: '전투용 신발',
        price: 15000,
        imageUrl: noImage,
    },
];