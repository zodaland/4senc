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