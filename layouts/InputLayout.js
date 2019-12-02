import { Fragment } from "react";
import ButtonLayout from './ButtonLayout';

const InputLayout = ({ placeholder, className, onClick, type }) => {
    return (
        <Fragment>
                <div className="gourp-input">
                <input placeholder="&nbsp;" className={className} type={type ? type : "text"} onClick={onClick} />
                <span className="highlight"/>
                <span className="bar"/>
                <label>{placeholder}</label>
                </div>
            <style jsx>{`
                .gourp-input {
                  margin: 0 12px
                }
                input{
                  background: none;
                  color: black;
                  font-size: 18px;
                  padding: 10px 10px 10px 5px;
                  display: block;
                  width: 100%;
                  border: none;
                  border-radius: 0;
                  border-bottom: 1px solid #c6c6c6;
                }
                input:focus {
                  outline: none;
                }
                input:focus ~ label,input:not(:placeholder-shown) ~ label {
                  top: -14px;
                  left: 12px;
                  font-size: 12px;
                  color: #2196F3;
                }
                input:focus ~ .bar:before {
                  width: 100%;
                }
                
                input[type="password"] {
                  letter-spacing: 0.3em;
                }
                
                label {
                  color: #c6c6c6;
                  font-size: 16px;
                  font-weight: normal;
                  position: absolute;
                  pointer-events: none;
                  left: 24px;
                  top: 10px;
                  transition: 300ms ease all;
                }
                
                .bar {
                  position: relative;
                  display: block;
                  width: 100%;
                }
                .bar:before {
                  content: '';
                  height: 2px;
                  width: 0;
                  bottom: 0px;
                  position: absolute;
                  background: #2196F3;
                  transition: 300ms ease all;
                  left: 0%;
                }
                
                .btn {
                  background: #fff;
                  color: #959595;
                  border: none;
                  padding: 10px 20px;
                  border-radius: 3px;
                  letter-spacing: 0.06em;
                  text-transform: uppercase;
                  text-decoration: none;
                  outline: none;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

            `}</style>
        </Fragment>
    )
}

export default InputLayout