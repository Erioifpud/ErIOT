const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { ApolloServer, gql } = require('apollo-server-koa')
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLSchema } = require('graphql')

const app = new Koa()
const router = new Router()

const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.use(bodyParser())

router.get('/test', (ctx, next) => {
  ctx.body = 'hello'
})

// const User = new GraphQLObjectType({
//   name: 'User',
//   description: 'user',
//   fields: {
//     id: {
//       type: GraphQLInt
//     },
//     name: {
//       type: GraphQLString
//     },
//     height: {
//       type: GraphQLFloat
//     }
//   }
// })

// const Query = new GraphQLObjectType({
//   name: 'Query',
//   description: 'query',
//   fields: {
//     user: {
//       type: User,
//       args: {
//         id: {
//           type: GraphQLInt
//         }
//       },
//       resolve: function (root, args) {
//         return { id: 1, name: 'abc', height: 180.1 }
//       }
//     }
//   }
// })

// const graphQLSchema = new GraphQLSchema({
//   query: Query
// })
router.get('/graph')

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000`)
})
