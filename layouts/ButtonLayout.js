import { Fragment } from "react";

const arraySize = ["middle", "small", "big"]

const ButtonLayout = ({
  text,
  type = 'default',
  onClick,
  onChange,
  value,
  className = "",
  size = "middle",
  typeButton,
  isDisabled
}) => {
  const sizeClass = arraySize.find(e => e == size) ? arraySize.find(e => e == size) : ""
  return (
    <Fragment>
      <button
        className={"btn " + type + " " + className + " " + sizeClass}
        onClick={onClick}
        onChange={onChange}
        value={value}
        type={typeButton}
        disabled={isDisabled}>
        {text}
      </button>
      <style jsx>{`
                button {
                    border: none;
                    outline: none;
                    padding: 6px 12px;
                    border-radius: 3px;
                    margin: 3px
                }
                .middle {
                    padding: 6px 12px;
                }
                .small {
                    padding: 2px 4px;
                    font-size: 12px;
                }
                .big {
                    padding: 12px 24px;
                }
                .primary {
                    background-color: #2196F3;
                    color: white;
                }
                .success {
                    background-color: #4caf50;
                    color: white;
                }
                .danger {
                    background-color: #f44336;
                    color: white;
                }
                .default {
                    background-color: white;
                    color: black;
                    border: 1px solid gray
                }
                .outline-success {
                    border: 1px solid #4caf50;
                    background-color: transparent;
                    color: #4caf50;
                }
                .outline-danger {
                    border: 1px solid #f44336;
                    background-color: transparent;
                    color: #f44336;
                }

                .success,.primary,.danger,.default:hover {
                    cursor: pointer;
                }


                .btn.success:hover, .btn.primary:hover, .btn.danger:hover, .btn.default:hover {
                    transition: all 0.3s ease;
                    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
                    opacity: 0.9
                }
            `}</style>
    </Fragment>
  )
}

export default ButtonLayout;