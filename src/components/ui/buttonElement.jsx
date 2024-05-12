import {cn} from "../../lib/utils.js";

const Button = ({kind, content, className, props}) => {
    return (
        <button className={cn("btn btn-" + kind,className)} {...props}>
            {content}
        </button>
    );
};

export default Button;
