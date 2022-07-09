import { ButtonStyled} from './Button.styled'

export const Button = ({onClick, children}) => {
    return (
        <ButtonStyled onClick={onClick} type="button">
            {children}
        </ButtonStyled>
    )
}