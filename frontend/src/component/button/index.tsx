type ButtonProps = {
    name: string;
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ name, onClick }) => {
    return(
        <button className="hover:text-blue-400" onClick={onClick}>
            {name}
        </button>
    );
}

export default Button;