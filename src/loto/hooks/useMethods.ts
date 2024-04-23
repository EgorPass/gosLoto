import { useState } from "react"
import { IState, IStatus,  IPlayerFields, INumberArray, IResData, IUseMethods, IError, ITryToPostData, IDelayPostData } from "../../types"

/**
 * содержит все состояния и методы для управления слоями лотерейного билета
 * 
 * @param data 
 * @returns error, state, status,	disableButton, playerFields, handleClickAtCheap, handleClickRun,	handleClickRundomNumbers, handleClickOneMoreTime
 */
export const useMethods: IUseMethods = ( data ) => {

	/**
	 * состояние для ошибки
	 */
	const [error, setError] = useState<IError>({
		message: "",
		state: false,
	})
	/**
	 * состояние для бездейтвия кнопок
	 */
	const [ disableButton, setDisableButton ] = useState<boolean>(false)
	/**
	 * состояния для определения выиграл игорок или проиграл,
	 * от этого состояния зависит построение ResultLayer.
	 * принимает значение "" | "win" | "loose"
	 */
	const [state, setState] = useState<IState>("")
	/**
	 * состояние для опредления в каком статусе находиться игра.
	 * от этого состояние зависит какой из слоёв на экране GameLayer | ResultLayer 
	 */
	const [status, setStatus] = useState<IStatus>("game")
	/**
	 * состояние содержит выбранные поля ползователем.
	 * строится в зависимости от переданных правил в data
	 */
	const [playerFields, setPlayerFields] = useState<IPlayerFields>([
		...data.map( it => [])
	])

	const url = "http://localhost:3000"

	/**
	 * состояние для чисел, которые будут определяться рандомно во время игры
	 */
	const [randomFields, setRandomFields] = useState<IPlayerFields>([
		...data.map( it => [])
	])
	/**
	 * метод для выбора чисел на поле
	 * 
	 * @param e 
	 * @returns React.FormEventHandler
	 */
	const handleClickAtCheap = (e: React.FormEvent) => {
		const { target } = e;

		if ("id" in target) {
			const stringId: string = target.id as string
			const [ fieldId, cheapId ]: INumberArray = stringId.split("&").map(it => +it.slice(6) as number) 

				setPlayerFields(prev => ([
					...prev.map((it, i) => {
						if (i === fieldId - 1 ) {
							if (it.includes(cheapId)) {
								return it.filter( it => it !== cheapId )
							}
							else {
								if( it.length < data[i].max)	return [...it, cheapId]
							}
						}
						return it
					})
				]))
			}
		
		return false
	}
	/**
	 *  метод для запуска игры и запроса
	 * 
	 * @param e 
	 */
	const handleClickRun = async (e: React.FormEvent) => {
		e.preventDefault();
		let state = true
		playerFields.forEach( ( it,i ) => {
			if (it.length !== data[i].max) {
				state = false
			}
		})

		if (state) {
			setDisableButton( true )
			setStatus("run")
			
			const { resData, isCheck, isWon } = fillRandomFields();
			
			try {
				await tryToPost({ resData, })
				// await tryToPost({ resData, er: false } )	
			}
			catch (e) {
				await whileRepeatPost({ times: 2, delay: 2000, resData } )			
			}
			finally {
				console.log( "finally")
				setStatus( "result" )	
				setState( !error.state ? resData.isTicketWon ? "win" : "loose" : "")
			}
			console.log( "isWon", isWon)
			console.log("isCheck", isCheck)
		}
	}
	/**
	 * метод для элемента, при нажатии на который,
	 * выбираются рандомные числа на поле
	 */
	const handleClickRundomNumbers = () => {
		playerFields.forEach( (it, i) => {
			const arr = createRandomArr( i )

			setPlayerFields(prev => (
				prev.map((it, k) => {
					if (i === k) {
						return arr
					}
					else return it
				})
			))

		})
	}
	/**
	 * вспомогательная функция для создания массива с рандомными числами
	 * @param pos 
	 * @returns 
	 */
	function createRandomArr( pos: number ) {
		const arr: INumberArray = []
		const min = 1;
		const max = data[ pos ].cheaps;
		
		while( data[ pos ].max > arr.length ) {
			const random = Math.round( min + Math.random() * ( max - min ) )
				const state = arr.includes( random )
				if( !state ) {
					arr.push( random )
				}
		}
		
		return arr 
	}
	/**
	 * функция запроса для отправки объекта с результатами
	 * 
	 * @param resData - отправляемый объект для запроса
	 * @param er - вспомогательный параметр, эмуляция успешного запроса, если передать true просто создаётся объект со свойстовом status, равным 200.
	 * @returns 
	 */
	async function tryToPost({ resData, er = true } : ITryToPostData   ) {
		let response
		try {
			if (er) {
			response = await fetch(url, {
				method: "POST",
				body: new Blob( [ JSON.stringify( resData ) ] )
			})
		}
		if (!er ) 
		response = { status: 200, statusText: "Ok" } as Response
	
		if ( response && response.status !== 200) throw new Error ("response.status: " + response.status)
		else {	
				console.log("resData:", resData)
				setError( {message: "", state: false } )
			// res(response as Response )
				return response as Response
			}
		}
		catch (e) {
			setError({ message: "Произошла ошибка при запросе :(", state: true })
			console.log( e )
			throw e
			// rej( e )
		} 	
	}
	/**
	 * обвёртка задержки для запросадля 
	 * @param delay - время для задержки
	 * @param resData - отправляемый объект для запроса
	 * @returns 
	 */
	async function delayPost( { delay = 0, resData } :IDelayPostData ) : Promise<void> {
		return new Promise<void>(async (res, rej) => {
			console.log( "delay post ")
			setTimeout( async() => {
				try {
					await tryToPost({
						resData,
						er: false
					}) 
					res()
				}
				catch (e) {	
					rej(e) 
				}
			}, delay )
		})
	}
	/**
	 * функция создания генераторая создания запросов с задержкой
	 * 
	 * @param times - количиество попыток для повторных запросов
	 */
	function* genDelay( times: number ) {
		let i = 0
		while (i < times) {
			++i
			yield delayPost
		}
	}
	/**
	 * функция которая генерирует поток запросов с установленной паузой между ними
	 * 
	 * @param times - количество попыток для повторных запросов, передаётся в genDelay внутри
	 * @param delay - время в млс для паузы между запросами
	 * @param resData - отправляемый объект для запроса
	 */
	async function whileRepeatPost( props: IDelayPostData ) {
		let times = 0;
		if( "times" in props ) times = props.times as number
		const gen = genDelay(times)
	
		for await (let promise of gen) {
			try {	
				await promise( { ...props } );
				break;
			}
			catch (e) {
				console.log( "error from gen:",  e )
			}
		}
	}
	/**
	 * вспомогательная функция для повторного запуска билета, чтобы не обновлять страницу.
	 * Использовалась при создании представления и поведения.
	 * 
	 * @param e 
	 */
	const handleClickOneMoreTime = (e: React.FormEvent) => {
		e.preventDefault();
		setPlayerFields( [...data.map( it => [] ) ] )
		setStatus("game")
		setDisableButton(false)
		setError( { message:"", state: false})
	}
	/**
	 * Вспомогательная функция для генерации случайных чисел.
	 * используется в обработчике handleClickRun
	 * 
	 * @returns object
	 */
	function fillRandomFields(): { isCheck: number[], isWon: boolean[], resData: IResData} {
		const resData: IResData = {
			selectedNumber: {
				firstField: [],
				secondField: []
			},
			isTicketWon: false,
		}
		const isCheck = new Array( playerFields.length).fill(0)
		let isWon = new Array( playerFields.length ).fill( true )	
		
		playerFields.forEach((pF, i) => {
			const arr = createRandomArr( i )
			setRandomFields(prev => ([
				...prev.map( (it, j) => {
					if (j === i) {
						return [...arr]

					}
					else return it
			} ) ] ) )
			arr.forEach((it) => {
				if( pF.includes( it ) ) isCheck[i] = ++isCheck[i]
			})
			
			data[i].win.forEach((it, j) => {
				if (isCheck[j] < it) 	isWon[i] = false					
			});

			if (i === 0) 	
				resData.selectedNumber.firstField = pF
		
			else if (i === 1) 
				resData.selectedNumber.secondField = pF
		})

		resData.isTicketWon = isWon.includes( true )
		
		return {
			resData, isCheck, isWon 
		}

	}

	return {
		error,
		state, status,
		disableButton,
		playerFields, randomFields,
		handleClickAtCheap, handleClickRun,
		handleClickRundomNumbers, handleClickOneMoreTime
	}
}