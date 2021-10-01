package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/sumup/unicorn/backend/pkg/graph/generated"
	"github.com/sumup/unicorn/backend/pkg/graph/model"
)

func (r *mutationResolver) CreateEmployee(ctx context.Context, input model.CreateEmployee) (*model.Employee, error) {
	e, err := r.employeeRepo.Create(ctx, input.ToDomain())
	if err != nil {
		return nil, err
	}

	employee := model.EmployeeFromDomain(e)
	return &employee, nil
}

func (r *queryResolver) Employees(ctx context.Context) ([]*model.Employee, error) {
	employees, err := r.employeeRepo.List(ctx)
	if err != nil {
		return nil, err
	}

	mapped := make([]*model.Employee, 0, len(employees))
	for _, e := range employees {
		employee := model.EmployeeFromDomain(e)
		mapped = append(mapped, &employee)
	}

	return mapped, nil
}

func (r *queryResolver) Employee(ctx context.Context, id string) (*model.Employee, error) {
	e, err := r.employeeRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	employee := model.EmployeeFromDomain(e)
	return &employee, nil
}

func (r *queryResolver) EmployeeByEmail(ctx context.Context, email string) (*model.Employee, error) {
	e, err := r.employeeRepo.GetByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	employee := model.EmployeeFromDomain(e)
	return &employee, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
