import React from 'react';

interface Organization {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  knowledgeCount: number;
}

interface OrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  isLoading: boolean;
  mode: 'add' | 'edit' | 'delete';
  organization: Organization | null;
  formData: {
    name: string;
    description: string;
  };
  onFormDataChange: (data: { name: string; description: string }) => void;
}

const OrganizationDialog: React.FC<OrganizationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  isLoading,
  mode,
  organization,
  formData,
  onFormDataChange
}) => {
  if (!isOpen) return null;

  const isDeleteMode = mode === 'delete';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {mode === 'add' && 'Add New Organization'}
          {mode === 'edit' && 'Edit Organization'}
          {mode === 'delete' && 'Delete Organization'}
        </h3>

        {/* Delete Mode Content */}
        {isDeleteMode && organization && (
          <div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{organization.name}"? This will also delete all associated knowledge and cannot be undone.
            </p>
            
            {organization.knowledgeCount > 0 && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-md mb-6">
                <p className="text-sm text-red-700">
                  <strong>Warning:</strong> This organization has {organization.knowledgeCount} knowledge items that will also be deleted.
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Organization Details:</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Name:</strong> {organization.name}</div>
                <div><strong>ID:</strong> {organization._id}</div>
                <div><strong>Description:</strong> {organization.description || 'No description'}</div>
                <div><strong>Knowledge Items:</strong> {organization.knowledgeCount}</div>
                <div><strong>Created:</strong> {new Date(organization.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Mode Content */}
        {!isDeleteMode && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter organization name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter organization description"
                disabled={isLoading}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Organization ID will be automatically generated from the name (lowercase, spaces replaced with underscores).
              </p>
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
              {isLoading ? 'Deleting...' : 'Delete Organization'}
            </button>
          ) : (
            <button
              onClick={onSave}
              disabled={isLoading}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save Organization'}
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

export default OrganizationDialog;
