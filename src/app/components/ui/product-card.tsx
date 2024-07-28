import React from 'react';
import Image from 'next/image';
import { ProductType } from '@/app/types/product.ds';
import fullStarImg from '../../assets/products/fullStar.png';
import halfStarImg from '../../assets/products/halfStar.png';

export default function ProductCard({ product }: { product: ProductType }) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Image key={`full-${i}`} src={fullStarImg} alt="full star" width={20} height={20} />);
    }
    if (halfStar) {
      stars.push(<Image key="half" src={halfStarImg} alt="half star" width={11} height={20} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<div key={`empty-${i}`} className="w-[20px] h-[20px]"></div>);
    }
    return stars;
  };

  return (
    <div className="min-w-[200px] flex flex-col gap-1 items-start text-left">
      <Image src={product.img} alt={product.title} />
      <div className=' relative'>
        <button className=' absolute -top-11 -right-[190px] bg-white border rounded-2xl text-lg px-2 shadow-md'>+</button>
      </div>
      <h4 className="font-bold text-sm truncate-text" title={product.title}>
        {product.title}
      </h4>
      <div className="w-[162px] flex items-center gap-1">
        {renderStars(product.raiting)}
        <span>{product.raiting}/5</span>
      </div>
      <p className="font-bold text-sm">${product.price}</p>
    </div>
  );
}

