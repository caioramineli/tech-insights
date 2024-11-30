import { Link } from 'react-router-dom';

const CardLink = ({ to, title, description, className }) => {
    return (
        <Link
            to={to}
            className={`bg-white shadow-md rounded-md p-6 sm:p-10 text-center transform hover:-translate-y-2 hover:shadow-xl transition duration-300 ${className}`}
        >
            <h2 className="text-2xl font-semibold text-cyan-600 mb-1">{title}</h2>
            <p className="text-zinc-800">{description}</p>
        </Link>
    );
};

export default CardLink;
