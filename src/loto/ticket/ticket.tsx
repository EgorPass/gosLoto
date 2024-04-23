import { useMethods } from "../hooks/useMethods";
import { GameLayer, ResultLayer } from "./Layers"
import FC, { ITicket } from "../../types";

import "../../styles/ticket.scss"

/**
 * компонент билета, с импортированной и развёрнутой логикой управления лотерейным билетом.
 * Использует для построения GameLayer & ResultLayer
 * 
 * @param data - параметры и правила для построения билета
 * @param ticketNumber - номер билета, если билет будет не один на экране
 * 
 * @returns ReactNode
 */
export const Ticket: FC<ITicket> = ( {	data, ticketNumber,	} ) => {	
	const {
		error, state, status, disableButton, playerFields, randomFields,
		handleClickAtCheap, handleClickRun, handleClickRundomNumbers, handleClickOneMoreTime
	} = useMethods( data )

	return (
		<div
			className = "ticket__container"
		>
			<GameLayer 
				data = { data }					
				status = { status }
				ticketNumber = { ticketNumber }
				playerFields = { playerFields }	
				disableButton	= { disableButton }
				handleClickRun = { handleClickRun }
				handleClickAtCheap = { handleClickAtCheap }
				handleClickRundomNumbers = { handleClickRundomNumbers }
			/>
			<ResultLayer
				error = { error }
				state = { state }
				status = { status }
				playerFields ={ playerFields }
				randomFields = { randomFields }
				ticketNumber = { ticketNumber }
				handleClickOneMoreTime = { handleClickOneMoreTime }
			/>
		</div>
	)
}

