export interface DashboardStats {
  overview: {
    totalPatrons: number;
    activePatrons: number;
    suspendedPatrons: number;
    totalLibrarians: number;
    totalBooks: number;
    totalPhysicalCopies: number;
    availableCopies: number;
    activeLoans: number;
    fineCollected: number;
    pendingFines: number;
  };
  settings: SystemSettings;
}

export interface SystemSettings {
  maxBorrowLimit: number;
  borrowDurationDays: number;
  finePerDay: number;
  gracePeriodDays: number;
  maxUnpaidFineCap: number;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  roll: number;
  instituteName: string;
  semester: string;
  shift: string;
  activeStatus: "ACTIVE" | "BLOCKED";
  role: "USER" | "LIBRARYAN" | "MODARATOR";
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details: string;
  severity: "INFO" | "WARNING" | "SUCCESS" | "ERROR";
}

export interface CreateLibrarianPayload {
  name: string;
  email: string;
  password: string;
  roll: number;
  instituteName: string;
  semester: string;
  shift: string;
}
