import { Ticket } from "./ticket/ticket"
import { IFieldFromTicket } from "../types";

const data: IFieldFromTicket[] = [
					{
						max: 8,
						rules: "8 чисел",
						cheaps: 19,
						win: [4]
					},
					{
						max: 1,
						rules: "1 число",
						cheaps: 2,
						win: [3, 1]
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