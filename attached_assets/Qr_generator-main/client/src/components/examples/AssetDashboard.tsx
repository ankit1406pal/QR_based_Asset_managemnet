import AssetDashboard from '../AssetDashboard';

export default function AssetDashboardExample() {
  const mockAssets = [
    {
      id: "1",
      pcName: "DESKTOP-IT-001",
      employeeNumber: "EMP-12345",
      username: "john.doe",
      serialNumber: "SN987654321",
      macAddress: "00:1A:2B:3C:4D:5E",
      buybackStatus: "Pending" as const,
      date: new Date("2025-01-15"),
    },
    {
      id: "2",
      pcName: "LAPTOP-HR-005",
      employeeNumber: "EMP-67890",
      username: "jane.smith",
      serialNumber: "SN123456789",
      macAddress: "AA:BB:CC:DD:EE:FF",
      buybackStatus: "Approved" as const,
      date: new Date("2025-01-10"),
    },
    {
      id: "3",
      pcName: "DESKTOP-FIN-012",
      employeeNumber: "EMP-54321",
      username: "bob.wilson",
      serialNumber: "SN555666777",
      macAddress: "11:22:33:44:55:66",
      buybackStatus: "In Process" as const,
      date: new Date("2025-01-05"),
    },
    {
      id: "4",
      pcName: "LAPTOP-MKT-008",
      employeeNumber: "EMP-98765",
      username: "alice.jones",
      serialNumber: "SN999888777",
      macAddress: "77:88:99:AA:BB:CC",
      buybackStatus: "Completed" as const,
      date: new Date("2025-01-01"),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <AssetDashboard
        assets={mockAssets}
        onViewAsset={(asset) => console.log('View asset:', asset)}
        onDownloadQR={(asset) => console.log('Download QR for:', asset)}
      />
    </div>
  );
}
