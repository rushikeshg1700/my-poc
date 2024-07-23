import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import UserForm from '@/components/UserForm';
import { User } from '@/types/user';

const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: 1234567890,
  };
  
  describe('UserForm Component', () => {
    it('renders the form with correct mode and user data', () => {
      render(<UserForm mode="view" user={mockUser} onSave={jest.fn()} onCancel={jest.fn()} />);
  
      expect(screen.getByText('View User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  
      expect(screen.getByLabelText('First Name')).toBeDisabled();
      expect(screen.getByLabelText('Last Name')).toBeDisabled();
      expect(screen.getByLabelText('Email')).toBeDisabled();
      expect(screen.getByLabelText('Phone')).toBeDisabled();
    });
  
    it('handles form submission and validation', () => {
      const onSave = jest.fn();
      render(<UserForm mode="add" user={null} onSave={onSave} onCancel={jest.fn()} />);
  
      fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Smith' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane.smith@example.com' } });
      fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '9876543210' } });
  
      fireEvent.click(screen.getByText('Save'));
  
      expect(onSave).toHaveBeenCalledWith({
        id: 0,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: 9876543210,
      });
    });
  
  });