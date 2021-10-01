package db

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/sumup/unicorn/backend/pkg/domain"
)

type EmployeeRepository struct {
	db *gorm.DB
}

func NewEmployeeRepository(db *gorm.DB) *EmployeeRepository {
	return &EmployeeRepository{
		db: db,
	}
}

func (repo *EmployeeRepository) Create(ctx context.Context, employee domain.Employee) (domain.Employee, error) {
	employee.ID = uuid.New()
	err := repo.db.WithContext(ctx).Create(&employee).Error
	if err != nil {
		return domain.Employee{}, fmt.Errorf("failed to create employee: %w", err)
	}

	return employee, nil
}

func (repo *EmployeeRepository) Get(ctx context.Context, id string) (domain.Employee, error) {
	var employee domain.Employee

	err := repo.db.WithContext(ctx).WithContext(ctx).First(&employee, id).Error
	if err != nil {
		return employee, fmt.Errorf("failed to get employee: %w", err)
	}

	return employee, nil
}

func (repo *EmployeeRepository) List(ctx context.Context) ([]domain.Employee, error) {
	var employee []domain.Employee

	err := repo.db.WithContext(ctx).Find(&employee).Error
	if err != nil {
		return employee, fmt.Errorf("failed to get employee: %w", err)
	}

	return employee, nil
}

func (repo *EmployeeRepository) GetByEmail(ctx context.Context, email string) (domain.Employee, error) {
	var employee domain.Employee

	err := repo.db.WithContext(ctx).Where(&domain.Employee{Email: email}).First(&employee).Error
	if err != nil {
		return employee, fmt.Errorf("failed to get employee: %w", err)
	}

	return employee, nil
}
