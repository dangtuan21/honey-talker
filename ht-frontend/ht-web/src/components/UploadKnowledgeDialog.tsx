import React from 'react';

interface Organization {
  _id: string;
  name: string;
}

interface UploadKnowledgeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, orgId: string) => Promise<void>;
  isLoading: boolean;
  organizations: Organization[];
}

const UploadKnowledgeDialog: React.FC<UploadKnowledgeDialogProps> = ({
  isOpen,
  onClose,
  onUpload,
  isLoading,
  organizations
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedOrgId, setSelectedOrgId] = React.useState<string>('');

  React.useEffect(() => {
    // Set default organization when dialog opens
    if (isOpen && organizations.length > 0 && !selectedOrgId) {
      setSelectedOrgId(organizations[0]._id);
    }
  }, [isOpen, organizations, selectedOrgId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedOrgId) return;
    await onUpload(selectedFile, selectedOrgId);
    setSelectedFile(null);
    onClose();
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Knowledge File</h2>
        
        <div className="space-y-4">
          {/* Organization Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization
            </label>
            <select
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              {organizations.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc,.txt,.md"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isLoading}
            />
          </div>

          {/* File Info */}
          {selectedFile && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Selected file:</strong> {selectedFile.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {selectedFile.type || 'Unknown'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Organization:</strong> {organizations.find(org => org._id === selectedOrgId)?.name || 'Unknown'}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !selectedOrgId || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>{isLoading ? 'Uploading...' : 'Upload'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadKnowledgeDialog;
