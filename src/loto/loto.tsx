import { Ticket } from "./ticket/ticket"
import { IFieldFromTicket } from "../types";

// данные для указания правил игры и строения полей
const data: IFieldFromTicket[] = [
					{
						max: 8, // сколько нужно отметить полей
						rules: "8 чисел", //  для формирования заголовка с правилами
						cheaps: 19, // указание для построения количества полей для игры
						win: [4] // правило для совпадения для выигрыша
					},
					{
						max: 1, // сколько нужно отметить полей
						rules: "1 число", //  для формирования заголовка с правилами
						cheaps: 2, // указание для построения количества полей для игры
						win: [3, 1] // правило для совпадения для выигрыша
					}
				]


const Loto = () => {
	
	return (
		<div
			className="loto__field"
		>
			<Ticket
				ticketNumber = { 1 }
				data = { data }
			/> 
		</div>
		
	)
}

export default Loto