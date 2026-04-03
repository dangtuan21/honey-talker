import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import KnowledgeDialog from '../components/KnowledgeDialog';
import UploadKnowledgeDialog from '../components/UploadKnowledgeDialog';
import { User } from '../types/auth';
import { DEMO_USERS, Role, userStorage } from '../common/constants';

interface KnowledgePageProps {}

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  source: {
    type: string;
    url?: string;
  };
  created_at: string;
  org_id: string;
}

const KnowledgePage: React.FC<KnowledgePageProps> = () => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [selectedOrgFilter, setSelectedOrgFilter] = useState<string>('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
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
    title: '',
    content: '',
    org_id: ''
  });

  // Get default organization ID (first available organization)
  const getDefaultOrgId = () => {
    return organizations.length > 0 ? organizations[0]._id : '';
  };

  // Get organization name by ID
  const getOrgName = (orgId: string) => {
    const org = organizations.find(o => o._id === orgId);
    return org ? org.name : orgId;
  };

  // Fetch knowledge items and organizations on component mount
  React.useEffect(() => {
    fetchKnowledgeItems();
    fetchOrganizations();
  }, []);

  // Refetch knowledge items when organization filter changes
  React.useEffect(() => {
    fetchKnowledgeItems();
  }, [selectedOrgFilter]);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('http://localhost:3020/organizations');
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
        // Set default org_id if not already set
        if (!formData.org_id && data.length > 0) {
          setFormData(prev => ({ ...prev, org_id: data[0]._id }));
        }
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const fetchKnowledgeItems = async () => {
    try {
      let url = 'http://localhost:3020/knowledge';
      if (selectedOrgFilter !== 'all') {
        url = `http://localhost:3020/knowledge/by-org/${selectedOrgFilter}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setKnowledgeItems(data.map((item: any) => ({
          id: item._id,
          title: item.title,
          content: item.content,
          source: item.source,
          created_at: item.created_at,
          org_id: item.org_id
        })));
      }
    } catch (error) {
      console.error('Error fetching knowledge items:', error);
      showMessage('Error loading knowledge items', 'error');
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
    setSelectedItem(null);
    setFormData({ title: '', content: '', org_id: getDefaultOrgId() });
    setDialogMode('add');
    setShowDialog(true);
  };

  const handleFileUpload = async (file: File, orgId: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('org_id', orgId);
      formData.append('title', file.name);

      const response = await fetch('http://localhost:8020/admin/ingest/file', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        const orgName = getOrgName(orgId);
        showMessage(`File "${file.name}" uploaded and processed successfully to ${orgName}!`, 'success');
        await fetchKnowledgeItems(); // Refresh the list
      } else {
        throw new Error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      showMessage('Error uploading file. Please try again.', 'error');
    }
    setIsLoading(false);
  };

  const handleEdit = (item: KnowledgeItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      org_id: item.org_id
    });
    setDialogMode('edit');
    setShowDialog(true);
  };

  const handleDelete = (item: KnowledgeItem) => {
    setSelectedItem(item);
    setDialogMode('delete');
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      showMessage('Please fill in both title and content', 'error');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      
      if (dialogMode === 'edit' && selectedItem) {
        // Update existing item
        response = await fetch(`http://localhost:3020/knowledge/${selectedItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            org_id: formData.org_id,
            source: { type: 'manual' }
          })
        });
        
        if (response.ok) {
          showMessage('Knowledge updated successfully!', 'success');
          await fetchKnowledgeItems(); // Refresh the list
        } else {
          throw new Error('Failed to update knowledge');
        }
      } else {
        // Add new item
        response = await fetch('http://localhost:3020/knowledge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            org_id: formData.org_id,
            source: { type: 'manual' }
          })
        });
        
        if (response.ok) {
          showMessage('Knowledge added successfully!', 'success');
          await fetchKnowledgeItems(); // Refresh the list
        } else {
          throw new Error('Failed to add knowledge');
        }
      }

      setShowDialog(false);
      setFormData({ title: '', content: '', org_id: getDefaultOrgId() });
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving knowledge:', error);
      showMessage('Error saving knowledge. Please try again.', 'error');
    }
    setIsLoading(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3020/knowledge/${selectedItem.id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        showMessage('Knowledge deleted successfully!', 'success');
        await fetchKnowledgeItems(); // Refresh the list
        setShowDialog(false);
        setSelectedItem(null);
      } else {
        throw new Error('Failed to delete knowledge');
      }
    } catch (error) {
      console.error('Error deleting knowledge:', error);
      showMessage('Error deleting knowledge. Please try again.', 'error');
    }
    setIsLoading(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedItem(null);
    setFormData({ title: '', content: '', org_id: getDefaultOrgId() });
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
                  <h1 className="text-2xl font-bold text-gray-900">Knowledge</h1>
                </div>
              </div>
              
              {/* Organization Filter Dropdown */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter:</label>
                <select
                  value={selectedOrgFilter}
                  onChange={(e) => setSelectedOrgFilter(e.target.value)}
                  className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Organizations</option>
                  {organizations.map((org) => (
                    <option key={org._id} value={org._id}>
                      {org.name}
                    </option>
                  ))}
                </select>
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

          {/* Knowledge Table */}
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
                <span>Add Knowledge</span>
              </button>
              
              <button
                onClick={() => setShowUploadDialog(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload Knowledge File</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {knowledgeItems.map((item) => (
                    <tr key={`knowledge-${item.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getOrgName(item.org_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.source.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
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

            {knowledgeItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No knowledge items found. Click "Add Knowledge" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unified Knowledge Dialog */}
      <KnowledgeDialog
        isOpen={showDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        onDelete={handleConfirmDelete}
        isLoading={isLoading}
        mode={dialogMode}
        knowledgeItem={selectedItem}
        formData={formData}
        onFormDataChange={setFormData}
      />

      {/* Upload Knowledge Dialog */}
      <UploadKnowledgeDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        onUpload={handleFileUpload}
        isLoading={isLoading}
        organizations={organizations}
      />
    </div>
  );
};

export default KnowledgePage;
