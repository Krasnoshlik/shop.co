import fullStarImg from '../../../assets/products/fullStar.png';
import halfStarImg from '../../../assets/products/halfStar.png';
import React from 'react'
import Image from 'next/image';

export default function RaitingStarts({starsNum}: {starsNum: number}) {
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;

    
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(<Image key={`full-${i}`} src={fullStarImg} alt="full star" width={20} height={20} />);
        }
        if (halfStar) {
          stars.push(<Image key="half" src={halfStarImg} alt="half star" width={11} height={20} />);
        }
        return stars;
      };
    
  return (
    <div className=' max-h-[18px] flex'>
        {renderStars(starsNum)}
    </div>
  )
}
