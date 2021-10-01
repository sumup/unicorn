package api

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
)

type API struct {
	schema graphql.ExecutableSchema
}

func NewAPI(schema graphql.ExecutableSchema) *API {
	return &API{
		schema: schema,
	}
}

func (a *API) RegisterHandlers(router *echo.Group) {
	router.GET("", func(c echo.Context) error {
		return c.String(http.StatusOK, "hello world")
	})

	a.registerGraphQLHandlers(router.Group("/gql"))
}

func (a *API) registerGraphQLHandlers(router *echo.Group) {
	srv := handler.NewDefaultServer(a.schema)

	router.GET("", echo.WrapHandler(playground.Handler("Unicorn GraphQL playground", "/api/gql/query")))
	router.Any("/query", echo.WrapHandler(srv))
}
