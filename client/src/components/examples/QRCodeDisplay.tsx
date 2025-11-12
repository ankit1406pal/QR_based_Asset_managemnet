import QRCodeDisplay from '../QRCodeDisplay';

export default function QRCodeDisplayExample() {
  const mockAsset = {
    pcName: "DESKTOP-IT-001",
    employeeNumber: "EMP-12345",
    username: "john.doe",
    serialNumber: "SN987654321",
    macAddress: "00:1A:2B:3C:4D:5E",
    buybackStatus: "Approved" as const,
    date: new Date(),
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <QRCodeDisplay
        assetData={mockAsset}
        onClose={() => console.log('Close clicked')}
      />
    </div>
  );
}
