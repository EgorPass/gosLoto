import FC, { IButton, IHeader, IFooter, IGameField, ICheap, IRundomNumbers, IResultInfo } from "../../types"


/**
 * компонент заголовка билета "Билет №".
 * компонент использутся в GameLayer & ResultLayer
 * 
 * @param param0 
 * @returns 
 */
export const Header: FC<IHeader> = ({ticketNumber, children }) => {
	return (
		<header
			className = "ticket__header"
		>
			<h2
				className = "ticket__head"
			>
				Билет {ticketNumber}.
			</h2>
			{ children }
		</header>
	)
} 

/**
 * компонент подвальной части GameLayer & ResultLayer.
 * компонент формирует grid макет и содержит кнопку для запуска игры в GameLayer
 * 
 * @param param0 
 * @returns 
 */
export const Footer: FC<IFooter> = ({ children }) => {
	return (
		<footer
			className = "ticket__footer"
		>
			{ children }
		</footer>
	)
} 

/**
 * Компонент фишки с числом для выбора на игровом поле
 * @param param0 
 * @returns 
 */
export const Cheap: FC<ICheap> = ({ id, fieldId, status = false,
	handleClick 
}) => {
	const mod = status ? "choose" : "notChose"
	return (
		<div
			id = { `field_${fieldId}&cheap_${id}` }
			className = { `gameField__cheap gameField__cheap_${mod}` }
			onClick = { handleClick }
		>
			{ id }
		</div>
	)
}

/**
 * Копмонент для компоновки фищек кажддого игрового поля.
 * В качестве параметра принимает массив с Cheap компонентами.
 * @param children - массив компонентов Cheap
 * @returns 
 */
export const GameField: FC<IGameField> = ({
	children, id, title,
}) => {

	return (
		<div
			className = "gameField__container"
		>
			<div
				className = "gameField__head"
			>
				<span>
					Поле { id }  
				</span> &nbsp;
				<span>
					Отметьте { title }
				</span>
			</div>
			<div
				className = "gameField__cheapsField"
				id = { "field_" + id  }
			>
				{children}
			</div>
		</div>
	)
} 

/**
 * тут мы результат объявляем
 * @param - head- заголовок с информацией проиграли, выиграли или ошибка
 * @param - paragraph - соотвтетсвтенно текст к заголовку
 * @returns 
 */
export const ResultInfo: FC<IResultInfo> = ({ head, paragraph }) =>  (
	<>
		<h4>
			{ head }
		</h4>
		<p>
			{ paragraph}
		</p>
	</>
)

/**
 * компонент кнопики для запуска игры.
 * @param param0 
 * @returns 
 */
export const Button: FC<IButton> = ({
	title, handleClick = () => { }, disabled = false
}) => {

	return (
		<button
			className={`ticket__button ticket__button_${!disabled ? "active": "disabled"}`}
			onClick = { handleClick }
			disabled = { disabled }
		>
			{ title }
		</button>
	)
}

/**
 * Компонент кнопки для рандомного выбора чисел на поле
 * @param param0 
 * @returns 
 */
export const ButtonRundomNumbers: FC<IRundomNumbers> = ({ handleClick = (e) => {} }) => {

	return (
		<div
			className = "ticket__rundomNumbers"
			onClick = { handleClick }
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evennodd" d="M12.0716 1.5249C12.4266 1.5249 12.7144 1.81272 12.7144 2.16776V4.71423C12.7144 5.06927 12.4266 5.35709 12.0716 5.35709C11.7165 5.35709 11.4287 5.06927 11.4287 4.71423V2.16776C11.4287 1.81272 11.7165 1.5249 12.0716 1.5249ZM16.3831 4.52589C16.6342 4.27484 16.6342 3.86781 16.3831 3.61676C16.1321 3.3657 15.7251 3.3657 15.474 3.61676L14.1883 4.90247C13.9372 5.15352 13.9372 5.56056 14.1883 5.81161C14.4393 6.06266 14.8464 6.06266 15.0974 5.81161L16.3831 4.52589ZM9.71965 11.1893C9.9707 10.9383 9.9707 10.5313 9.71965 10.2802C9.4686 10.0292 9.06156 10.0292 8.81051 10.2802L1.24005 17.8507C0.988995 18.1017 0.988995 18.5088 1.24005 18.7598C1.4911 19.0109 1.89813 19.0109 2.14918 18.7598L9.71965 11.1893ZM12.7144 11.7857C12.7144 11.4306 12.4266 11.1428 12.0716 11.1428C11.7165 11.1428 11.4287 11.4306 11.4287 11.7857V13.6678C11.4287 14.0228 11.7165 14.3107 12.0716 14.3107C12.4266 14.3107 12.7144 14.0228 12.7144 13.6678V11.7857ZM14.6426 7.9285C14.6426 7.57346 14.9304 7.28564 15.2854 7.28564H17.8569C18.2119 7.28564 18.4997 7.57346 18.4997 7.9285C18.4997 8.28354 18.2119 8.57136 17.8569 8.57136H15.2854C14.9304 8.57136 14.6426 8.28354 14.6426 7.9285ZM6.28544 7.28564C5.9304 7.28564 5.64258 7.57346 5.64258 7.9285C5.64258 8.28354 5.9304 8.57136 6.28544 8.57136H8.85686C9.2119 8.57136 9.49972 8.28354 9.49972 7.9285C9.49972 7.57346 9.2119 7.28564 8.85686 7.28564H6.28544ZM14.1883 10.0453C14.4393 9.79429 14.8464 9.79429 15.0974 10.0453L16.3831 11.3311C16.6342 11.5821 16.6342 11.9891 16.3831 12.2402C16.1321 12.4912 15.7251 12.4912 15.474 12.2402L14.1883 10.9545C13.9372 10.7034 13.9372 10.2964 14.1883 10.0453ZM8.66872 3.61676C8.41766 3.3657 8.01063 3.3657 7.75958 3.61676C7.50853 3.86781 7.50853 4.27484 7.75958 4.52589L9.04529 5.81161C9.29634 6.06266 9.70338 6.06266 9.95443 5.81161C10.2055 5.56056 10.2055 5.15352 9.95443 4.90247L8.66872 3.61676Z" fill="black" />
			</svg>

		</div>
	)
}

