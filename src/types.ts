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
export interface IError {
	message: string;
	state: boolean;
}
export interface IGameLayer {
	data: IFieldFromTicket[]
	status: IStatus
	ticketNumber: number;
	playerFields: number[] []
	disableButton: boolean;
	handleClickRun: React.FormEventHandler
	handleClickAtCheap: React.FormEventHandler
	handleClickRundomNumbers: React.FormEventHandler
}
export interface IResultLayer {
	error: IError;
	state: IState
	status: IStatus
	ticketNumber: number;
	playerFields: IPlayerFields;
	randomFields: IPlayerFields;
	handleClickOneMoreTime?: React.FormEventHandler
}
export interface IResultInfo {
	playerFields?: IPlayerFields;
	randomFields?: IPlayerFields;
	head: string;
	paragraph: string;
}
export interface IUseMethodsObj {
	error: IError
	state: IState
	status: IStatus
	disableButton: boolean
	randomFields: IPlayerFields
	playerFields: IPlayerFields
	handleClickRun: FormEventHandler
	handleClickAtCheap: FormEventHandler
	handleClickOneMoreTime: FormEventHandler
	handleClickRundomNumbers: FormEventHandler
}
export interface ITryToPostData {
	resData: IResData,
	er?: boolean
}
export interface IDelayPostData {
	delay: number,
	resData: IResData,
	times?: number,
}
export type IUseMethods = ( data: IFieldFromTicket[]  ) => IUseMethodsObj
export default FC