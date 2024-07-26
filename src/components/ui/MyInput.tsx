import { FC, CSSProperties } from 'react'

//

interface MyInputProps {
  type: string
  placeholder: string
  onChange: (e: any) => any
  value: string
  style?: CSSProperties
}

const MyInput: FC<MyInputProps> = ({ type, placeholder, onChange, value, style }) => {
  return (


    <input style={style} type={type} placeholder={placeholder} value={value} onChange={onChange}/>

  )
}

export default MyInput
