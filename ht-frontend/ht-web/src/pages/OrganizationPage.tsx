import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import OrganizationDialog from '../components/OrganizationDialog';
import { User } from '../types/auth';
import { DEMO_USERS, Role, userStorage } from '../common/constants';

interface OrganizationPageProps {}

interface Organization {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  knowledgeCount: number;
}

const OrganizationPage: React.FC<OrganizationPageProps> = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const navigate = useNavigate();

  // Get user from sessionStorage, fallback to guest for development
  const storedUser = userStorage.getUser();
  const guestUser: User = {
    id: DEMO_USERS.GUEST.id,
    username: DEMO_USERS.GUEST.username,
    role: Role.GUEST
  };
  const user = storedUser || guestUser;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Fetch organizations on component mount
  React.useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('http://localhost:3020/organizations');
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data.map((org: any) => ({
          _id: org._id,
          name: org.name,
          description: org.description,
          createdAt: org.created_at,
          knowledgeCount: 0 // We'll calculate this later
        })));
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
      showMessage('Error loading organizations', 'error');
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleLogout = () => {
    userStorage.clearUser();
    window.location.href = '/';
  };

  const handleAdd = () => {
    setFormData({ name: '', description: '' });
    setSelectedOrg(null);
    setDialogMode('add');
    setShowDialog(true);
  };

  const handleEdit = (org: Organization) => {
    setSelectedOrg(org);
    setFormData({
      name: org.name,
      description: org.description
    });
    setDialogMode('edit');
    setShowDialog(true);
  };

  const handleDelete = (org: Organization) => {
    setSelectedOrg(org);
    setDialogMode('delete');
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showMessage('Organization name is required', 'error');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      
      if (dialogMode === 'edit' && selectedOrg) {
        // Update existing organization
        response = await fetch(`http://localhost:3020/organizations/${selectedOrg._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: selectedOrg._id,
            name: formData.name,
            description: formData.description,
            aliases: [],
            parent_id: undefined,
            settings: undefined
          })
        });
        
        if (response.ok) {
          showMessage('Organization updated successfully!', 'success');
          await fetchOrganizations(); // Refresh the list
        } else {
          throw new Error('Failed to update organization');
        }
      } else {
        // Add new organization
        const orgId = formData.name.toLowerCase().replace(/\s+/g, '_');
        response = await fetch('http://localhost:3020/organizations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: orgId,
            name: formData.name,
            description: formData.description,
            aliases: [],
            parent_id: undefined,
            settings: undefined
          })
        });
        
        if (response.ok) {
          showMessage('Organization created successfully!', 'success');
          await fetchOrganizations(); // Refresh the list
        } else {
          throw new Error('Failed to create organization');
        }
      }

      setShowDialog(false);
      setFormData({ name: '', description: '' });
      setSelectedOrg(null);
    } catch (error) {
      console.error('Error saving organization:', error);
      showMessage('Error saving organization. Please try again.', 'error');
    }
    setIsLoading(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrg) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3020/organizations/${selectedOrg._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        showMessage('Organization deleted successfully!', 'success');
        await fetchOrganizations(); // Refresh the list
        setShowDialog(false);
        setSelectedOrg(null);
      } else {
        throw new Error('Failed to delete organization');
      }
    } catch (error) {
      console.error('Error deleting organization:', error);
      showMessage('Error deleting organization. Please try again.', 'error');
    }
    setIsLoading(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedOrg(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar user={user} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-md text-sm ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Organizations Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Organization</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {organizations.map((org) => (
                    <tr key={`org-${org._id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{org.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">{org._id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">{org.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(org.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(org)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(org)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {organizations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No organizations found. Click "Add Organization" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unified Organization Dialog */}
      <OrganizationDialog
        isOpen={showDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        onDelete={handleConfirmDelete}
        isLoading={isLoading}
        mode={dialogMode}
        organization={selectedOrg}
        formData={formData}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default OrganizationPage;
