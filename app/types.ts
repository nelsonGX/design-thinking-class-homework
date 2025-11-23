// 貨櫃狀態
export type ContainerStatus = 'loading' | 'in_transit' | 'at_airport' | 'delivered' | 'anomaly';

// 異常類型
export type AnomalyType = 'temperature' | 'humidity' | 'location' | 'impact' | 'delay' | 'unauthorized_access';

// 貨櫃資訊
export interface Container {
  id: string;
  containerNumber: string;
  status: ContainerStatus;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destination: string;
  departureTime?: Date;
  estimatedArrival?: Date;
  actualArrival?: Date;
  currentTemperature?: number;
  currentHumidity?: number;
  items: CargoItem[];
  hasAnomaly: boolean;
  anomalies: Anomaly[];
  createdAt: Date;
  updatedAt: Date;
}

// 貨品資訊
export interface CargoItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  weight: number;
  barcode?: string;
  category: string;
  specialHandling?: string;
  registeredBy: string;
  registeredAt: Date;
}

// 異常事件
export interface Anomaly {
  id: string;
  containerId: string;
  type: AnomalyType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: Date;
  resolvedAt?: Date;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo?: string;
  notes: string[];
  sensorData?: {
    temperature?: number;
    humidity?: number;
    location?: { latitude: number; longitude: number };
    impact?: number;
  };
}

// 感測器數據
export interface SensorReading {
  containerId: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  location: {
    latitude: number;
    longitude: number;
  };
  batteryLevel: number;
}

// 統計數據
export interface Statistics {
  totalContainers: number;
  activeContainers: number;
  deliveredContainers: number;
  anomalyContainers: number;
  utilizationRate: number;
  onTimeDeliveryRate: number;
  averageDeliveryTime: number;
}

// 使用者
export interface User {
  id: string;
  name: string;
  role: 'ground_staff' | 'monitor' | 'manager';
  email: string;
}

// 通知
export interface Notification {
  id: string;
  type: 'anomaly' | 'arrival' | 'delay' | 'system';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  containerId?: string;
}
