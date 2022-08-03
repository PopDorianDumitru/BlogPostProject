import { useState , forwardRef, useImperativeHandle} from "react"
const Toggleable = forwardRef((props, refs)=>{
    const [visible, setVisible] = useState(false);
    const toggleVisibility = ()=>{setVisible(!visible)};
    const hideWhenVisible = {display: visible? 'none': ''};
    const showWhenVisible = {display: visible? '': 'none'};
    useImperativeHandle(refs, ()=>{
        return {
            toggleVisibility
        }
    })
    return(
        <div>
            <button style={hideWhenVisible} onClick={toggleVisibility} > {props.buttonLabel} </button>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}> cancel </button>
            </div>
        </div>
    )
})
export default Toggleable;