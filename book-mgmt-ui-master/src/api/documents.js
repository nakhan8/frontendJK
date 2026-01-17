import api from "./axios";

/* =======================
   MOCK DOCUMENT DATA
======================= */

const mockDocuments = [
  {
    id: 1,
    name: "AI_Research_Paper.pdf",
    size: "2.4 MB",
    uploadDate: "2024-01-10",
    status: "Processed"
  },
  {
    id: 2,
    name: "Cloud_Architecture_Notes.docx",
    size: "1.1 MB",
    uploadDate: "2024-01-11",
    status: "Processed"
  },
  {
    id: 3,
    name: "Healthcare_Data_Analysis.xlsx",
    size: "3.2 MB",
    uploadDate: "2024-01-12",
    status: "Processing"
  },
  {
    id: 4,
    name: "System_Design_Guide.pdf",
    size: "4.8 MB",
    uploadDate: "2024-01-13",
    status: "Processed"
  },
  {
    id: 5,
    name: "Machine_Learning_Basics.pptx",
    size: "6.0 MB",
    uploadDate: "2024-01-14",
    status: "Failed"
  },
  {
    id: 6,
    name: "Distributed_Systems_Readings.pdf",
    size: "2.9 MB",
    uploadDate: "2024-01-15",
    status: "Processed"
  },
  {
    id: 7,
    name: "Cybersecurity_Policies.docx",
    size: "900 KB",
    uploadDate: "2024-01-16",
    status: "Processed"
  },
  {
    id: 8,
    name: "RAG_Implementation_Notes.txt",
    size: "350 KB",
    uploadDate: "2024-01-17",
    status: "Processing"
  },
  {
    id: 9,
    name: "Emergency_Response_Plan.pdf",
    size: "1.7 MB",
    uploadDate: "2024-01-18",
    status: "Processed"
  },
  {
    id: 10,
    name: "Student_Training_Manual.pdf",
    size: "5.3 MB",
    uploadDate: "2024-01-19",
    status: "Processed"
  }
];

let nextId = 11;

/* =======================
   API FALLBACK HANDLER
======================= */

const handleApiError = async (apiCall, mockFn) => {
  try {
    return await apiCall();
  } catch (error) {
    const isNetworkError =
      !error.response || error.code === "ERR_NETWORK";

    if (isNetworkError) {
      console.warn("Backend unavailable → using mock data");
      return { data: mockFn() };
    }

    throw error;
  }
};

/* =======================
   DOCUMENT ENDPOINTS
======================= */

export const getDocuments = () =>
  handleApiError(
    () => api.get("/documents"),
    () => mockDocuments
  );

export const uploadDocument = (formData) =>
  handleApiError(
    () =>
      api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }),
    () => {
      const file = formData.get("file");

      const newDoc = {
        id: nextId++,
        name: file?.name || "uploaded-document.pdf",
        size: file?.size
          ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
          : "1.0 MB",
        uploadDate: new Date().toISOString().split("T")[0],
        status: "Processing"
      };

      mockDocuments.push(newDoc);
      return newDoc;
    }
  );

export const deleteDocument = (id) =>
  handleApiError(
    () => api.delete(`/documents/${id}`),
    () => {
      const index = mockDocuments.findIndex(
        (doc) => doc.id === Number(id)
      );

      if (index !== -1) {
        mockDocuments.splice(index, 1);
        return { message: "Document deleted successfully" };
      }

      return { message: "Document not found" };
    }
  );

export const downloadDocument = (id) =>
  handleApiError(
    () =>
      api.get(`/documents/${id}/download`, {
        responseType: "blob"
      }),
    () =>
      new Blob(
        ["Mock document content for preview/download"],
        { type: "application/pdf" }
      )
  );
