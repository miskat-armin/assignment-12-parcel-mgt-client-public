import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <img className=" h-[70%] lg:h-[50%] w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%]" src="/404Error.png" />
            <p className="text-2xl font-semibold">Opps!! No page found</p>
            <Link to={'/'}>
                <button className="bg-blue-500 text-white p-2 mt-4 rounded-md" >Go Back to Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;