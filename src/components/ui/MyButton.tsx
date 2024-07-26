import { CSSProperties, FC } from 'react'

//


interface MyButtonProps {
  text: string
  onClick: () => void
  style?: CSSProperties

}


const MyButton: FC<MyButtonProps> = ({ onClick, text, style }) => {
  return (

    <button style={style} onClick={onClick}>{text}</button>
  )
}

export default MyButton
