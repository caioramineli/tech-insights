import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

const StarRating = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                    <span key={currentRating}>
                        {currentRating <= rating ? (
                            <FaStar className='mr-1 text-lg sm:text-2xl' color="#ffa500" />
                        ) : currentRating - rating < 1 && currentRating > rating ? (
                            <FaRegStarHalfStroke className='mr-1 text-lg sm:text-2xl' color="#ffa500" />
                        ) : (
                            <FaRegStar className='mr-1 text-lg sm:text-2xl' color="#ffa500" />
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;


