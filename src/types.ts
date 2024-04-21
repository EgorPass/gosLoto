
import { FC, ReactNode, FormEventHandler } from 'react'

export type INumberArray = number[]
export type IPlayerFields = Array<INumberArray> 
export type IStatus = "game" | "run" | "result"
export type IState = "" | "win" | "loose" 

export interface IHeader {
	ticketNumber?: number;
	children?: ReactNode;
}

export interface IFooter {
	children?: ReactNode
}

export interface IGameField {
	children?: ReactNode;
	id: number;
	title: string;
}

export interface IButton {
	title: string;
	handleClick: React.FormEventHandler;
	disabled?: boolean;
}

export interface ICheap {
	status: boolean;
	id: number;
	fieldId?: number;
	handleClick: React.MouseEventHandler;
}

export interface IRundomNumbers {
	handleClick: React.FormEventHandler
}

export interface IFieldFromTicket {
	max: number;
	rules: string;
	cheaps: number;
	win: number[]
}	

export interface ITicket {
	ticketNumber: number;
	data: IFieldFromTicket[];
}	

export interface IResData  {
	selectedNumber: {
		firstField: number[],
		secondField: number[]
	},	
	isTicketWon: boolean,
}	
			
export interface IGameLayer {
	ticketNumber: number;
	status: "game" | "run" | "result"
	data: IFieldFromTicket[]
	playerFields: number[] []
	disableButton: boolean;
	handleClickAtCheap: React.FormEventHandler
	handleClickRun: React.FormEventHandler
	handleClickRundomNumbers: React.FormEventHandler
}

export interface IError {
	message: string;
	state: boolean;
}

export interface IResultLayer {
	error: IError;
	ticketNumber: number;
	handleClickOneMoreTime: React.FormEventHandler
	status: "game" | "run" | "result"
	state: IState
}

export interface IResultInfo {
	head: string;
	paragraph: string;
}

export interface IGameLayer {
	ticketNumber: number;
	status: "game" | "run" | "result"
	data: IFieldFromTicket[]
	playerFields: number[] []
	disableButton: boolean;
	handleClickAtCheap: React.FormEventHandler
	handleClickRun: React.FormEventHandler
	handleClickRundomNumbers: React.FormEventHandler
}

export interface IUseMethodsObj {
	error: IError
	state: IState
	status: IStatus
	disableButton: boolean
	playerFields: IPlayerFields
	handleClickRun: FormEventHandler
	handleClickAtCheap: FormEventHandler
	handleClickOneMoreTime: FormEventHandler
	handleClickRundomNumbers: FormEventHandler
}

export type IUseMethods = ( data: IFieldFromTicket[]  ) => IUseMethodsObj

export default FC