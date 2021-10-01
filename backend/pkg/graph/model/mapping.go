package model

import "github.com/sumup/unicorn/backend/pkg/domain"

func EmployeeFromDomain(e domain.Employee) Employee {
	return Employee{
		ID:          e.ID.String(),
		FirstName:   e.FirstName,
		LastName:    e.LastName,
		JobTitle:    e.JobTitle,
		Email:       e.Email,
		SlackID:     e.SlackID,
		SlackHandle: e.SlackHandle,
	}
}

func (c CreateEmployee) ToDomain() domain.Employee {
	return domain.Employee{
		FirstName:   c.FirstName,
		LastName:    c.LastName,
		JobTitle:    c.JobTitle,
		Email:       c.Email,
		SlackHandle: c.SlackHandle,
		SlackID:     c.SlackID,
	}
}
