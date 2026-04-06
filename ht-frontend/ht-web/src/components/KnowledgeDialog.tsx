import React, { useState, useEffect } from 'react';

interface Organization {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  knowledgeCount: number;
}

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

interface KnowledgeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  isLoading: boolean;
  mode: 'add' | 'edit' | 'delete';
  knowledgeItem: KnowledgeItem | null;
  formData: {
    title: string;
    content: string;
    org_id: string;
  };
  onFormDataChange: (data: { title: string; content: string; org_id: string }) => void;
}

const KnowledgeDialog: React.FC<KnowledgeDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  isLoading,
  mode,
  knowledgeItem,
  formData,
  onFormDataChange
}) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // Fetch organizations on component mount
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/organizations');
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      // Set some default organizations for demo
      setOrganizations([
        { _id: 'test_org', name: 'Test Organization', description: 'Default test organization', createdAt: new Date().toISOString(), knowledgeCount: 0 }
      ]);
    }
  };

  if (!isOpen) return null;

  const isDeleteMode = mode === 'delete';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {mode === 'add' && 'Add New Knowledge'}
          {mode === 'edit' && 'Edit Knowledge'}
          {mode === 'delete' && 'Delete Knowledge'}
        </h3>

        {/* Delete Mode Content */}
        {isDeleteMode && knowledgeItem && (
          <div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{knowledgeItem.title}"? This action cannot be undone.
            </p>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Knowledge Details:</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Title:</strong> {knowledgeItem.title}</div>
                <div><strong>Organization:</strong> {knowledgeItem.org_id}</div>
                <div><strong>Source:</strong> {knowledgeItem.source.type}</div>
                <div><strong>Created:</strong> {new Date(knowledgeItem.created_at).toLocaleDateString()}</div>
                <div className="mt-2">
                  <strong>Content:</strong>
                  <div className="mt-1 p-2 bg-white border border-gray-200 rounded text-gray-600 max-h-32 overflow-y-auto">
                    {knowledgeItem.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Mode Content */}
        {!isDeleteMode && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization
              </label>
              <select
                value={formData.org_id}
                onChange={(e) => onFormDataChange({ ...formData, org_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                disabled={isLoading}
              >
                {organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter knowledge title"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => onFormDataChange({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter knowledge content"
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-4 mt-6">
          {/* Primary Action */}
          {isDeleteMode ? (
            <button
              onClick={onDelete}
              disabled={isLoading}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Deleting...' : 'Delete Knowledge'}
            </button>
          ) : (
            <button
              onClick={onSave}
              disabled={isLoading}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save Knowledge'}
            </button>
          )}

          {/* Cancel */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDialog;
