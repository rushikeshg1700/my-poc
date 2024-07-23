import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import UserTable from '@/components/UserTable';
import userDetails from '@/data/user_details.json'; // Adjust the path if necessary

describe('UserTable Component', () => {
    it('renders the table with user data and buttons', () => {
      render(<UserTable />);
      expect(screen.getByText('Add User')).toBeInTheDocument();
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
  
      userDetails.users.forEach(user => {
        expect(screen.getByText(user.firstName)).toBeInTheDocument();
        expect(screen.getByText(user.lastName)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(screen.getByText(user.phone.toString())).toBeInTheDocument();
      });
    });
  
    it('handles Add User button click', async () => {
        render(<UserTable />);
        
        const addButton = screen.getByRole('button', { name: /add user/i });
        fireEvent.click(addButton);

        const modalTitle = screen.getByRole('heading', { name: /add user/i });
        expect(modalTitle).toBeInTheDocument();
      });
  
    it('handles Edit, View, and Delete button clicks', () => {
      render(<UserTable />);
  
      const editButton = screen.getAllByRole('button', { name: /Edit/i })[0];
      const viewButton = screen.getAllByRole('button', { name: /View/i })[0];
      const deleteButton = screen.getAllByRole('button', { name: /Delete/i })[0];
      const userName = userDetails.users[0].firstName; 
      fireEvent.click(editButton);
      expect(screen.getByText('Edit User')).toBeInTheDocument();
  
      fireEvent.click(viewButton);
      expect(screen.getByText('View User')).toBeInTheDocument();
  
      fireEvent.click(deleteButton);
      expect(screen.queryByText(userName)).not.toBeInTheDocument();
    });
  });