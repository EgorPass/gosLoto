import { useState } from "react"
import { IState, IStatus,  IPlayerFields, INumberArray, IResData, IUseMethods, IError } from "../../types"

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
			const resData: IResData = {
				selectedNumber: {
					firstField: [],
					secondField: []
				},
				isTicketWon: false,
			}
			const isCheck = new Array( playerFields.length).fill(0)
			let isWon = new Array( playerFields.length ).fill( true )

			playerFields.forEach( ( pF, i ) => {
				createRandomArr( i ).forEach(( it ) => {
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
		
			try {
			 await postResult( resData, 0)	
			}
			catch (e) {
				console.log( e )
				await whileFetch(2, resData, 2000)
			}
			finally {
				setStatus( "result" )	
				setState( !error.state ? resData.isTicketWon ? "win" : "loose" : '' )
			}
			console.log( "resData:", resData )
			// console.log( "isWon", isWon)
			// console.log("isCheck", isCheck)
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
	 * Возвращает результат запроса tryToPostт.
	 * функция создаёт искуственную задержку в промисе, для испльзования для повторных запросов с интервалом
	 * 
	 * @param resData объект c результатом выигрыша и отмеченными пользователем полями
	 * @param delay задержка для запроса
	 * @returns 
	 */
	async function postResult( resData: IResData, delay: number ) {
		return new Promise((res, rej) => {
			setTimeout(async () => {
				try {
					const response = await tryToPost(resData, "https://yelizovo.hh.ru/applicant/vacancy_response?vacancyId=96722688&hhtmFrom=vacancy")				
					// const response = await tryToPos	t(resData, "http://localhost:3000")				
				
					if (error.state) {
						setError( {message: "", state: false})
					}
					res(response)
				}
				catch (e) {
					setError( {message: "Произошла ошибка при запросе :(", state: true })
					rej(e)
				}
			}, delay )
		})
	}

	/**
	 * вспомогательная функция. содержит только запрос и возвращает промис
	 * 
	 * @param resData 
	 * @param url 
	 * @returns Promise<Response>
	 */
	async function tryToPost(resData: IResData, url: string) {
		return await await fetch(url, {
			method: "POST",
			body: new Blob( [ JSON.stringify( resData ) ] )
		})
	}


	/**
	 * функция запускает postResult, нужное количество раз (устанавливаем в параметре len),
	 * с задержкой между вызовами установленной в параметре delay
	 * 
	 * @param len - количесвто раз, которое нужно вызвать функцию postResult
	 * @param resData - объект который передаём в postResult
	 * @param delay - задержка для запросов
	 */
	async function whileFetch(len: number, resData: IResData, delay: number) {
		for (let i = 0; i < len; i++) {			
			try {	
				await postResult(resData, delay)
			}
			catch (e) {
				console.log( e )
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

	return {
		error,
		state, status,
		disableButton,
		playerFields,
		handleClickAtCheap, handleClickRun,
		handleClickRundomNumbers, handleClickOneMoreTime
	}
}