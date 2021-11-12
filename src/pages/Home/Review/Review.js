import React, { useEffect, useState } from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import Rating from 'react-rating';

const Review = () => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    fetch('https://powerful-hamlet-84922.herokuapp.com/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])
  return (
    <div className='py-12'>
      <div className="small-container">
        <h1 className='font-bold uppercase text-2xl'>Customers <span className='text-primary_bg'>Review</span></h1>
        <p className='text-sm font-medium mt-2 mb-3'>There have some featured items Those would be your <br />  todays selection</p>
        <div className="grid md:grid-cols-2 gap-6">
          {
            reviews.map(review => <div className='review-box px-4 py-8' key={review._id}>
              <p className='text-md font-medium text-primary_text flex relative content-end review-text'>
                <span className='text-5xl relative text-blue quote'><RiDoubleQuotesL /></span>
                {review.speech}
                <span className='text-5xl absolute text-blue quote'><RiDoubleQuotesR /></span>
              </p>
              <div className='lg:flex items-center justify-between mt-5'>
                <div className='flex items-center'>
                  <img src={review.img} alt="" />
                  <div>
                    <h1 className='text-md font-semibold'>{review.name}</h1>
                    <p className='text-blue'>{review.email}</p>
                  </div>
                </div>
                <div className="rating mt-2 lg:mt-0">
                  <Rating
                    emptySymbol={<AiOutlineStar style={{ fontSize: "20px", color: "#c70039" }} />}
                    fullSymbol={<AiTwotoneStar style={{ fontSize: "20px", color: "#c70039" }} />}
                    initialRating={review.rating}
                    readonly
                  />
                </div>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Review;