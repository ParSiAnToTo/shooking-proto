import React from 'react';

type Props = {
    onClick: () => void;
    disabled? : boolean;
};

const SubmitButton: React.FC<Props> = ({ onClick, disabled = false }) => {
    if(disabled) return null;
    return (
        <div className="w-full">
            <button
                onClick={onClick}
                // disabled={disabled}
                className="w-full h-12 bg-black text-white text-base rounded-full shadow disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                작성 완료
            </button>
        </div>
    );
};

export default SubmitButton;
