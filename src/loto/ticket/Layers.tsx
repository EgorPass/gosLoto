import { Footer, Header, GameField, Button, Cheap , ButtonRundomNumbers, ResultInfo} from "./componentsForLayers"
import FC, { IGameLayer, IResultLayer } from "../../types"

/**
 * компонент для построения игрового слоя с полем с цифрами для выбора
 * 
 * @param param0 
 * @returns 
 */
export const GameLayer: FC<IGameLayer> = ({
	status,
	playerFields, data,
	disableButton, ticketNumber = 1,
	handleClickAtCheap, handleClickRun, handleClickRundomNumbers
}) => {

	const arrayFromNumber = (num: number) => {
		return new Array(num ).fill(" ",)
	} 

	const visible = status !== "result" ? "visible" : "hidden";

	return (
		<div
			className={`ticket__gameLayer ticket__gameLayer_${visible}`}
		>
			<Header
				ticketNumber = { ticketNumber }
			>

				<ButtonRundomNumbers
					handleClick={ handleClickRundomNumbers }
				/>
			</Header>
			<div
				className = "ticket__gameField gameField"
			>
				{
					data.map((it, i) => (
						<GameField
							key = { i  }
							id = {  i + 1  }
							title = { it.rules }
						>
							{
								arrayFromNumber(it.cheaps).map((it, j) =>  (
									<Cheap
										key = { j + 1  }
										status = { playerFields[ i ].includes(j +1 ) }
										id = { j + 1  }
										fieldId = { i + 1 }
										handleClick={ handleClickAtCheap }						

									/>
								))
							}
						</GameField>
					))
				}
				{
					status === "run" && (
						<div
							className = "ticket__gameRun"
						>
							Немного подождём...
						</div>
					)
				}
			</div>
			<Footer>
				<Button
					title="Показать результат"
					handleClick={ handleClickRun }
					disabled = { disableButton }
				/>
			</Footer>
		</div>
	)
}

/**
 * Компонент для построения слоя с результатами игры или сообщением о том, что произошла ошибка.
 * @param param0 
 * @returns 
 */
export const ResultLayer: FC<IResultLayer> = ({
	state,
	error, status,
	ticketNumber = 1,
	handleClickOneMoreTime,
}) => {

	const visible = status === "result" ? "vissible" : "hidden";

	return(
		<div
			className={`ticket__resultLayer ticket__resultLayer_${visible}`}
		>
			<Header
				ticketNumber={ ticketNumber }
			/>
			<div
				className = "ticket__resultInfo"
			>
				{
					error.state && (
						<ResultInfo 
							head = "Увы :("
							paragraph= { error.message }
						/>
					)
				}
				{ !error.state && (state === "" ? "" : state === "win" ? (
						<ResultInfo 
							head = "Позравляем!!!"
							paragraph = "Вы выиграли ))))"
						/>
			
				) : (
						<ResultInfo 
							head =  "Увы :("
							paragraph = "Вы проиграли (((("
						/>
				))
			}
			</div>
			<Footer>
				{/* <Button
					title = "Сыграть ещё"
					handleClick={ handleClickOneMoreTime }
				/> */}
			</Footer>
		</div>
	)

}