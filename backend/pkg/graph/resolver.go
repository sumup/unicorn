//go:generate go run github.com/99designs/gqlgen
package graph

import (
	_ "github.com/99designs/gqlgen/cmd"
	"github.com/99designs/gqlgen/graphql"

	"github.com/sumup/unicorn/backend/pkg/db"
	"github.com/sumup/unicorn/backend/pkg/graph/generated"
)

type Resolver struct {
	employeeRepo *db.EmployeeRepository
}

func NewResolver(employeeRepo *db.EmployeeRepository) *Resolver {
	return &Resolver{
		employeeRepo: employeeRepo,
	}
}

func (r *Resolver) Schema() graphql.ExecutableSchema {
	return generated.NewExecutableSchema(
		generated.Config{
			Resolvers: r,
		},
	)
}
