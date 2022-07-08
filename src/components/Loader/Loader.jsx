import { TailSpin } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loader = () => {
    return (
      <TailSpin
          height="100"
          width="100"
          color='green'
          ariaLabel='loading'
        />  
    )
}