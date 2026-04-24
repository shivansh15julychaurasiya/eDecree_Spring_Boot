import api from "../app/axios";

export const caseTypeService = {

  // 🔹 Get Case Types
  getCaseTypes: async () => {
    try {
      const response = await api.get("/caseType/getCaseTypes");

      return response.data.success ? response.data.data : [];

    } catch (error) {
      console.error("Error fetching case types:", error);
      throw error;
    }
  },

  //  NEW: Get Case File List
  getCaseFileList: async (payload) => {
    try {
      const response = await api.post(
        "/casefile/getCaseFileList",
        payload
      );

      return response.data.success ? response.data.data : [];

    } catch (error) {
      console.error("Error fetching case files:", error);
      throw error;
    }
  }

};