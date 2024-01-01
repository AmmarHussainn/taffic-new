import { grey } from "@mui/material/colors"
import { useState } from "react"

const CustomCopytoClip = ({ ...props }) => {
    const [tooltip , setTooltil] = useState(false)


    const copydata = () => {
        setTooltil(true)
        navigator.clipboard.writeText(props.data)
        setTimeout(()=>{
            setTooltil(false)
        },1000)

    }


    return (
        <div style={{position : 'relative'}} className="cp" onClick={() => copydata()}>
           { tooltip && <div className="bg-color-neutral80 color-white wpx-80 d-flex justify-center items-start pt_5 Bold-Type-12 hpx-30 borderRadius-10" style={{background : '#655d5d' , clipPath:'polygon(0% 0%, 100% 0, 100% 75%, 64% 75%, 49% 100%, 33% 76%, 0% 75%)',position : 'absolute' , top : '-47px',left : '38px' , width : '80px' , height : '40px' , borderRadius : '8px', display : 'flex' , justifyContent : 'cenetr' , paddingTop  : '5px'}}> Copied</div>}
           Copy To Clipboard
        </div >
    )

}
export default CustomCopytoClip