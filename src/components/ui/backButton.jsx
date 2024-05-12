import {cn} from "../../lib/utils.js";
import ChevronLeft from "../../../public/chevron-left.svg";
import { useNavigate  } from 'react-router-dom';

const BackButton = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
      };

    return (
        <button onClick={goBack} className='goBackButton'>
            <img src={ChevronLeft} alt="Go back" /><p>Go Back</p>
        </button>
    );
};

export default BackButton;
