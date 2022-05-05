# 4senc
4senc는 회사 소개 웹 애플리케이션 입니다.

* 회사 소개 : 대표 소개, 업종 소개, 회사 연혁
* 포트폴리오 : 사내 진행한 프로젝트에 대한 간단한 소개. 목록 별 조회, 상세 조회
* 방문 : 간단한 정보 작성 후 문의 내용과 함께 회사에 메일 발송

# SKILLS

BackEnd: `TypeScript`, `Express.js`, `GraphQL`, `MySQL`, `winston`

FrontEnd: `JavaScript`, `Next.js`, `Apollo`

# URL
### development

API: https://apitest.4senc.com

WEB: https://test2.4senc.com

ADMIN: https://test3.4senc.com

# API SPECIFICATION
### GraphQL Schema

```
type Query {
  getAuth(password: String!): AuthResult!
  verifyAuth: Result!
  briefs: [Brief!]
  businesses: [Business!]
  company: Company
  footer: String
  intro: [String!]
  menu: [Menu!]
  portfolio(idx: Int!): Portfolio
  portfolios: [Portfolio]
  title: String
}

type Mutation {
  password(info: passwordInput!): Result!
  brief(info: BriefInput!): IdxResult!
  updateBrief(info: BriefInput!): Result!
  deleteBrief(idx: Int!): Result!
  business(info: BusinessInput!): IdxResult!
  updateBusiness(info: BusinessInput!): Result!
  deleteBusiness(idx: Int!): Result!
  company(info: CompanyInput!): Boolean!
  footer(info: String!): Boolean!
  intro(info: [String!]): Boolean!
  mail(info: MailInput!): Result!
  menu(info: [MenuInput!]): Boolean!
  portfolio(info: PortfolioWithFileInput!): IdxResult!
  updatePortfolio(info: PortfolioInput!): Result!
  deletePortfolio(idx: Int!): Result!
  title(info: String!): Boolean!
}

type AuthResult implements ResultItem {
  success: Boolean!
  message: String
  token: String
}

input passwordInput {
  currentPassword: String!
  password: String!
}

type Brief {
  idx: Int!
  summary: String!
  date: String!
}

input BriefInput {
  idx: Int!
  summary: String!
  date: String!
}

type Business {
  idx: Int!
  name: String!
  image: String!
}

input BusinessInput {
  idx: Int!
  name: String!
  image: String!
}

interface ResultItem {
  success: Boolean!
  message: String
}

type Result implements ResultItem {
  success: Boolean!
  message: String
}

type IdxResult implements ResultItem {
  success: Boolean!
  message: String
  idx: Int
}

type Company {
  president: String!
  comment: [String!]
}

input CompanyInput {
  president: String!
  comment: [String!]
}

scalar Upload

input MailInput {
  name: String
  email: String
  subject: String
  content: String
}

type Menu {
  path: String!
  name: String!
  comments: [String!]
}

input MenuInput {
  path: String!
  name: String!
  comments: [String!]
}

type Portfolio {
  idx: String
  title: String
  content: String
  date: String
  files: [String]
}

input PortfolioWithFileInput {
  title: String!
  content: String!
  date: String!
  files: [String!]
}

input PortfolioInput {
  idx: Int!
  title: String!
  content: String!
  date: String!
}
```
# BROWSER SUPPORT
* chrome
* forefox
* safari
