import 'react-toastify/dist/ReactToastify.css'

function Alert({messages,type}) {


    return (
        <div className={`alert alert-${type} p-2 my-3 mx-1 text-left`} role="alert">
            <ul className={"m-0"}>
                {Array.isArray(messages) ? messages.map((err, index) => (
                    <li key={index}>{err}</li>
                )): messages}
            </ul>
        </div>
    );
}

export default Alert;