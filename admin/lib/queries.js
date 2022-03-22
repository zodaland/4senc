import { gql } from 'apollo-boost';

export const GET_INTRO = gql`
query {
	intro
}
`;

export const GET_ABOUT = gql`
query {
	company {
		president
		comment
	}
	briefs {
		summary
		date
	}
	businesses {
		name
		image
	}
}
`

export const GET_4SINFO = gql`
query {
	title
	footer
	menu {
		path
		name
		comments
	}
}
`

export const GET_PORTFOLIOS = gql`
{
	portfolios {
		idx
		title
		content
		date
		files
	}
}
`;

export const SEND_MAIL = gql`
mutation($info: MailInput!) {
    mail(info: $info) {
        success,
        message
    }
}
`;

export const VERIFY_AUTH = gql`
query {
    verifyAuth {
        success,
        message
    }
}
`;

export const GET_AUTH = gql`
query($password: String!) {
	getAuth(password: $password) {
		success,
		message,
		token
	}
}
`

export const SET_INFO = gql`
mutation($title: String!, $footer: String!) {
    title(info: $title),
    footer(info: $footer)
}
`

export const SET_MENU = gql`
mutation($info: [MenuInput!]) {
    menu(info: $info)
}
`

export const SET_INTRO = gql`
mutation($info: [String!]) {
    intro(info: $info)
}
`;

export const SET_COMPANY = gql`
mutation($info: CompanyInput!) {
    company(info: $info)
}
`;