export interface TaxCategory {
  id: string;
  name: string; // Official name (e.g., 民生費)
  kidsName: string; // Kid-friendly name (e.g., みんなを助けるお金)
  amount: number; // In 100 million yen roughly or percentage
  color: string;
  icon: string;
  shortDesc: string;
  imageNum: number; // The Asapi image number from the design collection
}

export interface ChatState {
  isOpen: boolean;
  isLoading: boolean;
  currentTerm: string | null;
  response: string | null;
}